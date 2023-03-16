import React, { CSSProperties } from "react";
import { createComponent } from "./createComponent";
import { ComputeStyleFn, EventListeners, StyledComponent, StyleEngine, StylesParam } from "./types";

export function createStyled<
  BaseElement,
  BaseProps,
  StyleProps={},
  GeneratedClassName=string
>(engine: StyleEngine<
  StyleProps,
  GeneratedClassName
>) {
  return function<Props={}, ParentProps={}>(
    element: BaseElement | StyledComponent<BaseProps & ParentProps, BaseElement, StyleProps>,
    stylesParam?: StylesParam<StyleProps>,
    eventListeners?: EventListeners
  ) {
    return _styled<
      BaseElement,
      BaseProps & Props,
      BaseProps & ParentProps,
      StyleProps,
      GeneratedClassName
    >(
      engine,
      element,
      stylesParam || {} as any,
      eventListeners || {}
    );
  }
};

function _styled<BaseElement, Props={}, ParentProps={}, StyleProps={}, GeneratedClassName=string>(
  engine: StyleEngine<StyleProps, GeneratedClassName>,
  element: BaseElement | StyledComponent<ParentProps, BaseElement, StyleProps>,
  stylesParam: StylesParam<StyleProps> | ((props: Props) => StylesParam<StyleProps>),
  eventListeners: EventListeners
): StyledComponent<Props & ParentProps & StyleProps, BaseElement, StyleProps> {
  let directStyles: CSSProperties = {};
  let directHoverStyles: CSSProperties = {};
  let directFocusStyles: CSSProperties = {};

  let styleProps = {} as StyleProps;
  let hoverStyleProps = {} as StyleProps;
  let focusStyleProps = {}  as StyleProps;

  let computeStyleFns: ComputeStyleFn<Props & ParentProps, StyleProps>[] =
    typeof stylesParam === 'function'
      ? [stylesParam]
      : [];

  if (typeof stylesParam !== 'function') {
    const {
      styles: _directStyles,
      hover: hoverStylesParam = {} as StylesParam<StyleProps>,
      focus: focusStylesParam = {} as StylesParam<StyleProps>,
      ..._styleProps
    } = stylesParam;

    const {styles: _directHoverStyles, ..._hoverStyleProps} = hoverStylesParam;
    const {styles: _directFocusStyles, ..._focusStyleProps} = focusStylesParam;

    directStyles = _directStyles as CSSProperties;
    directHoverStyles = _directHoverStyles as CSSProperties;
    directFocusStyles = _directFocusStyles as CSSProperties;
    styleProps = _styleProps as StyleProps;
    hoverStyleProps = _hoverStyleProps as StyleProps;
    focusStyleProps = _focusStyleProps as StyleProps;
  }

  let root: BaseElement;

  const isRootElement = typeof element === 'string';

  if (isRootElement) {
    root = element;

  } else {
    const parentComponent = element as StyledComponent<ParentProps, BaseElement, StyleProps>;
    // Inherit underlying component from parent
    root = parentComponent.root;

    // Merge component styles, props, and style fns with parents
    directStyles = {
      ...parentComponent.directStyles,
      ...directStyles,
    };

    directFocusStyles = {
      ...parentComponent.directFocusStyles,
      ...directFocusStyles
    }

    directHoverStyles = {
      ...parentComponent.directHoverStyles,
      ...directHoverStyles
    }

    styleProps = {
      ...parentComponent.styleProps,
      ...styleProps,
    };

    hoverStyleProps = {
      ...parentComponent.hoverStyleProps,
      ...hoverStyleProps,
    };

    focusStyleProps = {
      ...parentComponent.focusStyleProps,
      ...focusStyleProps,
    };

    computeStyleFns = [...parentComponent.computeStyleFns, ...computeStyleFns];
  } 

  const component = createComponent<BaseElement, Props, ParentProps, StyleProps>({
    root,
    styleProps,
    hoverStyleProps,
    focusStyleProps,
    directStyles,
    directHoverStyles,
    directFocusStyles,
    computeStyleFns,
    engine,
    eventListeners
  });

  const styledComponent = component as StyledComponent<Props & ParentProps & StyleProps, BaseElement, StyleProps>;

  styledComponent.directStyles = directStyles;
  styledComponent.styleProps = styleProps;
  styledComponent.root = root;
  styledComponent.computeStyleFns = computeStyleFns;

  return styledComponent;
}

