
import React, { CSSProperties } from "react";
import { ComputeStyleFn, EventListeners, StyleEngine, StylesParam } from "./types";

export function createComponent<BaseElement, Props, ParentProps, StyleProps>(params: {
  root: BaseElement;
  directStyles: CSSProperties;
  directHoverStyles: CSSProperties;
  directFocusStyles: CSSProperties;
  styleProps: StyleProps;
  hoverStyleProps: StyleProps;
  focusStyleProps: StyleProps;
  computeStyleFns: ComputeStyleFn<Props & ParentProps & StyleProps, StyleProps>[];
  engine: StyleEngine<
    StyleProps,
    any
  >,
  eventListeners: EventListeners 
}){
  const {
    directStyles,
    directHoverStyles,
    directFocusStyles,
    styleProps,
    hoverStyleProps,
    focusStyleProps,
    engine,
    computeStyleFns,
    root,
    eventListeners
  } = params;

  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const component: React.FC<Props & ParentProps & StyleProps> = (props) => {
    const {
      computedStyles,
      computedProps
    } = React.useMemo(() => {
      let computedStyles = {};
      let computedProps = {};

      for (const computeStyleFn of computeStyleFns) {
        const computedStyleParam: StylesParam<StyleProps> = computeStyleFn(props);
        const {
          styles: _computedStyles,
          hover: computedHoverParam={} as StylesParam<StyleProps>,
          focus: computedFocusParam={} as StylesParam<StyleProps>,
          ..._computedProps
        } = computedStyleParam;

        const {styles: hoverStyles, ...hoverProps} = computedHoverParam;
        const {styles: focusStyles, ...focusProps} = computedFocusParam;

        computedStyles = {
          ...computedStyles,
          ..._computedStyles,
          ...(isHovered && hoverStyles),
          ...(isFocused && focusStyles),
        };

        computedProps = {
          ...computedProps,
          ..._computedProps,
          ...(isHovered && hoverProps),
          ...(isFocused && focusProps),
        };
      }
      return {
        computedStyles,
        computedProps
      }
    }, [isHovered, isFocused, ...Object.values(props)])

    const allProps = {
      ...styleProps,
      ...computedProps,
      ...(isHovered && hoverStyleProps),
      ...(isFocused && focusStyleProps)
    };

    const generatedStyles: CSSProperties = React.useMemo(
      () => engine.generateStyles(allProps),
      [isHovered, isFocused, ...Object.values(props)]
    );

    const generatedClassNames = React.useMemo(
      () => engine.generateClasses(allProps),
      [isHovered, isFocused, ...Object.values(props)]
    );

    const allStyles = {
      ...generatedStyles,
      ...directStyles,
      ...computedStyles,
      ...(isHovered && directHoverStyles),
      ...(isFocused && directFocusStyles),
    }

    const el = React.createElement(root as any, {
      ...props,
      style: allStyles,
      className: generatedClassNames.join(' '),
      onBlur: () => {
        eventListeners.focus && setIsFocused(false);
      },
      onFocus: () => {
        eventListeners.focus && setIsFocused(false);
      },
      onMouseOver: () => {
        eventListeners.hover && setIsHovered(true);
      },
      onMouseOut: () => {
        eventListeners.hover && setIsHovered(false);
      }
    });

    return el;
  }

  return component;
}