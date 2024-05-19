import React, { useContext, useMemo, useState } from 'react';
import { mergeStylesParams, useMemoizedObject } from './misc';
import { useStyles } from './useStyles';
import { StyleKitNContext } from './context';
import {
  ComputeStylesFn,
  StyledComponent,
  StyleEngine,
  StylesParam,
} from './types';

export function createComponent<
  BaseEl extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
  StyleProps extends Record<string, any> = {},
  CustomProps extends Record<string, any> = {},
  GeneratedStyles extends Object = {},
  GeneratedClassNames extends string = string,
  Engine extends StyleEngine<
    BaseEl,
    StyleProps,
    GeneratedClassNames,
    GeneratedStyles
  > = any
>({
  baseElement,
  engine,

  styles = {} as StylesParam<StyleProps, GeneratedStyles>,
  inheritedStyles = {} as StylesParam<StyleProps, GeneratedStyles>,

  computeStylesFn,
  inheritedComputeStylesFns = [],
}: {
  baseElement: BaseEl;
  engine: Engine;

  styles?: StylesParam<StyleProps, GeneratedStyles>;
  inheritedStyles?: StylesParam<StyleProps, GeneratedStyles>;

  computeStylesFn?: ComputeStylesFn<
    CustomProps & StyleProps,
    StyleProps,
    GeneratedStyles
  >;
  inheritedComputeStylesFns?: ComputeStylesFn<
    CustomProps & StyleProps,
    StyleProps,
    GeneratedStyles
  >[];
}) {
  type BaseProps = React.ComponentProps<BaseEl>;

  type ComponentProps = BaseProps & CustomProps & StyleProps;

  const useExtractBaseProps = (_props: any) => {
    const { children, style, ...props } = _props;

    return useMemo(() => {
      const basePropSet = engine.getBaseProps(baseElement);

      const baseProps = {} as React.ComponentProps<BaseEl>;
      const restProps = {} as CustomProps & StyleProps;

      for (const key in props) {
        if (basePropSet.has(key)) {
          baseProps[key] = props[key];
        } else {
          (restProps as any)[key] = props[key];
        }
      }

      return { baseProps, restProps, children, style };
    }, [props]);
  };

  const Component: React.FC<ComponentProps> = _propsOnComponent => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { activeBreakpoints, theme } = useContext(StyleKitNContext);

    const {
      baseProps,
      restProps,
      style: styleAsProp,
      children,
    } = useExtractBaseProps(_propsOnComponent);

    const propsOnComponent = useMemoizedObject(restProps);

    const {
      styleProps,
      directStyles,
      isFocusSpecified,
      isHoverSpecified,
    } = useStyles({
      stylesParam: styles,
      isHovered,
      isFocused,
      activeBreakpoints,
    });

    const {
      styleProps: inheritedStyleProps,
      directStyles: inheritedDirectStyles,
      isFocusSpecified: isFocusSpecifiedOnParent,
      isHoverSpecified: isHoverSpecifiedOnParent,
    } = useStyles({
      stylesParam: inheritedStyles,
      isHovered,
      isFocused,
      activeBreakpoints,
    });

    // Compute styles if styles param passed as a function
    const computedStylesParam: StylesParam = useMemo(() => {
      return computeStylesFn
        ? computeStylesFn({
          ...propsOnComponent,
          activeBreakpoints
        })
        : {};
    }, [propsOnComponent]);

    const {
      styleProps: computedStyleProps,
      directStyles: computedDirectStyles,
      isFocusSpecified: hasComputedFocus,
      isHoverSpecified: hasComputedHover,
    } = useStyles({
      stylesParam: computedStylesParam,
      isHovered,
      isFocused,
      activeBreakpoints,
    });

    // Compute styles from any inherited style functions
    const inheritedComputedStylesParam = useMemo(() => {
      const stylesParams: StylesParam[] = [];

      for (const computeStylesFn of inheritedComputeStylesFns) {
        stylesParams.push(computeStylesFn(propsOnComponent));
      }

      return mergeStylesParams(stylesParams);
    }, [propsOnComponent]);

    const {
      styleProps: inheritedComputedProps,
      directStyles: inheritedComputedStyles,
      isFocusSpecified: inheritedComputedFocus,
      isHoverSpecified: inheritedComputedHover,
    } = useStyles({
      stylesParam: inheritedComputedStylesParam,
      isHovered,
      isFocused,
      activeBreakpoints,
    });

    // Props coming from inheritance have lowest priority
    const inheritedProps = useMemoizedObject({
      ...inheritedStyleProps,
      ...inheritedComputedProps,
    } as StyleProps);

    const propStylesFromInheritance: GeneratedStyles = useMemo(
      () =>
        engine.generateStyles({
          props: inheritedProps,
          theme,
        }),
      [inheritedProps, theme]
    );

    // All props originating in component definition have higher priority
    // than inherited props and lower priority than props passed directly
    // to component
    const propsFromDefinition = useMemoizedObject({
      ...styleProps,
      ...computedStyleProps,
    } as StyleProps);

    const propStylesFromDefinition: GeneratedStyles = useMemo(
      () =>
        engine.generateStyles({
          props: propsFromDefinition,
          theme,
        }),
      [propsFromDefinition, theme]
    );

    const propStylesFromComponentProps: GeneratedStyles = React.useMemo(
      () =>
        engine.generateStyles({
          props: propsOnComponent,
          theme,
        }),
      [propsOnComponent, theme]
    );

    const allStyles = {
      // Priority 3 - Styles from inheritance
      ...propStylesFromInheritance,
      ...inheritedDirectStyles,
      ...inheritedComputedStyles,

      // Priority 2 - Styles derived from component definition
      ...propStylesFromDefinition,
      ...directStyles,
      ...computedDirectStyles,

      // Priority 1 - Styles from directly passed props
      ...propStylesFromComponentProps,
      ...styleAsProp,
    };

    const shouldListenToFocus = React.useMemo(
      () =>
        isFocusSpecified ||
        isFocusSpecifiedOnParent ||
        hasComputedFocus ||
        inheritedComputedFocus,
      [
        isFocusSpecified,
        isFocusSpecifiedOnParent,
        hasComputedFocus,
        inheritedComputedFocus,
      ]
    );

    const shouldListenToHover = React.useMemo(
      () =>
        isHoverSpecified ||
        isHoverSpecifiedOnParent ||
        hasComputedHover ||
        inheritedComputedHover,
      [
        isHoverSpecified,
        isHoverSpecifiedOnParent,
        hasComputedHover,
        inheritedComputedHover,
      ]
    );

    const generatedClassNames = React.useMemo(() => {
      const inheritedClassNames = engine.generateClasses(inheritedProps);
      const classNamesFromDefinition = engine.generateClasses(
        propsFromDefinition
      );
      const classNamesFromPassedProps = engine.generateClasses(
        propsOnComponent
      );

      return engine
        .resolveClassConflicts([
          ...inheritedClassNames,
          ...classNamesFromDefinition,
          ...classNamesFromPassedProps,
        ])
        .join(' ');
    }, [inheritedProps, propsFromDefinition, propsOnComponent]);

    const el = React.createElement(baseElement as any, {
      ...baseProps,
      children,
      style: allStyles,
      className: generatedClassNames,
      onBlur: () => {
        shouldListenToFocus && setIsFocused(false);
      },
      onFocus: () => {
        shouldListenToFocus && setIsFocused(true);
      },
      onMouseOver: () => {
        shouldListenToHover && setIsHovered(true);
      },
      onMouseOut: () => {
        shouldListenToHover && setIsHovered(false);
      },
    });

    return el;
  };

  const styledComponent = (Component as unknown) as StyledComponent<
    BaseEl,
    StyleProps,
    GeneratedStyles,
    CustomProps,
    ComponentProps
  >;

  styledComponent.baseElement = baseElement;

  styledComponent.styles = mergeStylesParams([inheritedStyles, styles]);

  styledComponent.computeStylesFns = computeStylesFn
    ? [...inheritedComputeStylesFns, computeStylesFn]
    : [...inheritedComputeStylesFns];

  return styledComponent;
}
