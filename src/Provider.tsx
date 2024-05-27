import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { ThemeProvider } from '@xstyled/emotion';
import { AnolisProvider, AnolisTheme } from 'anolis-ui';
import { ReactNode } from 'react';

export interface ProviderProps {
  customXstyledTheme: Parameters<typeof ThemeProvider>[0]['theme'];
  anolisTheme: AnolisTheme;
  children: ReactNode;
}

export const Provider = ({
  children,
  customXstyledTheme,
  anolisTheme,
}: ProviderProps) => {
  return (
    <GTMProvider state={undefined}>
      <ThemeProvider theme={customXstyledTheme}>
        <AnolisProvider theme={anolisTheme}>{children}</AnolisProvider>
      </ThemeProvider>
    </GTMProvider>
  );
};
