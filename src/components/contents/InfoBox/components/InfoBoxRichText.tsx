import { FC } from 'react';

import {
  borders,
  colors,
  lineHeights,
  sizes,
} from '@src/components/contents/InfoBox/theme';
import { InfoBoxType } from '@src/types';
import Richtext from '@src/components/other/Richtext';

interface InfoBoxRichTextProps extends Required<Pick<InfoBoxType, 'variant'>> {
  content: string;
}

const InfoBoxRichText: FC<InfoBoxRichTextProps> = ({ content, variant }) => {
  return (
    <Richtext
      data={content}
      styles={{
        _p: {
          fontFamily: 'text-sans',
          fontSize: sizes[variant],
          lineHeight: lineHeights[variant],
          color: colors[variant],
          fontWeight: 400,
        },
        _a: {
          fontSize: sizes[variant],
          color: colors[variant],
          borderColor: borders[variant],
          fontWeight: 500,
          textDecoration: variant === 'infoNoBorder' ? 'underline' : 'none',
        },
        _strong: {
          color: 'tercial.indigo4',
          fontWeight: 500,
        },
      }}
    />
  );
};

export default InfoBoxRichText;
