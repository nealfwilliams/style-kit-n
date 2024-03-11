import React from 'react';
// import { createStyled, BaseStyleProps, StyleEngine } from '../../core/src';
import { createStyled, StyleEngine, StyleKitNProvider } from '@style-kit-n/core';

import { htmlAttributes } from './elementAttributes';

type StyleProps = {
  bg?: string,
  color?: string,
  borderColor?: string,
  w?: string,
  h?: string,
  m?: string,
  mt?: string,
  mb?: string,
  ml?: string,
  mr?: string,
  my?: string,
  mx?: string,
  p?: string,
  pt?: string,
  pb?: string,
  pl?: string,
  pr?: string,
  py?: string,
  px?: string,
  typography?: string,
  fontSize?: string,
  lineHeight?: string,
  fontFamily?: string,
  fontWeight?: string
}

const propertyStyleMap = {
  bg: ({
    props,
    theme
  }) => ({
    backgroundColor: theme.colors[props.bg] || props.bg
  }),
  color: ({
    props,
    theme
  }) => ({
    color: theme.colors[props.color] || props.color
  }),
  borderColor: ({
    props,
    theme
  }) => ({
    borderColor: theme.colors[props.borderColor] || props.borderColor
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
    margin: theme.space[props.m] || props.m
  }),
  mt: ({
    props,
    theme,
  }) => ({
    marginTop: theme.space[props.mt] || props.mt
  }),
  mb: ({
    props,
    theme,
  }) => ({
    marginBottom: theme.space[props.mb] || props.mb
  }),
  ml: ({
    props,
    theme,
  }) => ({
    marginLeft: theme.space[props.ml] || props.ml
  }),
  mr: ({
    props,
    theme,
  }) => ({
    marginRight: theme.space[props.mr] || props.mr
  }),
  my: ({
    props,
    theme,
  }) => ({
    marginTop: theme.space[props.my] || props.my,
    marginBottom: theme.space[props.my] || props.my
  }),
  mx: ({
    props,
    theme,
  }) => ({
    marginLeft: theme.space[props.mx] || props.mx,
    marginRight: theme.space[props.mx] || props.mx
  }),
  p: ({
    props,
    theme,
  }) => ({
    padding: theme.space[props.p] || props.p
  }),
  pt: ({
    props,
    theme,
  }) => ({
    paddingTop: theme.space[props.pt] || props.pt
  }),
  pb: ({
    props,
    theme,
  }) => ({
    paddingBottom: theme.space[props.pb] || props.pb
  }),
  pl: ({
    props,
    theme,
  }) => ({
    paddingLeft: theme.space[props.pl] || props.pl
  }),
  pr: ({
    props,
    theme,
  }) => ({
    paddingRight: theme.space[props.pr] || props.pr
  }),
  py: ({
    props,
    theme,
  }) => ({
    paddingTop: theme.space[props.py] || props.py,
    paddingBottom: theme.space[props.py] || props.py
  }),
  px: ({
    props,
    theme,
  }) => ({
    paddingLeft: theme.space[props.px] || props.px,
    paddingRight: theme.space[props.px] || props.px
  }),
  typography: ({
    props,
    theme
  }) => {
    const typography = theme.typography[props.typography]
    return {
      fontFamily: theme.fontFamily[typography.fontFamily],
      fontSize: theme.fontSize[typography.fontSize],
      fontWeight: theme.fontWeight[typography.fontWeight] as any,
      lineHeight: theme.lineHeight[typography.lineHeight]
    }
  },
  fontSize: ({
    props,
    theme
  }) => ({
    fontSize: theme.fontSize[props.fontSize]
  }),
  lineHeight: ({
    props,
    theme
  }) => ({
    lineHeight: theme.lineHeight[props.lineHeight]
  }),
  fontFamily: ({
    props,
    theme
  }) => ({
    fontFamily: theme.fontFamily[props.fontFamily]
  }),
  fontWeight: ({
    props,
    theme
  }) => ({
    fontWeight: theme.fontWeight[props.fontWeight] as any
  }),
}

type WebTheme = {
  colors: {
    [key: string]: string
  },
  space: {
    [key: string]: string
  },
  fontFamily: {
    [key: string]: string
  },
  fontSize: {
    [key: string]: string
  },
  fontWeight: {
    [key: string]: string
  },
  lineHeight: {
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

export const styled = createStyled(webEngine)

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