import React from 'react';
import {
  mergeMediaIntoStylesParam,
  parseStylesParam,
  useMemoizedObject,
} from './misc';
import { ActiveBreakpoints, StylesParam } from './types';

export function useStyles({
  stylesParam: _stylesParam,
  isHovered,
  isFocused,
  activeBreakpoints,
}: {
  stylesParam: StylesParam<any, any>;
  isHovered: boolean;
  isFocused: boolean;
  activeBreakpoints: ActiveBreakpoints;
}) {
  const stylesParam = useMemoizedObject(_stylesParam);

  const {
    styleProps,
    focusStyleProps,
    hoverStyleProps,
    directStyles,
    directFocusStyles,
    directHoverStyles,
    isFocusSpecified,
    isHoverSpecified,
  } = React.useMemo(() => {
    const mergedStylesParam = mergeMediaIntoStylesParam(
      stylesParam,
      activeBreakpoints
    );
    return parseStylesParam(mergedStylesParam);
  }, [activeBreakpoints, stylesParam]);

  const allDirectStyles = {
    ...directStyles,
    ...(isFocused ? directFocusStyles : {}),
    ...(isHovered ? directHoverStyles : {}),
  };

  const allStyleProps = {
    ...styleProps,
    ...(isFocused ? focusStyleProps : {}),
    ...(isHovered ? hoverStyleProps : {}),
  };

  return {
    styleProps: allStyleProps,
    directStyles: allDirectStyles,
    isFocusSpecified,
    isHoverSpecified,
  };
}
