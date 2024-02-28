import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC } from 'react';

import { ConfirmationBoxType } from '@src/types';
import EmailIcon from '@src/components/other/icons/email.svg?react';

const ConfirmationBox: FC<ConfirmationBoxType> = (props) => {
  const { content } = useFieldApi(props);
  return (
    <x.div
      margin="2rem auto"
      display="flex"
      justifyContent="space-between"
      flexDirection="column"
      border="1px solid"
      borderColor="grayscale.gray5"
      borderRadius="1.25rem"
      alignItems="center"
      maxW={{ _: '15.625rem', sm: 'initial' }}
    >
      <x.p
        fontWeight="500"
        fontSize={{ _: '1rem', sm: '1.375rem' }}
        lineHeight="1.625rem"
        textAlign="center"
        padding="4rem 6rem 3rem 6rem"
      >
        {' '}
        {content}
      </x.p>
      <Icon
        display="flex"
        justifyContent="center"
        marginBottom="1.875rem"
        svg={<EmailIcon />}
      />
    </x.div>
  );
};

export default ConfirmationBox;
