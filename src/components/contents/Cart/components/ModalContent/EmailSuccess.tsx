import { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC } from 'react';

import EmailIcon from '@src/components/other/icons/113/email.svg?react';

const EmailSuccess: FC = () => {
  return (
    <x.div
      px="2rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      spaceY="3rem"
    >
      <Icon svg={<EmailIcon />} />
      <x.h2
        fontFamily="heading-sans"
        fontSize="2.125rem"
        lineHeight="2.375rem"
        textAlign="center"
      >
        E-mail byl odeslán
      </x.h2>
    </x.div>
  );
};

export default EmailSuccess;
