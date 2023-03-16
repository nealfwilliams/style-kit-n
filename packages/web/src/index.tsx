import {createStyled} from '@style-kit-n/core';

type HelperProps = {
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pr?: number;
  pb?: number;
  pl?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mr?: number;
  mb?: number;
  ml?: number;
  w?: string;
  mw?: string;
  h?: string;
  mh?: string;
  height?: string;
  width?: string;
  font?: FontType;
  color?: Color;
  border?: boolean;
  borderTop?: boolean;
  borderBottom?: boolean;
  borderLeft?: boolean;
  borderRight?: boolean;
  borderColor?: Color;
  borderRadius?: number;
  bg?: Color;
  br?: number;
  centered?: boolean;
  justify?: CSSProperties["justifyContent"];
  align?: CSSProperties["alignItems"];
  clickable?: boolean;
}

let x = ' awef waef \
awef';

const formatSpace = (n: number) => `${n * theme.baseSpace}px`;

const WebEngine = {
  generateStyles = () => {

  }
}
const styled = createStyled<
  string,
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  CSSProperties,
  HelperProps
>({
  getHelperStyles: (props) => {
    const styles: CSSProperties = {};

    if (props.p) {
      styles.padding = formatSpace(props.p);
    }

    if (props.pt) {
      styles.paddingTop = formatSpace(props.pt);
    }

    if (props.pr) {
      styles.paddingRight = formatSpace(props.pr);
    }

    if (props.pb) {
      styles.paddingBottom = formatSpace(props.pb);
    }

    if (props.pl) {
      styles.paddingLeft = formatSpace(props.pl);
    }

    if (props.px) {
      styles.paddingLeft = formatSpace(props.px);
      styles.paddingRight = formatSpace(props.px);
    }

    if (props.py) {
      styles.paddingTop = formatSpace(props.py);
      styles.paddingBottom = formatSpace(props.py);
    }

    if (props.mx) {
      styles.marginLeft = formatSpace(props.mx);
      styles.marginRight = formatSpace(props.mx);
    }

    if (props.my) {
      styles.marginTop = formatSpace(props.my);
      styles.marginBottom = formatSpace(props.my);
    }

    if (props.mt) {
      styles.marginTop = formatSpace(props.mt);
    }

    if (props.mr) {
      styles.marginRight = formatSpace(props.mr);
    }

    if (props.mb) {
      styles.marginBottom = formatSpace(props.mb);
    }

    if (props.ml) {
      styles.marginLeft = formatSpace(props.ml);
    }

    if (props.m) {
      styles.margin = formatSpace(props.m);
    }

    if (props.border) {
      const color = props.borderColor || colors.textLight as Color;
      styles.border = `solid 1px ${colors[color]}`;
    }

    if (props.borderBottom) {
      const color = props.borderColor || colors.textLight;
      styles.borderBottom = `solid 1px ${color}`;
    }

    if (props.borderTop) {
      const color = props.borderColor || colors.textLight;
      styles.borderTop = `solid 1px ${color}`;
    }

    if (props.borderRight) {
      const color = props.borderColor || colors.textLight;
      styles.borderRight = `solid 1px ${color}`;
    }

    if (props.borderLeft) {
      const color = props.borderColor || colors.textLight;
      styles.borderLeft = `solid 1px ${color}`;
    }

    if (props.borderRadius) {
      styles.borderRadius = formatSpace(props.borderRadius);
    }

    if (props.color) {
      styles.color = colors[props.color];
    }

    if (props.bg) {
      styles.backgroundColor = colors[props.bg];
    }

    if (props.font) {
      const fontStyle = fontStyles[props.font];
      styles.fontSize = fontStyle.fontSize;
      styles.fontWeight = fontStyle.fontWeight || '400',
      styles.color = styles.color || (fontStyle.color && colors[fontStyle.color]) || colors.textDark;
      styles.fontFamily = 'Roboto, sans-serif';
    }

    if (props.centered) {
      styles.display = 'flex';
      styles.justifyContent = 'center';
      styles.alignItems = 'center';
    }

    if (props.justify) {
      styles.justifyContent = props.justify;
    }

    if (props.align) {
      styles.alignItems = props.align;
    }

    if (props.clickable) {
      styles.cursor = 'pointer';
    }

    if (props.w) {
      styles.width = props.w;
    }

    if (props.mw) {
      styles.maxWidth = props.mw;
    }

    if (props.h) {
      styles.height = props.h;
    }

    if (props.mh) {
      styles.maxHeight = props.mh;
    }

    return styles;
  }
});

export default styled;