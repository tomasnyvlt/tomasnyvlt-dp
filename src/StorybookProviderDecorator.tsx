import { FC } from 'react';
import { StoryFn } from '@storybook/react';
import { customXstyledTheme } from '@src/theme/xstyled.ts';
import { theme } from '@src/theme';
import { AnolisProvider } from 'anolis-ui';
import { ThemeProvider } from '@xstyled/emotion';
import { BrowserRouter } from 'react-router-dom';
import { GTMProvider } from '@elgorditosalsero/react-gtm-hook';
import { GlobalStyles } from '@src/GlobalStyles';

interface ModuleProviderDecoratorProps {
  Story: StoryFn;
}

export const StorybookProviderDecorator: FC<ModuleProviderDecoratorProps> = (
  props
) => {
  const { Story } = typeof props === 'object' ? props : { Story: props };

  return (
    <GTMProvider state={undefined}>
      <ThemeProvider theme={customXstyledTheme}>
        <AnolisProvider theme={theme}>
          <GlobalStyles />
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </AnolisProvider>
      </ThemeProvider>
    </GTMProvider>
  );
};
