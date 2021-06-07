import { RowPosition, Footprint } from "./BaseTypes";

interface Profile {
  name: String;
  sculpts: RowPosition[];
}

interface Keycap {
  footprint: Footprint;
  rowPosition: RowPosition;
  legend: Legend;
}

interface KeycapKit {
  name: String;
  keycaps: Keycap[];
}

interface KeycapSet {
  name: String;
  profile: Profile;
  kits: KeycapKit[];
}

enum Legend {
  // Traditional R0 Keys
  Escape,
  F1,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
  F10,
  F11,
  F12,
  ScrollLock,
  Pause,
  PrintScreen,
  // Alphabet
  A,
  B,
  C,
  D,
  E,
  F,
  G,
  H,
  I,
  J,
  K,
  L,
  M,
  N,
  O,
  P,
  Q,
  R,
  S,
  T,
  U,
  V,
  W,
  X,
  Y,
  Z,
  // Number row
  Numrow1,
  Numrow2,
  Numrow3,
  Numrow4,
  Numrow5,
  Numrow6,
  Numrow7,
  Numrow8,
  Numrow9,
  Numrow0,
  NumrowEquals,
  NumrowMinus,
  // Punctuation
  AccentGrave,
  SingleQuote,
  Semicolon,
  Comma,
  Period,
  Slash,
  Backslash,
  // Numpad
  Numpad1,
  Numpad2,
  Numpad3,
  Numpad4,
  Numpad5,
  Numpad6,
  Numpad7,
  Numpad8,
  Numpad9,
  Numpad0,
  NumpadEnter,
  NumpadDot,
  NumpadMinus,
  NumpadPlus,
  NumpadAsterisk,
  NumpadSlash,
  NumpadEquals,
  NumLock,
  // Navigation, whitespace, control characters
  Backspace,
  Insert,
  Delete,
  Home,
  End,
  PageUp,
  PageDown,
  UpArrow,
  DownArrow,
  LeftArrow,
  RightArrow,
  Tab,
  Enter,
  CapsLock,
  // Modifiers
  Shift,
  Control,
  Super,
  Alt,
  // Layer keys
  Lower,
  Raise,
  // Blank or agnostic
  Blank,
  Agnostic,
}

export type { Profile, Keycap, KeycapKit, KeycapSet };
export { Legend };
