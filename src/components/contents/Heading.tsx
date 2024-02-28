import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { AnolisProvider, createTheme, typographyTheme } from 'anolis-ui';
import { FC } from 'react';

import { HeadingType } from '@src/types';
import { theme } from '@src/theme';

const Heading: FC<HeadingType> = ({ css, ...props }) => {
  const { input } = useFieldApi(props);

  return (
    <AnolisProvider theme={customTheme}>
      <x.h1 {...css}>{input.value}</x.h1>
    </AnolisProvider>
  );
};

const customTheme = createTheme({
  ...theme,
  ...typographyTheme({
    baseStyle: {
      _h1: {
        fontFamily: 'heading-sans',
        color: 'primary.black',
        fontSize: '2.125rem',
        lineHeight: '2.375rem',
        textAlign: 'center',
      },
      _h2: {
        fontFamily: 'text-sans',
        color: 'primary.black',
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        textAlign: 'left',
      },
      _p: {
        fontFamily: 'text-sans',
        fontWeight: 400,
      },
    },
  }),
});

export default Heading;
