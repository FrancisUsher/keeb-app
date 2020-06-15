import makerjs, { IModel } from 'makerjs';
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

function mx(x: number, y: number): IModel {
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
    origin: [x, y],
  };
  return model;
}

function mxSpacing(
  x: number,
  y: number,
  width: number,
  height: number
): IModel {
  const key_xradius = MX_RADIUS * width;
  const key_yradius = MX_RADIUS * height;
  // switch is x- and y-axis symmetric so make positive quadrant and mirror
  const pxPy = {
    paths: {
      h1: new makerjs.paths.Line([0, key_yradius], [key_xradius, key_yradius]),
      v1: new makerjs.paths.Line([key_xradius, key_yradius], [key_xradius, 0]),
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
    origin: [x, y],
  };
  return model;
}

export { mx, mxSpacing };
