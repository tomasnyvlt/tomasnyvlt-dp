import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC } from 'react';

import InfoBoxRichText from '@src/components/contents/InfoBox/components/InfoBoxRichText';
import { backgrounds, fill } from '@src/components/contents/InfoBox/theme';
import { VALIDATION_INFO_DATA_ATTR } from '@src/components/contents/ValidationInfo/constants';
import { InfoBoxType } from '@src/types';
import CheckIcon from '@src/components/other/icons/24/checked.svg?react';
import InfoIcon from '@src/components/other/icons/24/info.svg?react';

const InfoBox: FC<InfoBoxType> = ({
  css,
  topCss,
  variant = 'info',
  id,
  validationInfoData,
  ...props
}) => {
  const { content, htmlRichtext, hideField } = useFieldApi(props);

  return (
    <x.div
      display={hideField ? 'none' : 'flex'}
      justifyContent="center"
      {...topCss}
      id={id}
      {...(validationInfoData && { [VALIDATION_INFO_DATA_ATTR]: true })}
    >
      <x.div
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        p="1rem"
        background={backgrounds[variant]}
        borderRadius="15"
        {...css}
      >
        <x.div display="flex" alignItems="center" w="100%">
          <Icon
            svg={variant === 'success' ? <CheckIcon /> : <InfoIcon />}
            fill={fill[variant]}
            mr="1rem"
          />
          {/* eslint-disable-next-line react/no-danger */}
          {htmlRichtext && (
            <div dangerouslySetInnerHTML={{ __html: htmlRichtext }} />
          )}
          {content && (
            <x.div>
              {Array.isArray(content) ? (
                <>
                  {content.map((contentItem, index) => (
                    <x.div
                      key={`${index.toString()}`}
                      mb={{
                        _: 0,
                        '&:not(:last-of-type)': '0.75rem',
                      }}
                    >
                      <InfoBoxRichText
                        content={contentItem}
                        variant={variant}
                      />
                    </x.div>
                  ))}
                </>
              ) : (
                <InfoBoxRichText content={content} variant={variant} />
              )}
            </x.div>
          )}
        </x.div>
      </x.div>
    </x.div>
  );
};

export default InfoBox;
