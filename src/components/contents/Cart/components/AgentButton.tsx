import styled, { x } from '@xstyled/emotion';
import { Icon } from 'anolis-ui';
import { FC } from 'react';

import ChatIcon from '@src/components/icons/16/chat.svg?react';

interface AgentButtonProps {
  isCartOpen: boolean;
}

export const CHAT_EMBED_CONTAINER_ID = 'RQEmbeddedChatWidget';
export const CHAT_BUTTON_CONTAINER_ID = 'RQButtonContainer';
export const CHAT_ICON_CONTAINER_ID = 'RQIconContainer';
export const CHAT_FRAME_ID = 'RQChatFrame';

export const CHAT_FRAME_MOBILE_CLASS = 'RQChatFrameMobile';
export const CHAT_FRAME_TABLET_CLASS = 'RQChatFrameTablet';

export const REAL_CHAT_WIDGET_ZINDEX = 9999990;
export const ICON_SIZE = '70px';
export const CONTAINER_POSITION_MOBILE = '0px';
export const CONTAINER_POSITION_TABLET = '20px';

const AgentButton: FC<AgentButtonProps> = ({ isCartOpen }) => {
  const toggleChat = () => {
    document.getElementById(CHAT_ICON_CONTAINER_ID)?.click();
  };

  return (
    <x.button
      display={{ _: isCartOpen ? 'none' : 'block', sm: 'none' }}
      bg="transparent"
      m="0"
      p="1rem"
      // onClick={() => setIsAgentOpen((prevOpen) => !prevOpen)}
      onClick={toggleChat}
      type="button"
      borderLeft="1px solid"
      borderColor="primary.white"
      borderRadius="0 4.5rem 4.5rem 0"
      outline={{
        _: 'none',
        '&:focus': 'none',
        '&:focus-visible': '3px solid',
      }}
      outlineOffset="-0.25rem"
      outlineColor={{
        '&:focus-visible': 'primary.white',
      }}
    >
      <x.span display="flex" p="0.625rem" bg="primary.white" borderRadius="50%">
        <StyledIcon
          as="span"
          svg={<ChatIcon />}
          fill="#AE81E8"
          w="1rem"
          h="1rem"
        />
      </x.span>
    </x.button>
  );
};

export default AgentButton;

const StyledIcon = styled(Icon)`
  & > svg {
    width: inherit;
    height: inherit;
  }
`;
