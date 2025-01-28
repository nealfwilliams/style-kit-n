import { useMemo } from 'react';

import {
  ActiveBreakpoints,
  MediaBreakpoint,
  MediaProperty,
  StylesParam,
} from './types';

import { MEDIA_BREAKPOINTS } from './context';

export function mergeMediaProperties<
  StyleProps extends Object,
  GeneratedStyles extends Object
>(mediaProperties: MediaProperty<StyleProps, GeneratedStyles>[]) {
  let newMediaProperty = {} as MediaProperty<StyleProps, GeneratedStyles>;

  for (const mediaProperty of mediaProperties) {
    for (const key in mediaProperty) {
      if (key in newMediaProperty) {
        newMediaProperty[key] = mergeStylesParams<StyleProps, GeneratedStyles>([
          newMediaProperty[key],
          mediaProperty[key],
        ]);
      } else {
        newMediaProperty[key] = mediaProperty[key];
      }
    }
  }

  return newMediaProperty;
}

export function mergeStylesParams<
  StyleProps extends Object,
  GeneratedStyles extends Object
>(
  stylesParams: StylesParam<StyleProps, GeneratedStyles>[]
): StylesParam<StyleProps, GeneratedStyles> {
  let newStylesParam = {} as StylesParam<StyleProps, GeneratedStyles>;

  for (const stylesParam of stylesParams) {
    const {
      directStyles,
      directFocusStyles,
      directHoverStyles,
      styleProps,
      hoverStyleProps,
      focusStyleProps,
    } = parseStylesParam(stylesParam);

    newStylesParam = {
      ...newStylesParam,
      ...styleProps,
      styles: {
        ...newStylesParam.styles,
        ...directStyles,
      },
      hover: {
        ...newStylesParam.hover,
        ...hoverStyleProps,
        styles: {
          ...newStylesParam?.hover?.styles,
          ...directHoverStyles,
        },
      },
      focus: {
        ...newStylesParam.focus,
        ...focusStyleProps,
        styles: {
          ...newStylesParam?.focus?.styles,
          ...directFocusStyles,
        },
      },
    };
  }

  const mediaProperties = stylesParams
    .map(param => param.media)
    .filter(
      mediaProperty => mediaProperty && Object.keys(mediaProperty).length > 0
    ) as MediaProperty<StyleProps, GeneratedStyles>[];

  newStylesParam.media = mergeMediaProperties(mediaProperties);

  return newStylesParam;
}

export function useMemoizedObject<O extends Object>(obj: O): O {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => obj, [JSON.stringify(obj)]);
}

export function parseStylesParam<
  StyleProps extends Object,
  GeneratedStyles extends Object
>(stylesParam: StylesParam<StyleProps, GeneratedStyles>) {
  const {
    styles: directStyles = {} as GeneratedStyles,
    hover: hoverStylesParam = {} as StylesParam<StyleProps, GeneratedStyles>,
    focus: focusStylesParam = {} as StylesParam<StyleProps, GeneratedStyles>,
    media: mediaStylesProperty = {} as MediaProperty<
      StyleProps,
      GeneratedStyles
    >,
    ...styleProps
  } = stylesParam;

  

  const {
    styles: directHoverStyles = {} as GeneratedStyles,
    ...hoverStyleProps
  } = hoverStylesParam;

  const {
    styles: directFocusStyles = {} as GeneratedStyles,
    ...focusStyleProps
  } = focusStylesParam;

  const isHoverSpecified =
    Object.keys(hoverStyleProps).length > 0 ||
    Object.keys(directHoverStyles).length > 0;

  const isFocusSpecified =
    Object.keys(focusStyleProps).length > 0 ||
    Object.keys(directFocusStyles).length > 0;

  return {
    directStyles,
    directHoverStyles,
    directFocusStyles,
    styleProps,
    hoverStyleProps,
    focusStyleProps,
    mediaStylesProperty,
    isHoverSpecified,
    isFocusSpecified,
  };
}

export function evaluateMediaQuery(
  query: string,
  activeBreakpoints: ActiveBreakpoints
) {
  const queryParts = query.split(',');

  let isActive = true;

  for (const queryPart of queryParts) {
    if (queryPart.startsWith('max-')) {
      isActive =
        isActive && !activeBreakpoints[query.substring(4) as MediaBreakpoint];
    } else {
      isActive = isActive && activeBreakpoints[query as MediaBreakpoint];
    }
  }

  return isActive;
}

export function mergeMediaIntoStylesParam(
  styles: StylesParam<any, any>,
  activeBreakpoints: ActiveBreakpoints
) {
  const { media: mediaParam = {}, ...stylesParam } = styles;

  const allStyleParams = [stylesParam];

  // Breakpoint order of simple keys should be preserved
  for (const simpleKey of MEDIA_BREAKPOINTS) {
    if (mediaParam[simpleKey] && activeBreakpoints[simpleKey]) {
      allStyleParams.push(mediaParam[simpleKey]);
    }
  }

  // complex keys either use max keyword or have multiple pieces
  const complexKeys = Object
    .keys(mediaParam)
    .filter(key =>
      key.includes('max') || key.split(',').length > 1
    );

  for (const key of complexKeys) {
    if (evaluateMediaQuery(key, activeBreakpoints)) {
      allStyleParams.push(mediaParam[key]);
    }
  }

  return mergeStylesParams(allStyleParams);
}
