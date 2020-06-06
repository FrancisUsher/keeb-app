import * as BABYLON from 'babylonjs';

// Standard MX switch is 1.905 cm from center to center
const KEY_UNIT = 1.905;
// and 1.4 cm plate cutout
const SWITCH_DIAMETER = 1.4;
// plate config
// const PLATE_THICKNESS = 0.3;
// bezel config
// const BEZEL_THICKNESS_0 = 0.3;
// const BEZEL_THICKNESS_1 = 0.3;
// // mid layers config
// const MID_THICKNESS_0 = 0.3;
// const MID_THICKNESS_1 = 0.3;
// // bottom layer config
// const BOTTOM_THICKNESS = 0.3;
// // Distance from key 1.905 box to inner edge of bezel
// const BEZEL_KEY_BUFFER = 0.0475;

const NORMAL = {
  SWITCH_DIAMETER: SWITCH_DIAMETER / KEY_UNIT,
  KEY_UNIT: 1,
};

function getSwitchCenters() {
  //Centers in XoZ plane
  const xrange = [...Array(12).keys()];
  const zrange = [...Array(4).keys()];
  return xrange.flatMap((x) =>
    zrange.flatMap((z) => [
      new BABYLON.Vector3(x, 0, z),
      //   new BABYLON.Vector3(x + 0.9, 0, z + 0.1),
      //   new BABYLON.Vector3(x + 0.1, 0, z + 0.1),
      //   new BABYLON.Vector3(x + 0.1, 0, z + 0.9),
      //   new BABYLON.Vector3(x + 0.9, 0, z + 0.9),
    ])
  );
}

function getSwitchBounds(switchCenters: BABYLON.Vector3[]) {
  return switchCenters.map((center) => [
    new BABYLON.Vector3(
      center.x + NORMAL.KEY_UNIT / 2,
      0,
      center.z - NORMAL.KEY_UNIT / 2
    ),
    new BABYLON.Vector3(
      center.x - NORMAL.KEY_UNIT / 2,
      0,
      center.z - NORMAL.KEY_UNIT / 2
    ),
    new BABYLON.Vector3(
      center.x - NORMAL.KEY_UNIT / 2,
      0,
      center.z + NORMAL.KEY_UNIT / 2
    ),
    new BABYLON.Vector3(
      center.x + NORMAL.KEY_UNIT / 2,
      0,
      center.z + NORMAL.KEY_UNIT / 2
    ),
  ]);
}

function getSwitchPlateCutouts(switchCenters: BABYLON.Vector3[]) {
  return switchCenters.map((center) => [
    new BABYLON.Vector3(
      center.x + NORMAL.SWITCH_DIAMETER / 2,
      0,
      center.z - NORMAL.SWITCH_DIAMETER / 2
    ),
    new BABYLON.Vector3(
      center.x - NORMAL.SWITCH_DIAMETER / 2,
      0,
      center.z - NORMAL.SWITCH_DIAMETER / 2
    ),
    new BABYLON.Vector3(
      center.x - NORMAL.SWITCH_DIAMETER / 2,
      0,
      center.z + NORMAL.SWITCH_DIAMETER / 2
    ),
    new BABYLON.Vector3(
      center.x + NORMAL.SWITCH_DIAMETER / 2,
      0,
      center.z + NORMAL.SWITCH_DIAMETER / 2
    ),
  ]);
}

function crossMag(
  u: BABYLON.Vector3,
  v: BABYLON.Vector3,
  p: BABYLON.Vector3
): Number {
  const pc = p.subtract(u);
  const vc = v.subtract(u);
  return pc.cross(vc).y;
}

function split(
  u: BABYLON.Vector3,
  v: BABYLON.Vector3,
  points: BABYLON.Vector3[]
) {
  // return points on left side of UV
  return points.filter((p) => crossMag(p, u, v) < 0);
}

function extend(
  u: BABYLON.Vector3,
  v: BABYLON.Vector3,
  points: BABYLON.Vector3[]
): BABYLON.Vector3[] {
  if (points.length === 0) {
    return [];
  }

  // # find furthest point W, and split search to WV, UW
  let w = points[0];
  let crossMagW = crossMag(w, u, v);
  for (const p of points) {
    const crossMagP = crossMag(p, u, v);

    if (crossMagP < crossMagW) {
      w = p;
      crossMagW = crossMagP;
    }
  }
  const p1 = split(w, v, points);
  const p2 = split(u, w, points);
  return [...extend(w, v, p1), w, ...extend(u, w, p2)];
}

function convexHull(points: BABYLON.Vector3[]) {
  // find two hull points, U, V, and split to left and right search
  // initial min
  let u = points[0];
  for (const p of points) {
    if (p.x < u.x) {
      u = p;
    }
  }
  // initial max
  let v = points[0];
  for (const p of points) {
    if (p.x > v.x) {
      v = p;
    }
  }
  const left = split(u, v, points);
  const right = split(v, u, points);

  // find convex hull on each side
  return [v, ...extend(u, v, left), u, ...extend(v, u, right), v];
}
export { getSwitchCenters, getSwitchPlateCutouts, getSwitchBounds, convexHull };
