import { StyleEngine } from "@style-kit-n/core";
import { WebStyleProps, WebTheme } from "./types";
import { propertyStyleMap } from "./propertyStyleMap";
import { htmlAttributes } from "./elementAttributes";

export const webEngine: StyleEngine<
  keyof JSX.IntrinsicElements,
  WebStyleProps,
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
  getBaseProps: () => htmlAttributes,
  reprocessStyles: (styles) => {
    const {borderColor, border, ...rest} = styles

    if (border && borderColor) {
      return {
        ...rest,
        border,
        borderColor
      }
    }

    return styles
  }
};
