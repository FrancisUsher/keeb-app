import type { KeycapSet } from "../KeycapSet";
import Cherry from "../profiles/Cherry";
import { alphasSculpted } from "../KitComponents";

const Alpha26: KeycapSet = {
  name: "Alpha26",
  profile: Cherry,
  kits: [
    {
      name: "Base",
      keycaps: alphasSculpted,
    },
  ],
};

export default Alpha26;
