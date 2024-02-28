import {
  buttonTheme,
  cardTheme,
  containerTheme,
  createTheme,
  inputTheme,
  modalTheme,
  tagTheme,
  textLinkTheme,
  typographyTheme,
} from 'anolis-ui';

export const theme = createTheme({
  ...buttonTheme({
    baseStyle: {
      fontFamily: 'text-sans',
      fontWeight: 500,
      px: '1rem',
      _leftIcon: {
        ml: '0.75rem',
      },
      _rightIcon: {
        ml: '0.75rem',
      },
    },
    variants: {
      solid: {
        bg: {
          _: 'tercial.indigo1',
          hover: 'tercial.indigo1Alpha75',
          active: 'tercial.indigo4',
          focus: 'tercial.indigo1',
          disabled: 'grayscale.gray5',
        },
        color: {
          _: '#fff',
          disabled: 'grayscale.gray2',
        },
        border: '1px solid',
        borderColor: {
          _: 'tercial.indigo1',
          hover: 'tercial.indigo1Alpha75',
          active: 'tercial.indigo4',
          focus: 'tercial.indigo1',
          disabled: 'grayscale.gray5',
        },
        boxShadow: { _: 'none', focus: 'inset 0px 0px 0 2px #fff' },
        borderRadius: 200,
      },
      outline: {
        boxShadow: {
          _: 'none',
          focus: `inset 0px 0px 0 2px #fff, inset 0px 0px 0 3px #6cddfd`,
        },
        bg: {
          _: 'transparent',
          hover: 'tercial.indigo3',
          active: 'tercial.indigo1Alpha25',
          focus: 'transparent',
          disabled: 'grayscale.gray5',
        },
        color: {
          _: 'tercial.indigo1',
          disabled: 'grayscale.gray2',
        },
        border: '1px solid',
        borderColor: {
          _: 'tercial.indigo1',
          focus: 'tercial.indigo1Alpha25',
        },
        borderRadius: 200,
      },
      clear: {
        boxShadow: {
          _: 'none',
          focus: `inset 0px 0px 0 2px #fff, inset 0px 0px 0 3px "#6cddfd"`,
        },
        bg: {
          _: 'transparent',
          hover: 'tercial.indigo1',
          active: 'tercial.indigo1Alpha25',
          focus: 'transparent',
          disabled: 'grayscale.gray5',
        },
        color: {
          _: 'tercial.indigo1',
          hover: '#fff',
          focus: 'tercial.indigo1',
          active: 'tercial.indigo1',
          disabled: 'grayscale.gray2',
        },
        borderColor: {
          _: 'transparent',
          hover: 'tercial.indigo1Alpha75',
          active: 'tercial.indigo4',
          focus: 'tercial.indigo1Alpha25',
          disabled: 'grayscale.gray5',
        },
        borderRadius: 200,
      },
    },
    sizes: {
      xs: {
        h: '2.625rem',
        px: '3.125rem',
      },
      sm: {
        h: '3.125rem',
        px: '1.1875rem',
      },
      md: {
        h: '3.5rem',
        px: '1.3125rem',
      },
      lg: {
        h: '3.75rem',
        px: '1.5rem',
      },
    },
  }),
  ...typographyTheme({
    baseStyle: {
      _h1: {
        fontFamily: 'heading-sans',
        color: 'primary.black',
        fontSize: { _: '2.125rem', sm: '3.75rem' },
        lineHeight: { _: '2.375rem', sm: '3.75rem' },
        textAlign: 'center',
      },
      _h2: {
        fontSize: { _: '2.125rem', sm: '3.5rem' },
        lineHeight: { _: '2.125rem', sm: '3.75rem' },
        fontFamily: 'heading-sans',
        color: 'primary.black',
      },
      _h3: {
        fontSize: { _: '2.125rem', sm: '3rem' },
        lineHeight: { _: '2.125rem', sm: '3.25rem' },
        fontWeight: 400,
        fontFamily: 'heading-sans',
        color: 'primary.black',
      },
      _h4: {
        fontSize: { _: '1.5rem', sm: '2.625rem' },
        lineHeight: { _: '1.75rem', sm: '2.75rem' },
        fontWeight: 400,
        fontFamily: 'heading-sans',
        color: 'primary.black',
      },
      _h5: {
        fontSize: { _: '1.5rem', sm: '2.125rem' },
        lineHeight: { _: '1.75rem', sm: '2.375rem' },
        fontWeight: 400,
        fontFamily: 'heading-sans',
        color: 'primary.black',
      },
      _p: {
        fontFamily: 'text-sans',
      },
    },
  }),
  ...textLinkTheme({
    baseStyle: {
      color: 'primary.black',
      fontWeight: 500,
      fontSize: '0.9375rem',
      lineHeight: '1.1875rem',
      fontFamily: 'text-sans',
    },
    variants: {
      underlined: {
        borderBottom: '1px solid',
        borderColor: { _: 'primary.black', hover: 'transparent' },
      },
    },
  }),
  ...cardTheme({
    baseStyle: {
      overflow: 'hidden',
      _header: {
        padding: '1.5rem',
        pb: '1.5rem',
        bg: 'primary.greenDirect25',
        fontSize: '1.125rem',
        lineHeight: '1.375rem',
        fontWeight: 600,
      },
      _body: {
        padding: '1.5rem',
      },
    },
    variants: {
      elevated: {
        borderRadius: '1.3125rem',
        border: '1px solid',
        borderColor: 'grayscale.gray4',
        transition: 'box-shadow 300ms, border 300ms',
        boxShadow: {
          _: '0px 0.25rem 0.25rem rgba(51, 51, 51, 0.04), 0px 0.25rem 1rem rgba(51, 51, 51, 0.08)',
        },
      },
    },
  }),
  ...containerTheme({
    variants: {
      normal: {
        px: { _: '1.625rem', sm: 4 },
        maxWidth: {
          _: '100%',
          xxs: '100%',
          xs: '100%',
          sm: '32em',
          md: '40em',
          lg: '56em',
          xl: '65.375rem',
          '2xl': '65.375rem',
        },
      },
    },
  }),
  ...modalTheme({
    baseStyle: {
      overflow: 'auto',
      w: '100%',
      _overlay: {
        zIndex: 1040,
        py: { _: '2.5rem' },
        px: { _: '1rem' },
      },
      _title: {
        fontSize: '1.5rem',
        fontWeight: 400,
        lineHeight: '1.75rem',
      },
      _close: {
        w: '2rem',
        h: '2rem',
        _icon: {
          w: '2rem',
          cursor: 'pointer',
        },
      },
    },
  }),
  ...tagTheme({
    variants: {
      solid: {
        color: '#fff',
        bg: 'tercial.indigo2',
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: '1rem',
        border: 0,
        borderRadius: '2.5rem',
        p: '0.25rem 0.5rem',
        display: 'inline-flex',
        fontFamily: 'text-sans',
      },
    },
  }),
  ...inputTheme({
    baseStyle: {
      background: '#fff',
      borderRadius: '12',
    },
    variants: {
      outline: {
        borderColor: {
          _: 'grayscale.gray4',
          hover: 'primary.greenDirect',
          focusWithin: 'primary.greenDirect',
        },
        borderRadius: '12',
        color: { _: 'black', placeholder: 'gray' },
        fontFamily: 'text-sans',
        fontWeight: 500,
      },
    },
    sizes: {
      xs: {
        h: '2.625rem',
      },
      sm: {
        h: '3.125rem',
      },
      md: {
        h: '3.5rem',
        pt: '1.5625rem',
        pb: '0.6875rem',
        px: '1rem',
        lineHeight: '1.25rem',
      },
      lg: {
        h: '3.75rem',
      },
    },
  }),
});
