import { CSSProperties, JSXElementConstructor } from 'react';
import { createComponent } from './createComponent';
import {
  ComputeStylesFn,
  GenericBaseComponent,
  StyledComponent,
  StyleEngine,
  StylesParam,
} from './types';

export function createStyled<
  BaseEl extends GenericBaseComponent,
  StyleProps extends Object,
  Engine extends StyleEngine<
    BaseEl,
    StyleProps,
    GeneratedClassNames,
    GeneratedStyles
  > = any,
  GeneratedClassNames extends string = string,
  GeneratedStyles extends Object = CSSProperties
>(engine: Engine) {
  return function<
    BaseEl extends GenericBaseComponent = GenericBaseComponent,
    CustomProps extends Object = {},
    ParentCustomProps extends Object = {}
  >(
    component:
      | BaseEl
      | StyledComponent<BaseEl, StyleProps, GeneratedStyles, ParentCustomProps>,
    stylesParam?:
      | StylesParam<StyleProps, GeneratedStyles>
      | ((props: CustomProps & ParentCustomProps) => StylesParam<StyleProps, GeneratedStyles>)
  ) {
    return _styled<
      BaseEl,
      StyleProps,
      CustomProps,
      GeneratedClassNames,
      GeneratedStyles,
      ParentCustomProps
    >(
      engine as any,
      component,
      stylesParam || ({} as StylesParam<StyleProps, GeneratedStyles>)
    );
  };
}

function _styled<
  BaseEl extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  StyleProps extends Object,
  CustomProps extends Object,
  GeneratedClassNames extends string,
  GeneratedStyles extends Object,
  ParentCustomProps extends Object,
>(
  engine: StyleEngine<
    BaseEl,
    StyleProps,
    GeneratedClassNames,
    GeneratedStyles
  >,
  component:
    | BaseEl
    | StyledComponent<BaseEl, StyleProps, GeneratedStyles, ParentCustomProps>,
  stylesParam:
    | StylesParam<StyleProps, GeneratedStyles>
    | ((props: CustomProps & ParentCustomProps) => StylesParam<StyleProps, GeneratedStyles>)

): StyledComponent<
  BaseEl,
  StyleProps,
  GeneratedStyles,
  CustomProps & ParentCustomProps
> {
  let computeStylesFn:
    | ComputeStylesFn<CustomProps & ParentCustomProps, StyleProps, GeneratedStyles>
    | undefined;
  let inheritedComputeStylesFns: ComputeStylesFn<
    ParentCustomProps,
    StyleProps,
    GeneratedStyles
  >[] = [];

  let styles = {} as StylesParam<StyleProps, GeneratedStyles>;
  let inheritedStyles = {} as StylesParam<StyleProps, GeneratedStyles>;

  if (typeof stylesParam === 'function') {
    computeStylesFn = stylesParam;
  } else {
    styles = stylesParam;
  }

  let baseElement: BaseEl;

  if (engine.determineIfBaseEl(component)) {
    baseElement = component as BaseEl;
  } else {
    const parentComponent = component as StyledComponent<
      BaseEl,
      StyleProps,
      GeneratedStyles,
      ParentCustomProps,
    >;
    baseElement = parentComponent.baseElement;
    inheritedStyles = parentComponent.styles;
    inheritedComputeStylesFns = parentComponent.computeStylesFns;
  }

  const styledComponent = createComponent<
    BaseEl,
    StyleProps,
    GeneratedStyles,
    GeneratedClassNames
    ParentProps,
  >({
    baseElement,

    styles,
    inheritedStyles,

    computeStylesFn,
    inheritedComputeStylesFns,

    engine,
  });

  return styledComponent;
}
