import React, { CSSProperties } from 'react';
// import { createStyled, BaseStyleProps, StyleEngine } from '../../core/src';
import { createStyled, StyleEngine, StyleKitNProvider } from '@style-kit-n/core';

import { htmlAttributes } from './elementAttributes';

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

type StyleProps = {
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

type StyleHelper = (params: {
  props: StyleProps,
  theme: WebTheme
}) => React.CSSProperties

const propertyStyleMap: {
  [key in keyof StyleProps]: StyleHelper
} = {
  display: ({props}) => ({
    display: props.display
  }),
  flexDirection: ({props}) => ({
    flexDirection: props.flexDirection
  }),
  bg: ({
    props,
    theme
  }) => ({
    backgroundColor: theme.colors[props.bg!] || props.bg
  }),
  color: ({
    props,
    theme
  }) => ({
    color: theme.colors[props.color!] || props.color
  }),
  borderColor: ({
    props,
    theme
  }) => ({
    borderColor: theme.colors[props.borderColor!] || props.borderColor
  }),
  w: ({
    props
  }) => ({
    width: props.w
  }),
  h: ({
    props
  }) => ({
    height: props.h
  }),
  m: ({
    props,
    theme,
  }) => ({
    margin: theme.space[props.m!] || props.m
  }),
  mt: ({
    props,
    theme,
  }) => ({
    marginTop: theme.space[props.mt!] || props.mt
  }),
  mb: ({
    props,
    theme,
  }) => ({
    marginBottom: theme.space[props.mb!] || props.mb
  }),
  ml: ({
    props,
    theme,
  }) => ({
    marginLeft: theme.space[props.ml!] || props.ml
  }),
  mr: ({
    props,
    theme,
  }) => ({
    marginRight: theme.space[props.mr!] || props.mr
  }),
  my: ({
    props,
    theme,
  }) => ({
    marginTop: theme.space[props.my!] || props.my,
    marginBottom: theme.space[props.my!] || props.my
  }),
  mx: ({
    props,
    theme,
  }) => ({
    marginLeft: theme.space[props.mx!] || props.mx,
    marginRight: theme.space[props.mx!] || props.mx
  }),
  p: ({
    props,
    theme,
  }) => ({
    padding: theme.space[props.p!] || props.p
  }),
  pt: ({
    props,
    theme,
  }) => ({
    paddingTop: theme.space[props.pt!] || props.pt
  }),
  pb: ({
    props,
    theme,
  }) => ({
    paddingBottom: theme.space[props.pb!] || props.pb
  }),
  pl: ({
    props,
    theme,
  }) => ({
    paddingLeft: theme.space[props.pl!] || props.pl
  }),
  pr: ({
    props,
    theme,
  }) => ({
    paddingRight: theme.space[props.pr!] || props.pr
  }),
  py: ({
    props,
    theme,
  }) => ({
    paddingTop: theme.space[props.py!] || props.py,
    paddingBottom: theme.space[props.py!] || props.py
  }),
  px: ({
    props,
    theme,
  }) => ({
    paddingLeft: theme.space[props.px!] || props.px,
    paddingRight: theme.space[props.px!] || props.px
  }),
  typography: ({
    props,
    theme
  }) => {
    const typography = theme.typography[props.typography!]
    return {
      fontFamily: theme.fontFamilies[typography.fontFamily],
      fontSize: theme.fontSizes[typography.fontSize],
      fontWeight: theme.fontWeights[typography.fontWeight] as any,
      lineHeight: theme.lineHeights[typography.lineHeight]
    }
  },
  fontSize: ({
    props,
    theme
  }) => ({
    fontSize: theme.fontSizes[props.fontSize!]
  }),
  lineHeight: ({
    props,
    theme
  }) => ({
    lineHeight: theme.lineHeights[props.lineHeight!]
  }),
  fontFamily: ({
    props,
    theme
  }) => ({
    fontFamily: theme.fontFamilies[props.fontFamily!]
  }),
  fontWeight: ({
    props,
    theme
  }) => ({
    fontWeight: theme.fontWeights[props.fontWeight!] as any
  }),
}

const webEngine: StyleEngine<
  keyof JSX.IntrinsicElements,
  StyleProps,
  string,
  React.CSSProperties,
  WebTheme
> = {
  determineIfBaseEl: (el) => typeof el === 'string',
  generateStyles: ({props, theme}) => {
    let styles: React.CSSProperties = {}

    for (const key in props) {
      if (propertyStyleMap[key]) {
        styles = {
          ...styles,
          ...propertyStyleMap[key]({props, theme})
        }
      }
    }

    return styles
  },
  generateClasses: () => [],
  resolveClassConflicts: () => [],
  getMediaWidth: () => {
    return typeof window !== 'undefined' ? window.innerWidth : 0;
  },
  listenForResize: (setWidthCb) => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        setWidthCb(window.innerWidth);
      });
    }
  },
  cleanupResizeListener: () => {},
  getBaseProps: () => htmlAttributes
};

export const styled = createStyled<
  keyof JSX.IntrinsicElements,
  StyleProps,
  typeof webEngine,
  string,
  React.CSSProperties
>(webEngine)

export const Row = styled('div', {
  display: 'flex',
  flexDirection: 'row'
})

export const Col = styled('div', {
  display: 'flex',
  flexDirection: 'column'
})

export const Button = styled('button')
export const Inline = styled('span')
export const Paragraph = styled('p')
export const Link = styled('a')
export const Heading1 = styled('h1')
export const Heading2 = styled('h2')
export const Heading3 = styled('h3')
export const Heading4 = styled('h4')
export const Heading5 = styled('h5')
export const Heading6 = styled('h6')
export const Image = styled('img')
export const Input = styled('input')
export const Label = styled('label')
export const Textarea = styled('textarea')
export const Select = styled('select')
export const Option = styled('option')
export const Form = styled('form')
export const Fieldset = styled('fieldset')
export const Legend = styled('legend')
export const Table = styled('table')
export const THead = styled('thead')
export const TBody = styled('tbody')
export const TFoot = styled('tfoot')
export const TR = styled('tr')
export const TH = styled('th')
export const Section = styled('section')
export const Main = styled('main')

export const WebKitNProvider: React.FC<React.PropsWithChildren<{
  theme: WebTheme
}>> = ({
  theme: WebTheme,
  children
}) => {
  return (
    <StyleKitNProvider engine={webEngine} theme={WebTheme}>
      {children}
    </StyleKitNProvider>
  )
}