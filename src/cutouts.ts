import makerjs, { IModel, IPathLine, IPoint } from 'makerjs';
import concaveman from 'concaveman';
import { Key } from './deserialize';
// Todo:
// Add kerf tolerance
// Fillet corners
const MX_SPACING = 19.05;
const MX_RADIUS = MX_SPACING / 2;
const SW_XRADIUS = 7;
const SW_YRADIUS = 7;
const TAB_OFFSET = 1;
const TAB_XSIZE = 0.8;
const TAB_YSIZE = 3.1;

interface QuarterBoundingBox {
  paths: {
    h1: IPathLine;
    v1: IPathLine;
  };
  origin: IPoint;
}
interface SwitchBoundingBox {
  models: {
    pxPy: QuarterBoundingBox;
    pxNy: QuarterBoundingBox;
    nxPy: QuarterBoundingBox;
    nxNy: QuarterBoundingBox;
  };
  origin: IPoint;
}

interface Hull {
  paths: {
    [x: string]: IPathLine;
  };
  origin: IPoint;
}

function mx(key: Key): IModel {
  // switch is x- and y-axis symmetric so make positive quadrant and mirror
  const pxPy = {
    paths: {
      h1: new makerjs.paths.Line([0, SW_YRADIUS], [SW_XRADIUS, SW_YRADIUS]),
      v1: new makerjs.paths.Line(
        [SW_XRADIUS, SW_YRADIUS],
        [SW_XRADIUS, SW_YRADIUS - TAB_OFFSET]
      ),
      h2: new makerjs.paths.Line(
        [SW_XRADIUS, SW_YRADIUS - TAB_OFFSET],
        [SW_XRADIUS + TAB_XSIZE, SW_YRADIUS - TAB_OFFSET]
      ),
      v2: new makerjs.paths.Line(
        [SW_XRADIUS + TAB_XSIZE, SW_YRADIUS - TAB_OFFSET],
        [SW_XRADIUS + TAB_XSIZE, SW_YRADIUS - TAB_OFFSET - TAB_YSIZE]
      ),
      h3: new makerjs.paths.Line(
        [SW_XRADIUS + TAB_XSIZE, SW_YRADIUS - TAB_OFFSET - TAB_YSIZE],
        [SW_XRADIUS, SW_YRADIUS - TAB_OFFSET - TAB_YSIZE]
      ),
      v3: new makerjs.paths.Line(
        [SW_XRADIUS, SW_YRADIUS - TAB_OFFSET - TAB_YSIZE],
        [SW_XRADIUS, 0]
      ),
    },
    origin: [0, 0],
  };
  const model = {
    models: {
      pxPy,
      pxNy: makerjs.model.mirror(pxPy, false, true),
      nxNy: makerjs.model.mirror(pxPy, true, true),
      nxPy: makerjs.model.mirror(pxPy, true, false),
    },
    origin: [key.x * MX_SPACING, key.y * MX_SPACING],
  };
  return makerjs.model.rotate(model, -key.angleInDegrees, model.origin);
}

function mxSpacing(key: Key): SwitchBoundingBox {
  // console.log(key);
  const key_xradius = MX_RADIUS * key.width;
  const key_yradius = MX_RADIUS * key.height;
  // switch is x- and y-axis symmetric so make positive quadrant and mirror
  const pxPy: QuarterBoundingBox = {
    paths: {
      h1: new makerjs.paths.Line([0, key_yradius], [key_xradius, key_yradius]),
      v1: new makerjs.paths.Line([key_xradius, key_yradius], [key_xradius, 0]),
    },
    origin: [0, 0],
  };
  const model = {
    models: {
      pxPy,
      pxNy: makerjs.model.mirror(pxPy, false, true) as QuarterBoundingBox,
      nxNy: makerjs.model.mirror(pxPy, true, true) as QuarterBoundingBox,
      nxPy: makerjs.model.mirror(pxPy, true, false) as QuarterBoundingBox,
    },
    origin: [key.x * MX_SPACING, key.y * MX_SPACING],
  };
  const rotatedModel = makerjs.model.rotate(
    model,
    -key.angleInDegrees,
    model.origin
  );
  // console.log(rotatedModel);
  // return model;
  return rotatedModel as SwitchBoundingBox;
}

function boundingBoxPoints(box: SwitchBoundingBox): number[][] {
  const chain = makerjs.model.findSingleChain(box);
  const minSpacing = 19.05 / 4;
  const divisions = Math.floor(chain.pathLength / minSpacing);
  const spacing = chain.pathLength / divisions;

  const keyPoints = makerjs.chain.toPoints(chain, spacing);
  return keyPoints.map((point) => [point[0], point[1]]);
  // return Object.values(box.models).flatMap((quarterBox) =>
  //   Object.values(quarterBox.paths).flatMap((path) => [
  //     [
  //       path.origin[0] + quarterBox.origin[0] + box.origin[0],
  //       path.origin[1] + quarterBox.origin[1] + box.origin[1],
  //     ],
  //   ])
  // );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function boundingBoxPrimaryPoints(box: SwitchBoundingBox): number[][] {
  return Object.values(box.models).flatMap((quarterBox) =>
    Object.values(quarterBox.paths).flatMap((path) => [
      [
        path.origin[0] + quarterBox.origin[0] + box.origin[0],
        path.origin[1] + quarterBox.origin[1] + box.origin[1],
      ],
    ])
  );
}

function bezelConcaveHull(keys: Key[], convexity: number): Hull {
  const switchBoundingBoxes = keys.map((key) =>
    // Invert Y here because it's coming in upside down.
    mxSpacing({ ...key, y: key.y })
  );
  // TODO: The points on large keys (e.g. 7u space) will be far enough
  // away from each other that the concave hull will scoop down underneath
  // for small enough convexity values. We should trace around the key
  // shape with additional points, e.g. every 1u, to ensure that layouts
  // which use these keys don't misbehave when trying to make a tight bezel.
  const boundPoints = switchBoundingBoxes.flatMap(boundingBoxPoints);
  // console.log(boundPoints);
  const hullPoints = concaveman(boundPoints, convexity);
  const hlen = hullPoints.length;

  // Start with a one-line hull (last point leading to first point)
  const hull: Hull = {
    paths: {
      // Make this exceptional [n-1, 0] case in the init
      [hlen - 1]: new makerjs.paths.Line(
        [hullPoints[hlen - 1][0], hullPoints[hlen - 1][1]],
        [hullPoints[0][0], hullPoints[0][1]]
      ),
    },
    origin: [0, 0],
  };
  // Connect each consecutive pair of points as a line segment
  for (let i = 0; i < hullPoints.length - 1; i++) {
    hull.paths[i] = new makerjs.paths.Line(
      [hullPoints[i][0], hullPoints[i][1]],
      [hullPoints[i + 1][0], hullPoints[i + 1][1]]
    );
  }
  return hull;
}

export { mx, mxSpacing, bezelConcaveHull };
