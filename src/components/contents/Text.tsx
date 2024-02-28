import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { FC, useMemo } from 'react';

import { TextType } from '@src/types';
import Richtext from '@src/components/other/Richtext';
import Tooltip from '@src/components/other/Tooltip';

const Text: FC<TextType> = ({ tooltip, ...props }) => {
  const { input, css, richText, tooltipPosition } = useFieldApi(props);

  const content = useMemo(() => {
    if (richText) {
      return <Richtext styles={{ _typography: css }} data={input.value} />;
    }

    return <x.p {...css}>{input.value}</x.p>;
  }, [richText, css, input.value]);

  if (tooltip) {
    return (
      <Tooltip
        placement={tooltipPosition}
        content={<Richtext data={tooltip} />}
      >
        {content}
      </Tooltip>
    );
  }

  return content;
};

export default Text;
