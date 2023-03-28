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
  BaseElement extends string,
  StyleProps extends Object = {},
  Props extends Object = {},
  ParentProps extends Object = {},
  GeneratedStyles extends Object = {},
  GeneratedClassNames extends string = string,
  Engine extends StyleEngine<
    StyleProps,
    BaseElement,
    any,
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
  baseElement: BaseElement;
  engine: Engine;

  styles?: StylesParam<StyleProps, GeneratedStyles>;
  inheritedStyles?: StylesParam<StyleProps, GeneratedStyles>;

  computeStylesFn?: ComputeStylesFn<
    Props & ParentProps & StyleProps,
    StyleProps,
    GeneratedStyles
  >;
  inheritedComputeStylesFns?: ComputeStylesFn<
    Props & ParentProps & StyleProps,
    StyleProps,
    GeneratedStyles
  >[];
}) {
  const baseProps = engine.getBaseProps(baseElement);
  const basePropNames = new Set(baseProps);

  const Component: React.FC<Props &
    ParentProps &
    StyleProps> = _propsOnComponent => {
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { activeBreakpoints, theme } = useContext(StyleKitNContext);

    const propsOnComponent = useMemoizedObject(_propsOnComponent);

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
      return computeStylesFn ? computeStylesFn(propsOnComponent) : {};
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
      () => engine.generateStyles(inheritedProps, theme),
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
      () => engine.generateStyles(propsFromDefinition, theme),
      [propsFromDefinition, theme]
    );

    const propStylesFromComponentProps: GeneratedStyles = React.useMemo(
      () => engine.generateStyles(propsOnComponent, theme),
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

    // Only keep component props that are valid on HTML, RN view, etc.
    const baseElementProps = Object.keys(propsOnComponent).reduce(
      (props, key) => {
        if (basePropNames.has(key)) {
          (props as any)[key] =
            propsOnComponent[key as keyof typeof propsOnComponent];
        }

        return props;
      },
      {}
    );

    const el = React.createElement(baseElement as any, {
      ...baseElementProps,
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

  const styledComponent = Component as StyledComponent<
    Props & ParentProps & StyleProps,
    BaseElement,
    StyleProps,
    GeneratedStyles
  >;

  styledComponent.baseElement = baseElement;

  styledComponent.styles = mergeStylesParams([inheritedStyles, styles]);

  styledComponent.computeStylesFns = computeStylesFn
    ? [...inheritedComputeStylesFns, computeStylesFn]
    : [...inheritedComputeStylesFns];

  return styledComponent;
}
