import { CSSProperties } from "react"

export type WebTheme = {
  colors: {
    [key: string]: string
  },
  space: string[],
  fontFamilies: {
    [key: string]: string
  },
  fontSizes: {
    [key: string]: string
  },
  fontWeights: {
    [key: string]: string
  },
  lineHeights: {
    [key: string]: string
  },
  typography: {
    [key: string]: {
      fontFamily: string,
      fontSize: string,
      fontWeight: string,
      lineHeight: string
    }
  }
}

export interface WebStyleProps {
  bg?: string,
  color?: string,
  borderColor?: string,
  w?: string,
  h?: string,
  m?: number,
  mt?: number,
  mb?: number,
  ml?: number,
  mr?: number,
  my?: number,
  mx?: number,
  p?: number,
  pt?: number,
  pb?: number,
  pl?: number,
  pr?: number,
  py?: number,
  px?: number,
  typography?: string,
  fontSize?: string,
  lineHeight?: string,
  fontFamily?: string,
  fontWeight?: string,
  display?: CSSProperties['display'],
  flexDirection?: CSSProperties['flexDirection']
}