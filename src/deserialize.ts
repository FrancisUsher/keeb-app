interface MetaRow {
  rotation_x: number;
}
interface Meta {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
  rx: number;
  ry: number;
}
interface Key {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation_angle: number;
  rotation_x: number;
  rotation_y: number;
}
type KeyItem = string | Meta;
type KeyRow = KeyItem[];
type Row = KeyRow | MetaRow;
interface Cluster {
  x: number;
  y: number;
}

function deserialize(rows: Row[]): Key[] {
  // Initialize with defaults
  const current: Key = {
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    rotation_angle: 0,
    rotation_x: 0,
    rotation_y: 0,
  };
  const keys: Key[] = [];
  const cluster: Cluster = {
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

  // Apply key width and height to find switch center
  const offsetCenters = keys.map((key) => ({
    ...key,
    x: key.x + key.width / 2,
    y: key.y + key.height / 2,
  }));
  console.log(keys);
  // Apply rotation
  return offsetCenters;
}

function resetCurrent(current: Key): void {
  console.log(`reset ${current.x} += ${current.width}`);
  current.x = current.x + current.width;
  current.width = 1;
  current.height = 1;
}

function updateCurrentByMeta(current: Key, meta: Meta, cluster: Cluster): void {
  console.log(meta);
  console.log(current);
  console.log(cluster);
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
