import { CSSProperties } from 'react';

export type QualifiedStyleProps<StyleProps extends Object> = StyleProps & {
  hover?: StyleProps;
  focus?: StyleProps;
  media?: MediaStyleProps<StyleProps>;
};

export type QualifiedDirectStyles<
  GeneratedStyles extends Object
> = GeneratedStyles & {
  hover?: GeneratedStyles;
  focus?: GeneratedStyles;
  media?: MediaDirectStyles<GeneratedStyles>;
};

export type MediaBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type ActiveBreakpoints = {
  [key in MediaBreakpoint]: boolean;
};

export type MediaProperty<
  StyleProps extends Object,
  GeneratedStyles extends Object
> = {
  [key: string]: StylesParam<StyleProps, GeneratedStyles>;
};

export type MediaStyleProps<StyleProps extends Object> = {
  [key: string]: QualifiedStyleProps<StyleProps>;
};

export type MediaDirectStyles<GeneratedStyles extends Object> = {
  [key: string]: GeneratedStyles;
};

export type StylesParam<
  StyleProps extends Object = any,
  GeneratedStyles extends Object = any
> = StyleProps & {
  styles?: GeneratedStyles;
  hover?: StylesParam<StyleProps, GeneratedStyles>;
  focus?: StylesParam<StyleProps, GeneratedStyles>;
  media?: MediaProperty<StyleProps, GeneratedStyles>;
};

export type ComputeStylesFn<
  P,
  StyleProps extends Object,
  GeneratedStyles extends Object
> = (props: P) => StylesParam<StyleProps, GeneratedStyles>;

export type StyledComponent<
  P,
  BaseElement,
  StyleProps extends Object,
  GeneratedStyles extends Object
> = React.FC<P> & {
  styles: StylesParam<StyleProps, GeneratedStyles>;
  computeStylesFns: ComputeStylesFn<P, StyleProps, GeneratedStyles>[];
  baseElement: BaseElement;
};

type GenerateStyles<StyleProps, GeneratedStyles, Theme = any> = (
  styleProps: StyleProps,
  theme: Theme
) => GeneratedStyles;
type GenerateClassNames<StyleProps, ClassName = string> = (
  styleProps: StyleProps
) => ClassName[];
type ResolveClassConflicts<ClassName = string> = (
  classNames: ClassName[]
) => ClassName[];

export type EventListeners = {
  hover?: boolean;
  focus?: boolean;
};

export interface StyleEngine<
  StyleProps = any,
  BaseElement extends string = any,
  BaseElementProps extends {
    [key in BaseElement]: Object;
  } = any,
  ClassNames = string,
  GeneratedStyles extends Object = CSSProperties,
  Theme = any
> {
  generateStyles: GenerateStyles<StyleProps, GeneratedStyles, Theme>;
  generateClasses: GenerateClassNames<StyleProps, ClassNames>;
  resolveClassConflicts: ResolveClassConflicts<ClassNames>;
  getBaseProps: (key: BaseElement) => (keyof BaseElementProps[BaseElement])[];
  getMediaWidth: () => number;
  listenForResize: (setWidthCb: (width: number) => void) => void;
  cleanupResizeListener: () => void;
}
