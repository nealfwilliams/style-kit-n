import { BaseStyleProps } from '../styleProps/types';
import { BaseTheme, Color } from '../theme/types';

export const formatSpace = (n: number, theme: BaseTheme) =>
  `${theme.spacing[Math.min(n, theme.spacing.length - 1)]}px`;

export const getColor = (color: Color, theme: BaseTheme) =>
  `${theme.colors[color]}`;

export const getBorder = (theme: BaseTheme, props: BaseStyleProps) => {
  const color = props.borderColor || theme.borderColor;
  const width = props.borderWidth || theme.borderWidth;
  return `solid ${theme.colors[color]} ${width}px`;
};
