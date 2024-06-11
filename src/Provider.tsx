import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { ThemeProvider } from '@xstyled/emotion';
import { AnolisProvider } from 'anolis-ui';
import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import { customXstyledTheme } from './theme/xstyled';

export interface ProviderProps {
  // customXstyledTheme: Parameters<typeof ThemeProvider>[0]['theme'];
  // anolisTheme: AnolisTheme;
  children: ReactNode;
}

export const Provider = ({
  children,
  // customXstyledTheme,
  // anolisTheme,
}: ProviderProps) => {
  return (
    <BrowserRouter>
      <GTMProvider state={undefined}>
        <ThemeProvider theme={customXstyledTheme}>
          <AnolisProvider theme={theme}>{children}</AnolisProvider>
        </ThemeProvider>
      </GTMProvider>
    </BrowserRouter>
  );
};
