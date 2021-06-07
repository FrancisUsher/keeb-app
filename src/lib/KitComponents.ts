import { Keycap, Legend } from "./KeycapSet";
import { Footprint, RowPosition } from "./BaseTypes";

const alphasSculpted: Keycap[] = [
  ...[
    Legend.Q,
    Legend.W,
    Legend.E,
    Legend.R,
    Legend.T,
    Legend.Y,
    Legend.U,
    Legend.I,
    Legend.O,
    Legend.P,
  ].map((legend) => ({
    legend,
    footprint: Footprint.U100,
    rowPosition: RowPosition.R2,
  })),
  ...[
    Legend.A,
    Legend.S,
    Legend.D,
    Legend.F,
    Legend.G,
    Legend.H,
    Legend.J,
    Legend.K,
    Legend.L,
  ].map((legend) => ({
    legend,
    footprint: Footprint.U100,
    rowPosition: RowPosition.R3,
  })),
  ...[Legend.Z, Legend.X, Legend.C, Legend.V, Legend.B, Legend.N, Legend.M].map(
    (legend) => ({
      legend,
      footprint: Footprint.U100,
      rowPosition: RowPosition.R4,
    })
  ),
];

const arrowsStandard = [
  ...[
    Legend.UpArrow,
    Legend.DownArrow,
    Legend.LeftArrow,
    Legend.RightArrow,
  ].map((legend) => ({
    legend,
    footprint: Footprint.U100,
    rowPosition: RowPosition.R4,
  })),
];

export { alphasSculpted, arrowsStandard };
