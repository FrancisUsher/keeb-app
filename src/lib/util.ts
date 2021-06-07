import type { Keycap, KeycapSet } from "./KeycapSet";
import { Legend } from "./KeycapSet";
import type { Keyboard, KeySpace } from "./Keyboard";
import { Footprint } from "./BaseTypes";

enum FitType {
  LegendPerfectFit,
  ShapeFit,
  NoFit,
}

/*
  What kind of fit info could we be interested in finding here?
  If there's a legend-perfect fit, exactly what kits are required for that?
  If there's one or more shape fits, the kits that yield the cheapest or
    smallest subset that satisfy the shape fit.
*/

type KeycapCounts = {
  [keycapKey: string]: number;
};

type KeycapKeyFunc = (keycap: Keycap) => string;

type KeyspaceKeyFunc = (keyspace: KeySpace) => string[];

const keycapFullMatchKey = (keycap: Keycap): string => {
  return `${keycap.footprint},${keycap.rowPosition},${keycap.legend}`;
};

const keyspaceFullMatchKeys = (keyspace: KeySpace): string[] => {
  return (
    keyspace.preferredLegends?.map(
      (legend) => `${keyspace.footprint},${keyspace.rowPosition},${legend}`
    ) ?? []
  );
};

const keycapShapeMatchKey = (keycap: Keycap): string => {
  return `${keycap.footprint},${keycap.rowPosition}`;
};

const countKeycapsInSet = (
  keycapSet: KeycapSet,
  keyFunc: KeycapKeyFunc
): KeycapCounts => {
  const checklist: KeycapCounts = {};
  keycapSet.kits.forEach((kit) => {
    kit.keycaps.forEach((keycap) => {
      const key = keyFunc(keycap);
      checklist[key] = (checklist[key] ?? 0) + 1;
    });
  });
  return checklist;
};

// const howDoesSetFitBoard = (
//   keycapSet: KeycapSet,
//   keyboard: Keyboard
// ): FitType => {};

const setFitsBoardPerfectly = (
  keycapSet: KeycapSet,
  keyboard: Keyboard
): boolean => {
  const keycapKeyFunc = keycapFullMatchKey;
  const spaceKeyFunc = keyspaceFullMatchKeys;
  let keycapCounts = countKeycapsInSet(keycapSet, keycapKeyFunc);
  return keyboard.layouts.some((layout) =>
    layout.every((keyspace) => {
      const { isInSet, memo } = keyspaceInSetMemoized(
        keyspace,
        keycapCounts,
        spaceKeyFunc
      );
      keycapCounts = memo;
      return isInSet;
    })
  );
};

// Check if there are any matching keycaps in the set, remembering which ones have been used
const keyspaceInSetMemoized = (
  keyspace: KeySpace,
  checklist: KeycapCounts,
  keyFunc: KeyspaceKeyFunc
): { isInSet: boolean; memo: KeycapCounts } => {
  const keys = keyFunc(keyspace);
  const memo = checklist;
  const isInSet = keys.some((key) => {
    if (checklist[key]) {
      memo[key] = memo[key] - 1;
      return true;
    }
    return false;
  });
  return { isInSet, memo };
};

export { setFitsBoardPerfectly };
