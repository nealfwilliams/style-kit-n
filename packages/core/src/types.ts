import { CSSProperties } from "react";

export type StylesParam<StyleProps> = StyleProps & {
  styles?: CSSProperties;
  hover?: StylesParam<StyleProps>;
  focus?: StylesParam<StyleProps>;
};

export type ComputeStyleFn<P, StyleProps> = (props: P) => StylesParam<StyleProps>

export type StyledComponent<
  P,
  BaseElement,
  StyleProps,
> = React.FC<
  P
> & {
  directStyles: CSSProperties;
  directHoverStyles: CSSProperties;
  directFocusStyles: CSSProperties;

  styleProps: StyleProps;
  hoverStyleProps: StyleProps;
  focusStyleProps: StyleProps;

  computeStyleFns: ComputeStyleFn<P, StyleProps>[];

  root: BaseElement;
}

type GenerateStyles<StyleProps> = (styleProps: StyleProps) => CSSProperties
type GenerateClassNames<StyleProps, ClassName=string> = (styleProps: StyleProps) => ClassName[];

export type EventListeners = {
  hover?: boolean,
  focus?: boolean
}

export interface StyleEngine<
  StyleProps,
  ClassNames=string
> {
  generateStyles: GenerateStyles<StyleProps>;
  generateClasses: GenerateClassNames<StyleProps, ClassNames>;
}