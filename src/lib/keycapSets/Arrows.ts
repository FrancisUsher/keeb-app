import type { KeycapSet } from "../KeycapSet";
import Cherry from "../profiles/Cherry";
import { arrowsStandard } from "../KitComponents";

const Arrows: KeycapSet = {
  name: "Arrows",
  profile: Cherry,
  kits: [
    {
      name: "Base",
      keycaps: arrowsStandard,
    },
  ],
};

export default Arrows;
