import { CSSProperties } from 'react';
import { createComponent } from './createComponent';
import {
  ComputeStylesFn,
  StyledComponent,
  StyleEngine,
  StylesParam,
} from './types';

export function createStyled<
  BaseElement extends string,
  BaseElementProps extends {
    [key in BaseElement]: Object;
  },
  StyleProps extends Object,
  Engine extends StyleEngine<
    StyleProps,
    BaseElement,
    BaseElementProps,
    GeneratedClassNames,
    GeneratedStyles
  > = any,
  GeneratedClassNames extends string = string,
  GeneratedStyles extends Object = CSSProperties
>(engine: Engine) {
  return function<
    Props extends Object = {},
    ParentProps extends Object = {},
    Element extends BaseElement = any
  >(
    element:
      | Element
      | StyledComponent<ParentProps, Element, StyleProps, GeneratedStyles>,
    stylesParam?:
      | StylesParam<StyleProps, GeneratedStyles>
      | ((props: Props) => StylesParam<StyleProps, GeneratedStyles>)
  ) {
    return _styled<
      Element,
      Props & BaseElementProps[Element],
      ParentProps,
      StyleProps,
      GeneratedClassNames,
      GeneratedStyles
    >(
      engine as any,
      element,
      stylesParam || ({} as StylesParam<StyleProps, GeneratedStyles>)
    );
  };
}

function _styled<
  BaseElement extends string,
  Props extends Object,
  ParentProps extends Object,
  StyleProps extends Object,
  GeneratedClassNames extends string,
  GeneratedStyles extends Object
>(
  engine: StyleEngine<
    StyleProps,
    BaseElement,
    any,
    GeneratedClassNames,
    GeneratedStyles
  >,
  element:
    | BaseElement
    | StyledComponent<ParentProps, BaseElement, StyleProps, GeneratedStyles>,
  stylesParam:
    | StylesParam<StyleProps, GeneratedStyles>
    | ((props: Props) => StylesParam<StyleProps, GeneratedStyles>)
): StyledComponent<
  Props & ParentProps & StyleProps,
  BaseElement,
  StyleProps,
  GeneratedStyles
> {
  let computeStylesFn:
    | ComputeStylesFn<Props & ParentProps, StyleProps, GeneratedStyles>
    | undefined;
  let inheritedComputeStylesFns: ComputeStylesFn<
    Props & ParentProps,
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

  let baseElement: BaseElement;

  if (typeof element === 'string') {
    baseElement = element as BaseElement;
  } else {
    const parentComponent = element as StyledComponent<
      ParentProps,
      BaseElement,
      StyleProps,
      GeneratedStyles
    >;
    baseElement = parentComponent.baseElement;
    inheritedStyles = parentComponent.styles;
    inheritedComputeStylesFns = parentComponent.computeStylesFns;
  }

  const component = createComponent<
    BaseElement,
    StyleProps,
    Props,
    ParentProps,
    GeneratedStyles,
    GeneratedClassNames
  >({
    baseElement,

    styles,
    inheritedStyles,

    computeStylesFn,
    inheritedComputeStylesFns,

    engine,
  });

  return component;
}
