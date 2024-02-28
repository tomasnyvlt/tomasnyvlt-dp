import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { SystemProps } from '@xstyled/system';
import { Icon } from 'anolis-ui';
import { ChangeEvent, FC, InputHTMLAttributes, useId } from 'react';

import Tag from '@src/components/contents/Tag';
import OptionHeader from '@src/components/fields/RadioBox/components/OptionHeader';
import OptionInfo from '@src/components/fields/RadioBox/components/OptionInfo';
import {
  LG_GAP,
  OPTION_BORDER_RADIUS_STYLE,
  OPTION_BOX_SHADOW,
  OPTION_INPUT_Z_INDEX,
  OPTION_PADDING,
} from '@src/components/fields/RadioBox/constants';
import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import {
  ClickChangeFieldType,
  RadioBoxFieldType,
  RadioBoxOptionType,
} from '@src/types';
import OurTip from '@src/components/other/icons/ourTip.svg?react';

interface InputHandlersType
  extends Required<
    Pick<InputHTMLAttributes<HTMLInputElement>, 'onFocus' | 'onBlur'>
  > {
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
    changeOptions: Array<ClickChangeFieldType | null>
  ) => void;
}
type ThemeType = Pick<RadioBoxFieldType, 'theme'>;

interface RadioBoxOptionProps extends InputHandlersType, ThemeType {
  name: string;
  isChecked: boolean;
  option: RadioBoxOptionType;
  isError: boolean | undefined;
  optionCss?: SystemProps;
}

const Option: FC<RadioBoxOptionProps> = ({
  name,
  onBlur,
  onChange,
  onFocus,
  theme,
  isChecked,
  option,
  isError,
  optionCss = {},
}) => {
  const id = useId();
  const { info, value, recommended, recommendedLgTag, ...headerProps } = option;

  // #f5e8ff = tercial.indigo5 -> hash because of using "background" due to linear-gradient
  const activeBgColor =
    theme === 'primary'
      ? 'linear-gradient(90deg, #EAF3AA 0%, #F2F5CC 100%)'
      : '#f5e8ff';
  const activeBorderColor =
    theme === 'primary' ? 'primary.greenDirect' : 'tercial.indigo2';

  const sendDataToGTM = useGTMDispatch();
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};

  return (
    <x.div
      borderRadius={OPTION_BORDER_RADIUS_STYLE}
      boxShadow={{
        lg: OPTION_BOX_SHADOW,
      }}
      borderLeftColor={{
        '& + & > div': {
          _: isChecked ? 'transparent' : 'grayscale.gray3',
          lg: {
            _: isError ? 'tercial.red1' : 'transparent',
            '&:hover': isError ? 'tercial.red1' : activeBorderColor,
          },
        },
      }}
      position="relative"
      // Width = 4 columns with 3 gaps between them + collapse empty columns
      flex={{ _: '0 0 auto', lg: `1 0 calc(25% - ((${LG_GAP} * 3) / 4))` }}
      w={{
        _: 'clamp(9.5625rem, 50%, 10.5rem)',
        sm: 'clamp(10.5rem, 25%, 12.5rem)',
        lg: `clamp(15.25rem, 25%, calc(25% - ((${LG_GAP} * 3) / 4)))`,
      }}
      data-group
      onClick={() =>
        sendDataToGTM({
          event: `${pageMainCategory ?? ''}_sjednavac_${name}`,
          typ_pojisteni: headerProps.label.replace(/\n/g, ' '),
        })
      }
    >
      {recommended && (
        <Icon
          display={{
            lg: recommendedLgTag ? 'none' : 'block',
          }}
          svg={<OurTip />}
          position="absolute"
          bottom="calc(100% + 1rem)"
          left="50%"
          transform="translateX(-50%)"
          pointerEvents="none"
        />
      )}

      {recommendedLgTag && (
        <x.div display={{ _: 'none', lg: 'block' }} cursor="default">
          <Tag>{recommendedLgTag}</Tag>
        </x.div>
      )}

      <x.div
        style={{
          wordBreak: 'break-word',
        }}
        p={{
          _: OPTION_PADDING,
          lg: 0,
        }}
        h="100%"
        background={
          isChecked
            ? activeBgColor
            : { _: '#fff', hover: { lg: activeBgColor } }
        }
        border="1px solid"
        borderColor={
          isError
            ? 'tercial.red1'
            : isChecked
              ? activeBorderColor
              : { _: 'transparent', hover: { lg: activeBorderColor } }
        }
        borderRadius={OPTION_BORDER_RADIUS_STYLE}
        transition="border-color 300ms, background 300ms"
        position="relative"
        {...optionCss}
      >
        <x.label htmlFor={id} data-sr-only>
          {headerProps.label} ({headerProps.price.text})
        </x.label>

        <x.input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={isChecked}
          onBlur={onBlur}
          onChange={(event) =>
            onChange(event, option.onClickChangeFields ?? [])
          }
          onFocus={onFocus}
          position="absolute"
          // -1px due to border width
          top="-1px"
          right="-1px"
          bottom="-1px"
          left="-1px"
          // +2px due to border width (1px on each side)
          w="calc(100% + 2px)"
          h="calc(100% + 2px)"
          cursor="pointer"
          appearance="none"
          color={isError ? 'transparent' : activeBorderColor}
          boxShadow={{
            '&:focus': 'none',
            '&:focus-visible': '0 0 0 2px',
          }}
          borderRadius={OPTION_BORDER_RADIUS_STYLE}
          outline="none"
          zIndex={OPTION_INPUT_Z_INDEX}
        />

        <x.div
          display="flex"
          flexDirection="column"
          h="100%"
          borderRadius={OPTION_BORDER_RADIUS_STYLE}
        >
          <OptionHeader isChecked={isChecked} {...headerProps} />
          <OptionInfo info={info} />
        </x.div>
      </x.div>
    </x.div>
  );
};

export default Option;
