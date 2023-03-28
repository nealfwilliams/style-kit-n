import { formatSpace, getBorder } from './helpers';
import { BaseTheme, Color, FontFamily, TypographyType } from '../theme/types';
import { BaseStyleProps } from './types';

export { BaseStyleProps } from './types';

export const handleBaseStyleProp: {
  [prop in keyof BaseStyleProps]: (
    value: any,
    theme: BaseTheme,
    props: BaseStyleProps
  ) => Object;
} = {
  w: (value: string) => ({
    width: value,
  }),
  h: (value: string) => ({
    height: value,
  }),
  p: (value: number, theme: BaseTheme) => ({
    padding: formatSpace(value, theme),
  }),
  pt: (value: number, theme: BaseTheme) => ({
    paddingTop: formatSpace(value, theme),
  }),
  pr: (value: number, theme: BaseTheme) => ({
    paddingRight: formatSpace(value, theme),
  }),
  pb: (value: number, theme: BaseTheme) => ({
    paddingBottom: formatSpace(value, theme),
  }),
  pl: (value: number, theme: BaseTheme) => ({
    paddingLeft: formatSpace(value, theme),
  }),
  px: (value: number, theme: BaseTheme) => ({
    paddingLeft: formatSpace(value, theme),
    paddingRight: formatSpace(value, theme),
  }),
  py: (value: number, theme: BaseTheme) => ({
    paddingTop: formatSpace(value, theme),
    paddingBottom: formatSpace(value, theme),
  }),
  m: (value: number, theme: BaseTheme) => ({
    margin: formatSpace(value, theme),
  }),
  mt: (value: number, theme: BaseTheme) => ({
    marginTop: formatSpace(value, theme),
  }),
  mr: (value: number, theme: BaseTheme) => ({
    marginRight: formatSpace(value, theme),
  }),
  mb: (value: number, theme: BaseTheme) => ({
    marginBottom: formatSpace(value, theme),
  }),
  ml: (value: number, theme: BaseTheme) => ({
    marginLeft: formatSpace(value, theme),
  }),
  mx: (value: number, theme: BaseTheme) => ({
    marginLeft: formatSpace(value, theme),
    marginRight: formatSpace(value, theme),
  }),
  my: (value: number, theme: BaseTheme) => ({
    marginTop: formatSpace(value, theme),
    marginBottom: formatSpace(value, theme),
  }),
  border: (value: boolean, theme: BaseTheme, props: BaseStyleProps) => ({
    border: value ? getBorder(theme, props) : '',
  }),
  borderTop: (value: boolean, theme: BaseTheme, props: BaseStyleProps) => ({
    borderTop: value ? getBorder(theme, props) : '',
  }),
  borderRight: (value: boolean, theme: BaseTheme, props: BaseStyleProps) => ({
    borderRight: value ? getBorder(theme, props) : '',
  }),
  borderBottom: (value: boolean, theme: BaseTheme, props: BaseStyleProps) => ({
    borderBottom: value ? getBorder(theme, props) : '',
  }),
  borderLeft: (value: boolean, theme: BaseTheme, props: BaseStyleProps) => ({
    borderLeft: value ? getBorder(theme, props) : '',
  }),
  rounded: (value: true, theme: BaseTheme, props: BaseStyleProps) => {
    const radius = props.borderRadius || theme.borderRadius;
    return {
      borderRadius: value ? `${radius}px` : '',
    };
  },
  color: (value: Color, theme: BaseTheme) => ({
    color: theme.colors[value],
  }),
  bg: (value: Color, theme: BaseTheme) => ({
    color: theme.colors[value],
  }),
  typography: (
    value: TypographyType,
    theme: BaseTheme,
    props: BaseStyleProps
  ) => {
    const styles = theme.typography[value];
    const fontSize = props.fontSize || styles.fontSize;
    const fontWeight = props.fontWeight || styles.fontWeight || 400;
    const fontFamily = props.fontFamily || styles.fontFamily || 'default';
    return {
      fontFamily: theme.fontFamilies[fontFamily],
      fontSize,
      fontWeight: fontWeight,
      fontStyle: styles.fontStyle,
      lineHeight: styles.lineHeight,
      letterSpacing: styles.letterSpacing,
      wordSpacing: styles.wordSpacing,
      textTransform: styles.textTransform,
    };
  },
  fontSize: (value: number) => ({
    fontSize: `${value}px`,
  }),
  fontFamily: (value: FontFamily, theme: BaseTheme) => ({
    fontFamily: theme.fontFamilies[value],
  }),
  fontWeight: (value: number) => ({
    fontWeight: value,
  }),
  clickable: (value: boolean) => ({
    cursor: value ? 'pointer' : 'default',
  }),
};
