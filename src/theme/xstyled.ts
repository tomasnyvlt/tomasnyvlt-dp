import { defaultTheme } from '@xstyled/system';
import { anolisXstyledTheme, pipeThemes } from 'anolis-ui';

export const BREAKPOINTS = {
  _: 0,
  xs: 480,
  sm: 768,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

const colorsPrimaryDirect = {
  greenDirectDarker: '#98a300',
  greenDirect: '#becd00',
  greenDirect50: '#dfe680',
  greenDirect25: '#e9edb8',
  greenDirect10: '#f2f5cc',
  black: '#000',
  blackText: '#444',
  black50: '#808080',
  white: '#fff',
  whiteAlpha75: 'rgba(255, 255, 255, 0.75)',
} as const;

const colorsTercialDirect = {
  red1: '#f01C19',
  red1Alpha70: '#f5605e',
  red1Alpha50: '#f78d8c',
  red2: '#c00f0c',
  red3: '#feecec',
  green1: '#4bb543',
  green2: '#81cb7b',
  green3: '#357f2f',
  orange1: '#fe8c34',
  orange2: '#f46a01',
  orange3: '#fff3ea',
  orange4: '#d35b00',
  indigo1: '#5a2382',
  indigo2Alpha20: '#e9d9f4',
  indigo1Alpha25: '#d6c8e0',
  indigo1Alpha40: '#bda7cd',
  indigo1Alpha50: '#9C7bb4',
  indigo1Alpha75: '#835aa1',
  indigo2: '#9041c9',
  indigo3: '#f6effb',
  indigo4: '#49186e',
  indigo5: '#f5e8ff',
} as const;

const colorsPrimary = colorsPrimaryDirect;
const colorsTercial = colorsTercialDirect;

export const customXstyledTheme = pipeThemes(defaultTheme, anolisXstyledTheme, {
  states: {
    groupHover: '[data-group]:hover &',
    groupFocus: '[data-group]:focus &',
    groupFirst: '[data-group]:first-of-type &',
    groupLast: '[data-group]:last-of-type &',
    groupOnly: '[data-group]:only-of-type &',
    marker: '&::marker',
  },
  fonts: {
    'heading-sans': "'direct-semibold', sans-serif",
    'text-sans': "'poppins', sans-serif",
  },
  colors: {
    primary: colorsPrimary,
    grayscale: {
      grayWarm: '#757575',
      gray1: '#65676e',
      gray1Alpha50: '#a4a5a9',
      gray2: '#a9abbd',
      gray3: '#d9dce3',
      gray4: '#e1e4eb',
      gray5: '#eee',
      gray6: '#f7f7f7',
    },
    tercial: colorsTercial,
  },
  shadows: {
    default:
      '0 0.25rem 0.25rem rgba(51, 51, 51, 0.04), 0 0.25rem 1rem rgba(51, 51, 51, 0.08)',
    small:
      '0 0.25rem 0.25rem rgba(51, 51, 51, 0.04), 0 0.25rem 0.75rem rgba(51, 51, 51, 0.08)',
    radiofield: '0 0.375rem 2.25rem rgba(0, 0, 0, 0.075)',
    cardCheckbox: '0rem 0.375rem 2.25rem rgba(0, 0, 0, 0.075)',
    datepicker: '0 0.375rem 0.75rem rgb(0, 0, 0, 0.18)',
    formBox: '0px 0.25rem 2rem rgba(0, 0, 0, 0.075)',
    inputRangeThumb: `
      0px 2.18613px 5.56219px 0px rgba(0, 0, 0, 0.07), 0px 5.25358px 13.3667px 0px rgba(0, 0, 0, 0.05),
      0px 9.89203px 25.16832px 0px rgba(0, 0, 0, 0.04), 0px 17.64568px 44.89598px 0px rgba(0, 0, 0, 0.04),
      0px 33.00431px 83.97299px 0px rgba(0, 0, 0, 0.03), 0px 79px 201px 0px rgba(0, 0, 0, 0.02)`,
  },
  screens: {
    ...BREAKPOINTS,
  },
  borders: {
    formBoxBorder:
      '1px solid  0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)',
  },
});
