import { CSSProperties, JSXElementConstructor } from 'react';
import { createComponent } from './createComponent';
import {
  ActiveBreakpointsParam,
  ComputeStylesFn,
  GenericBaseComponent,
  StyledComponent,
  StyleEngine,
  StylesParam,
} from './types';

export function createStyled<
  BaseEl extends GenericBaseComponent,
  StyleProps extends Record<string, any>,
  Engine extends StyleEngine<
    BaseEl,
    StyleProps,
    GeneratedClassNames,
    GeneratedStyles
  > = any,
  GeneratedClassNames extends string = string,
  GeneratedStyles extends Record<string, any> = CSSProperties
>(engine: Engine) {
  return function<
    CustomProps extends Object = {},
    ParentCustomProps extends Object = {}
  >(
    component:
      | BaseEl
      | StyledComponent<BaseEl, StyleProps, GeneratedStyles, ParentCustomProps>,
    stylesParam?:
      | StylesParam<StyleProps, GeneratedStyles>
      | ((props: CustomProps & ParentCustomProps & ActiveBreakpointsParam) => StylesParam<StyleProps, GeneratedStyles>),
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
      stylesParam || ({} as StylesParam<StyleProps, GeneratedStyles>),
    );
  };
}

function _styled<
  BaseEl extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>,
  StyleProps extends Record<string, any>,
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
    | (
        (
          props:
            CustomProps &
            ParentCustomProps &
            ActiveBreakpointsParam
        ) => StylesParam<StyleProps, GeneratedStyles>
      ),
): StyledComponent<
  BaseEl,
  StyleProps,
  GeneratedStyles,
  CustomProps & ParentCustomProps
> {
  type Engine = StyleEngine<
    BaseEl,
    StyleProps,
    GeneratedClassNames,
    GeneratedStyles
  >

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

  // If stylesParam is a function, we will compute styled dynamically
  if (typeof stylesParam === 'function') {
    computeStylesFn = stylesParam;
  } else {
    styles = stylesParam;
  }

  let baseElement: BaseEl;

  // Styled function can take either base element or another styled component
  // Engine will determine if it's a base element or styled component
  if (engine.determineIfBaseEl(component)) {
    baseElement = component as BaseEl;
  } else {
    // Otherwise, we will inherit base element and styles from parent component
    const parentComponent = component as StyledComponent<
      BaseEl,
      StyleProps,
      GeneratedStyles,
      ParentCustomProps
    >;
    baseElement = parentComponent.baseElement;
    inheritedStyles = parentComponent.styles;
    inheritedComputeStylesFns = parentComponent.computeStylesFns as ComputeStylesFn<
      ParentCustomProps,
      StyleProps,
      GeneratedStyles
    >[];
  }

  const styledComponent = createComponent<
    BaseEl,
    StyleProps,
    CustomProps & ParentCustomProps,
    GeneratedStyles,
    GeneratedClassNames,
    Engine
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
