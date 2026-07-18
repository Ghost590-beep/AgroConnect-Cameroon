// client/src/styles/theme.ts
// Plain-JS mirror of theme.css's custom properties, for the inline
// `color="#hex"` react-icon props and `style={{color:...}}` spots that
// can't read a CSS custom property directly. Keep every key's value in
// sync with its `--color-*` counterpart in theme.css.

export const COLORS = {
  primary: "#C1502E",
  primaryDark: "#9C3F23",
  primaryLight: "#E8A184",

  secondary: "#D9A441",
  secondaryDark: "#B8842A",
  secondaryLight: "#F0D9A0",

  accentBrown: "#6B4A32",
  accentBrownDark: "#4A3220",

  success: "#4C7A3D",
  successBg: "#E7EFE0",
  info: "#4A7A96",
  infoBg: "#E3EEF3",
  danger: "#B3402E",
  dangerBg: "#F6E4DF",

  bg: "#FBF3E7",
  bgAlt: "#F3E4CE",
  surface: "#FFFFFF",
  surfaceSunken: "#F0E6D6",

  text: "#3A2A1E",
  textMuted: "#7A6A5C",
  textOnPrimary: "#FFFFFF",
  textOnDark: "#F5EAD9",

  border: "#E3D2B8",
  borderStrong: "#C9AE86",
} as const;
