import Tippy, { TippyProps } from '@tippyjs/react';
import { x } from '@xstyled/emotion';
import { FC, PropsWithChildren, ReactElement } from 'react';

interface TooltipProps {
  content: ReactElement | null;
  placement?: TippyProps['placement'];
}

const Tooltip: FC<PropsWithChildren<TooltipProps>> = ({
  content,
  children,
  placement = 'auto',
}) => {
  return (
    <Tippy
      placement={placement}
      duration={300}
      interactive
      content={
        content ? (
          <x.div position="relative" mb="1.125rem">
            <x.div
              maxWidth="15.5625rem"
              position="relative"
              borderRadius="0.625rem"
              boxShadow="default"
              overflow="hidden"
            >
              <x.p
                position="relative"
                px="1rem"
                py="0.6875rem"
                bg="#fff"
                zIndex={1}
              >
                {content}
              </x.p>
            </x.div>
            <x.div
              position="absolute"
              left="50%"
              transform="translateX(-50%) translateY(1.125rem)"
              bottom={0}
            >
              <x.div
                w={0}
                h={0}
                borderStyle="solid"
                borderWidth={!placement ? '65px 37.5px 0 37.5px' : ''}
                borderColor="#fff transparent transparent transparent"
                borderRadius="3px"
              />
            </x.div>
          </x.div>
        ) : null
      }
    >
      {children as ReactElement}
    </Tippy>
  );
};

export default Tooltip;
