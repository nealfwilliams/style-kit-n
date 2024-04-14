import { WebStyleProps, WebTheme } from "./types"

type StyleHelper = (params: {
  props: WebStyleProps,
  theme: WebTheme
}) => React.CSSProperties

export const propertyStyleMap: {
  [key in keyof WebStyleProps]: StyleHelper
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