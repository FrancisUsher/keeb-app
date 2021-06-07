import { Footprint, RowPosition } from "./BaseTypes";
import type { Legend } from "./KeycapSet";

interface KeySpace {
  footprint: Footprint;
  rowPosition: RowPosition;
  bottomRow?: Boolean; // Because bottom row commonly swaps R4 for R5
  preferredLegends?: Legend[];
}

type Layout = KeySpace[];

interface Keyboard {
  name: String;
  layouts: Layout[];
}

export type { KeySpace, Layout, Keyboard };
