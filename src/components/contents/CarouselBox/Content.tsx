import { x } from '@xstyled/emotion';
import { TypographyProps } from 'anolis-ui';
import { FC } from 'react';

import Richtext from '@src/components/other/Richtext';
import { isJsonString } from '@src/utils/isJsonString';

const typographyStyles: TypographyProps = {
  color: 'grayscale.grayWarm',
  fontSize: '0.875rem',
  lineHeight: '1.1875rem',
  fontFamily: 'poppins',
};

interface ContentProps {
  content: string;
}

const Content: FC<ContentProps> = ({ content }) => {
  if (isJsonString(content)) {
    return (
      <Richtext
        data={content}
        styles={{
          _typography: typographyStyles,
          _strong: {
            color: 'primary.black',
            fontWeight: 500,
          },
          _h1: {
            fontSize: '0.875rem',
            lineHeight: '1.125rem',
            color: 'grayscale.grayWarm',
            fontWeight: 500,
            textAlign: 'left',
          },
        }}
      />
    );
  }

  return <x.div {...typographyStyles}>{content}</x.div>;
};

export default Content;
