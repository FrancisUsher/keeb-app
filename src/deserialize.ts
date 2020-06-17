interface KLEMetaRow {
  rotation_x: number;
}
interface KLEMeta {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  r?: number;
  rx?: number;
  ry?: number;
}
interface KLEKey {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation_angle: number;
  rotation_x: number;
  rotation_y: number;
}
type KLEKeyItem = string | KLEMeta;
type KLEKeyRow = KLEKeyItem[];
export type KLERow = KLEKeyRow | KLEMetaRow;
interface KLECluster {
  x: number;
  y: number;
}

export interface Key {
  x: number;
  y: number;
  width: number;
  height: number;
  angleInDegrees: number;
}
function rotate(
  cx: number,
  cy: number,
  x: number,
  y: number,
  angleInDegrees: number
) {
  const radians = (Math.PI / 180) * angleInDegrees;
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = cos * (x - cx) + sin * (y - cy) + cx;
  const ny = cos * (y - cy) - sin * (x - cx) + cy;
  return { x: nx, y: ny };
}
function interpretKey(kleKey: KLEKey): Key {
  //
  // First apply key width and height to find switch center
  const offsetKeyCenter = {
    x: kleKey.x + kleKey.width / 2,
    y: kleKey.y + kleKey.height / 2,
  };
  // Then compute rotation on the new center
  const rotationCenter = { x: kleKey.rotation_x, y: kleKey.rotation_y };
  const rotatedCenter = rotate(
    rotationCenter.x,
    -rotationCenter.y,
    offsetKeyCenter.x,
    -offsetKeyCenter.y,
    kleKey.rotation_angle
  );
  const key = {
    x: rotatedCenter.x,
    y: rotatedCenter.y,
    width: kleKey.width,
    height: kleKey.height,
    angleInDegrees: kleKey.rotation_angle,
  };
  // console.log(key);

  return key;
}

function deserialize(rows: KLERow[]): Key[] {
  // Initialize with defaults
  const current: KLEKey = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    rotation_angle: 0,
    rotation_x: 0,
    rotation_y: 0,
  };
  const keys: KLEKey[] = [];
  const cluster: KLECluster = {
    x: 0,
    y: 0,
  };

  rows.forEach((row, r) => {
    if (Array.isArray(row)) {
      row.forEach((item) => {
        if (typeof item === 'string') {
          // Copy-construct the accumulated key
          keys.push({ ...current });
          // Set up for the next item
          resetCurrent(current);
        } else {
          updateCurrentByMeta(current, { ...item }, cluster);
        }
      });
      current.y = current.y + 1;
    }
    current.x = current.rotation_x;
  });
  return keys.map(interpretKey);
}

function resetCurrent(current: KLEKey): void {
  // console.log(`reset ${current.x} += ${current.width}`);
  current.x = current.x + current.width;
  current.width = 1;
  current.height = 1;
}

function updateCurrentByMeta(
  current: KLEKey,
  meta: KLEMeta,
  cluster: KLECluster
): void {
  // console.log(meta);
  // console.log(current);
  // console.log(cluster);
  // Update rotation info
  if (meta.r) {
    current.rotation_angle = meta.r;
  }
  if (meta.rx) {
    current.rotation_x = meta.rx;
    cluster.x = meta.rx;
    Object.assign(current, cluster);
  }
  if (meta.ry) {
    current.rotation_y = meta.ry;
    cluster.y = meta.ry;
    Object.assign(current, cluster);
  }
  // Increment next position values
  current.x = current.x + (meta.x || 0);
  current.y = current.y + (meta.y || 0);
  // Store next dimensions
  if (meta.w) {
    current.width = meta.w;
  }
  if (meta.h) {
    current.height = meta.h;
  }
}

export { deserialize };
