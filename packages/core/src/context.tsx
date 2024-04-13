import React, { useEffect, useMemo, useState } from 'react';
import { ActiveBreakpoints, MediaBreakpoint, StyleEngine } from './types';

export const MEDIA_BREAKPOINTS: MediaBreakpoint[] = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
];

type Theme = {
  mediaBreakpoints?: {
    [key in MediaBreakpoint]: number;
  };
} & Record<string, any>;

export const baseTheme: Theme = {
  mediaBreakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1400,
  },
};

export const StyleKitNContext = React.createContext<{
  theme: Theme;
  activeBreakpoints: ActiveBreakpoints;
}>({
  theme: {} as Theme,
  activeBreakpoints: {
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  },
});

export const StyleKitNProvider: React.FC<{
  theme: Theme;
  engine: StyleEngine<any>;
  children?: React.ReactNode;
}> = ({ theme: _theme, engine, children }) => {
  const theme = useMemo(() => ({
    ..._theme,
    mediaBreakpoints: {
      ...baseTheme.mediaBreakpoints,
      ..._theme?.mediaBreakpoints,
    },
  } as Theme), [_theme]);

  const [mediaWidth, setMediaWidth] = useState(engine.getMediaWidth());

  useEffect(() => {
    engine.listenForResize(setMediaWidth);

    return engine.cleanupResizeListener;
  }, [setMediaWidth, engine]);

  const activeBreakpoints = useMemo(() => {
    const activeBreakpoints: Partial<ActiveBreakpoints> = {
      sm: true
    };

    MEDIA_BREAKPOINTS.forEach((breakpoint, i) => {
      if ( i === 0 ) {
        return
      }

      const lastBreakpoint = MEDIA_BREAKPOINTS[i - 1];

      const breakpointWidth = theme?.mediaBreakpoints ? theme.mediaBreakpoints[lastBreakpoint] : 0
      if (mediaWidth >= breakpointWidth) {
        activeBreakpoints[breakpoint] = true;
      }
    })

    return activeBreakpoints as ActiveBreakpoints;
  }, [mediaWidth, theme.mediaBreakpoints]);

  return (
    <StyleKitNContext.Provider value={{ theme, activeBreakpoints }}>
      {children}
    </StyleKitNContext.Provider>
  );
};
