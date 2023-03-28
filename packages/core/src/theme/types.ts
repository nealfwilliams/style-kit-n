import { CSSProperties } from 'react';
import { MediaBreakpoint } from '../types';

export type TypographyStyle = {
  fontSize: string;
  fontFamily?: FontFamily;
  fontWeight?: 400 | 500 | 600 | 700 | 800;
  textDecoration?: CSSProperties['textDecoration'];
  fontStyle?: CSSProperties['fontStyle'];
  textTransform?: CSSProperties['textTransform'];
  lineHeight?: CSSProperties['lineHeight'];
  wordSpacing?: CSSProperties['wordSpacing'];
  letterSpacing?: CSSProperties['letterSpacing'];
};

export type FontFamily =
  | 'default'
  | 'systemUi'
  | 'transitional'
  | 'oldStyle'
  | 'humanist'
  | 'geometricHumanist'
  | 'classicalHumanist'
  | 'neoGrotesque'
  | 'monospaceSlabSerif'
  | 'monospaceCode'
  | 'industrial'
  | 'uiRounded';

export type TypographyStyles = {
  paragraph: TypographyStyle;
  paragraphSmall: TypographyStyle;
  paragraphLarge: TypographyStyle;
  label: TypographyStyle;
  labelSmall: TypographyStyle;
  labelLarge: TypographyStyle;
  heading: TypographyStyle;
  headingSmall: TypographyStyle;
  headingLarge: TypographyStyle;
  headingXLarge: TypographyStyle;
  control: TypographyStyle;
  controlSmall: TypographyStyle;
  controlLarge: TypographyStyle;
  quote: TypographyStyle;
  quoteSmall: TypographyStyle;
  quoteLarge: TypographyStyle;
};

export type TypographyType = keyof TypographyStyles;

export type Colors = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  textOnPrimary: string;
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;
  textOnSecondary: string;
  error: string;
  errorLight: string;
  errorDark: string;
  textOnError: string;
  warning: string;
  warningLight: string;
  warningDark: string;
  textOnWarning: string;
  info: string;
  infoLight: string;
  infoDark: string;
  textOnInfo: string;
  success: string;
  successLight: string;
  successDark: string;
  textOnSuccess: string;
  link: string;
  text: string;
  textLight: string;
  textDark: string;
  textInverted: string;
  textInvertedLight: string;
  textInvertedDark: string;
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  backgroundInverted: string;
  backgroundInvertedLight: string;
  backgroundInvertedDark: string;
  faint: string;
  faintInverted: string;
};

export type Color = keyof Colors;

export type BaseTheme = {
  spacing: number[];
  colors: Colors;
  fontFamilies: {
    [key in FontFamily]: string;
  };
  typography: TypographyStyles;
  borderWidth: number;
  borderRadius: number;
  borderColor: Color;
  mediaBreakpoints: {
    [key in MediaBreakpoint]: number;
  };
};
