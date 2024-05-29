import {
  useFieldApi,
  useFormApi,
} from '@data-driven-forms/react-form-renderer';
import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook';
import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC, useEffect, useRef } from 'react';

import { useFormStoreContext } from '@src/hooks/useFormStoreContext';
import { CheckboxButtonType } from '@src/types';
import ArrowDownIcon from '@src/components/other/icons/24/arrow-down.svg?react';
import DirectButton from '@src/components/other/DirectButton';

const CheckboxButtonField: FC<CheckboxButtonType> = ({
  css,
  withIcon,
  ...props
}) => {
  const { label, input } = useFieldApi({ ...props, type: 'checkbox' });
  const { change } = useFormApi();
  const sendDataToGTM = useGTMDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const useStore = useFormStoreContext();
  const { pageMainCategory } = useStore((state) => state.dataLayer) || {};

  const isChecked = input.checked;
  // TODO: Work better with this component
  // This is a workaround to make the checkbox work with the form
  // (value is different than checked)
  useEffect(() => {
    change(input.name, isChecked);
  }, [isChecked]);

  return (
    <x.label display="flex" justifyContent="center" mt="2rem" {...css}>
      <x.div display="none">
        <input type="checkbox" {...input} ref={inputRef} />
      </x.div>

      <DirectButton
        as="span"
        v="outline"
        s="sm"
        rightIcon={
          withIcon ? (
            <Icon
              fill="tercial.indigo2"
              transform={input.checked ? 'rotate(180deg)' : 'rotate(0deg)'}
              transition="transform 300ms"
              svg={<ArrowDownIcon />}
            />
          ) : null
        }
        // TODO: Prasarna, že to máme na onClick v Buttonu a né na změnu value, ale value se spouštěla už při načtení formuláře
        onClick={() =>
          sendDataToGTM({
            event: `${pageMainCategory ?? ''}_sjednavac_checkbox_button_${input.name}`,
            action: isChecked ? 'Méně' : 'Více',
          })
        }
      >
        {label}
      </DirectButton>
    </x.label>
  );
};

export default CheckboxButtonField;
