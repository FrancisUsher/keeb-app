import type { Keyboard } from "../Keyboard";
import { Footprint, RowPosition } from "../BaseTypes";
import { Legend } from "../KeycapSet";

const Paw: Keyboard = {
  name: "Paw",
  layouts: [
    [
      {
        footprint: Footprint.U100,
        rowPosition: RowPosition.R4,
        bottomRow: false,
        preferredLegends: [Legend.UpArrow],
      },
      {
        footprint: Footprint.U100,
        rowPosition: RowPosition.R4,
        bottomRow: true,
        preferredLegends: [Legend.DownArrow],
      },
      {
        footprint: Footprint.U100,
        rowPosition: RowPosition.R4,
        bottomRow: true,
        preferredLegends: [Legend.LeftArrow],
      },
      {
        footprint: Footprint.U100,
        rowPosition: RowPosition.R4,
        bottomRow: true,
        preferredLegends: [Legend.RightArrow],
      },
    ],
  ],
};

export default Paw;
