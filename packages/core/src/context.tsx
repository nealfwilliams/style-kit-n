import React, { useEffect, useMemo, useState } from 'react';
import { MEDIA_BREAKPOINTS } from './constants';
import { BaseTheme } from './theme/types';
import { ActiveBreakpoints, StyleEngine } from './types';

export const StyleKitNContext = React.createContext<{
  theme: BaseTheme;
  activeBreakpoints: ActiveBreakpoints;
}>({
  theme: {} as BaseTheme,
  activeBreakpoints: {
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  },
});

export const StyleKitNProvider: React.FC<{
  theme: BaseTheme;
  engine: StyleEngine;
  children?: React.ReactNode;
}> = ({ theme, engine, children }) => {
  const [mediaWidth, setMediaWidth] = useState(engine.getMediaWidth());

  useEffect(() => {
    engine.listenForResize(setMediaWidth);

    return engine.cleanupResizeListener;
  }, [setMediaWidth, engine]);

  const activeBreakpoints = useMemo(() => {
    const activeBreakpoints: Partial<ActiveBreakpoints> = {};

    for (const breakpoint of MEDIA_BREAKPOINTS) {
      if (mediaWidth >= theme.mediaBreakpoints[breakpoint]) {
        activeBreakpoints[breakpoint] = true;
      }
    }

    return activeBreakpoints as ActiveBreakpoints;
  }, [mediaWidth, theme.mediaBreakpoints]);

  return (
    <StyleKitNContext.Provider value={{ theme, activeBreakpoints }}>
      {children}
    </StyleKitNContext.Provider>
  );
};
