import { BaseTheme } from './types';

export { BaseTheme } from './types';

export const baseTheme: BaseTheme = {
  spacing: [0, 4, 8, 16, 32, 64],

  // font families pulled from https://github.com/system-fonts/modern-font-stacks
  fontFamilies: {
    default:
      "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;",
    systemUi: 'system-ui, sans-serif;',
    transitional: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif;",
    oldStyle:
      "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif;",
    humanist:
      "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif;",
    geometricHumanist:
      "Avenir, 'Avenir Next LT Pro', Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif;",
    classicalHumanist:
      "Optima, Candara, 'Noto Sans', source-sans-pro, sans-serif;",
    neoGrotesque:
      "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif;",
    monospaceSlabSerif:
      "'Nimbus Mono PS', 'Courier New', 'Cutive Mono', monospace;",
    monospaceCode:
      "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;",
    industrial:
      "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif;",
    uiRounded:
      "'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif;",
  },

  typography: {
    paragraph: {
      fontSize: '16px',
      fontFamily: 'default',
    },
    paragraphLarge: {
      fontSize: '20px',
      fontFamily: 'default',
    },
    paragraphSmall: {
      fontSize: '14px',
      fontFamily: 'default',
    },
    label: {
      fontSize: '16px',
      fontFamily: 'default',
      fontWeight: 700,
    },
    labelSmall: {
      fontSize: '14px',
      fontFamily: 'default',
      fontWeight: 700,
    },
    labelLarge: {
      fontSize: '20px',
      fontFamily: 'default',
      fontWeight: 700,
    },
    control: {
      fontSize: '16px',
      fontFamily: 'default',
    },
    controlSmall: {
      fontSize: '14px',
      fontFamily: 'default',
    },
    controlLarge: {
      fontSize: '18px',
      fontFamily: 'default',
    },
    heading: {
      fontSize: '18px',
      fontFamily: 'default',
      fontWeight: 600,
    },
    headingSmall: {
      fontSize: '14px',
      fontFamily: 'default',
      fontWeight: 700,
    },
    headingLarge: {
      fontSize: '24px',
      fontFamily: 'default',
      fontWeight: 400,
    },
    headingXLarge: {
      fontSize: '32px',
      fontFamily: 'default',
    },
    quote: {
      fontSize: '16px',
      fontFamily: 'default',
      fontStyle: 'italic',
    },
    quoteSmall: {
      fontSize: '14px',
      fontFamily: 'default',
      fontStyle: 'italic',
    },
    quoteLarge: {
      fontSize: '18px',
      fontFamily: 'default',
      fontStyle: 'italic',
    },
  },

  colors: {
    primary: '#0148da',
    primaryLight: '#4582ff',
    primaryDark: '#0236a1',
    textOnPrimary: '#ffffff',
    secondary: '#fa6f0b',
    secondaryDark: '#b94d00',
    secondaryLight: '#ff9345',
    textOnSecondary: '#f000000',
    success: '#00b958',
    successLight: '#80f2b6',
    successDark: '#01803d',
    textOnSuccess: '#000000',
    error: '#ff2121',
    errorLight: '#f28080',
    errorDark: '#b20000',
    textOnError: '#ffffff',
    warning: '',
    warningLight: '',
    warningDark: '',
    textOnWarning: '',
    info: '',
    infoLight: '',
    infoDark: '',
    textOnInfo: '',
    background: '#e0e0e0',
    backgroundLight: '#ffffff',
    backgroundDark: '#cccccc',
    backgroundInverted: '#0f0f0f',
    backgroundInvertedDark: '#000000',
    backgroundInvertedLight: '#1d1d1d',
    link: '#014ff0',
    text: '#222222',
    textLight: '#555555',
    textDark: '#000000',
    textInverted: '#f0f0f0',
    textInvertedLight: '#dddddd',
    textInvertedDark: '#ffffff',
    faint: '#e0e0e0',
    faintInverted: '#0f0f0f',
  },

  borderColor: 'textLight',
  borderWidth: 1,
  borderRadius: 4,

  mediaBreakpoints: {
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    '2xl': 1400,
  },
};
