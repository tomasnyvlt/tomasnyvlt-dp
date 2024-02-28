import { x } from '@xstyled/emotion';
import { FC } from 'react';

import Checkboxes from '@src/components/fields/RadioBox/components/Checkboxes';
import OptionInfoContentHeading from '@src/components/fields/RadioBox/components/OptionInfoContentHeading';
import OptionInfoContentText from '@src/components/fields/RadioBox/components/OptionInfoContentText';
import { OPTION_INPUT_Z_INDEX } from '@src/components/fields/RadioBox/constants';
import { RadioBoxInfoType } from '@src/types';
import Richtext from '@src/components/other/Richtext';

const OptionInfoContent: FC<RadioBoxInfoType> = (infoItem) => {
  if (infoItem?.checkboxField) {
    return (
      <Checkboxes checkboxArray={[infoItem.checkboxField]} desktopVariant />
    );
  }

  if (infoItem.isRichText && infoItem.text?.length) {
    return (
      <>
        {infoItem.text.map((text, textIndex) => (
          <Richtext
            key={`${textIndex.toString()}`}
            data={text as string}
            styles={{
              _p: {
                mt: {
                  _: 0,
                  '&:not(:first-of-type)': '1rem',
                },
                color: 'primary.black50',
                fontSize: {
                  _: '0.625rem',
                  lg: '0.75rem',
                },
                lineHeight: {
                  _: '0.875rem',
                  lg: '1rem',
                },
                fontWeight: 500,
              },
              _strong: {
                color: 'primary.black',
              },
            }}
          />
        ))}
      </>
    );
  }

  return (
    <x.div
      fontSize={{
        _: '0.625rem',
        lg: '0.75rem',
      }}
      lineHeight={{
        _: '0.875rem',
        lg: '1rem',
      }}
      position="relative"
      /**
       * Disable pointer events to allow the user to click on radio input
       * then allow user to click only on modal open button (inside OptionInfoModalLink)
       */
      pointerEvents="none"
      zIndex={OPTION_INPUT_Z_INDEX}
    >
      {infoItem.headings?.length && (
        <x.div
          mb={{
            _: '0.5rem',
            lg: '0.125rem',
          }}
        >
          {infoItem.headings.map((heading, headingIndex) => (
            <OptionInfoContentHeading
              key={`${headingIndex.toString()}`}
              data={heading}
            />
          ))}
        </x.div>
      )}

      {infoItem?.text?.length && (
        <>
          {infoItem.text.map((text, textIndex) => (
            <OptionInfoContentText
              key={`${textIndex.toString()}`}
              data={text}
            />
          ))}
        </>
      )}
    </x.div>
  );
};

export default OptionInfoContent;
