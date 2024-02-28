import styled, { x } from '@xstyled/emotion';
import { Input } from 'anolis-ui';
import { FC, useEffect, useState } from 'react';

import Field from '@src/components/fields/Field';
import DirectButton from '@src/components/other/DirectButton';

interface EmailInputProps {
  defaultEmail: string;
  sendEmail: (email: string) => Promise<void>;
}

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const EmailInput: FC<EmailInputProps> = ({ defaultEmail, sendEmail }) => {
  const [email, setEmail] = useState<string>(defaultEmail || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [fieldActive, setFieldActive] = useState<boolean>(!!email?.length);

  const handleFocus = (isFocused: boolean): void => {
    if (isFocused || !!email.length) {
      setFieldActive(true);
      return;
    }

    setFieldActive(false);
  };

  const handleButtonClick = (): void => {
    setIsLoading(true);

    sendEmail(email);
  };

  useEffect(() => {
    const regexResult = emailRegex.test(email);

    setIsValid(regexResult);
  }, [email]);

  return (
    <x.div px="2rem" w="100%">
      <StyledInnerContainer isLoading={isLoading}>
        <Field
          fieldActive={fieldActive}
          isRequired
          isDisabled={isLoading || !isValid}
          label="E-mail"
          cursor="text"
          mb="1.5rem"
        >
          <Input
            as="span"
            w="100%"
            disabled={isLoading}
            opacity={isLoading ? 0.5 : 1}
            cursor={isLoading ? 'not-allowed' : 'text'}
            required
            _input={{
              defaultValue: email,
              disabled: isLoading,
              onChange: (event) => setEmail(event.target.value),
              onFocus: () => handleFocus(true),
              onBlur: () => handleFocus(false),
              type: 'email',
              cursor: 'inherit',
            }}
          />
        </Field>

        <x.div textAlign="center">
          <DirectButton
            type="button"
            disabled={isLoading || !isValid}
            loading={isLoading}
            onClick={handleButtonClick}
            v="gradient"
            s="sm"
          >
            Odeslat
          </DirectButton>
        </x.div>
      </StyledInnerContainer>
    </x.div>
  );
};

export default EmailInput;

const StyledInnerContainer = styled(x.div)<{ isLoading: boolean }>`
  ${({ isLoading }) =>
    `
    label {
      cursor: ${isLoading ? 'not-allowed' : 'text'};
    }
  `};
`;
