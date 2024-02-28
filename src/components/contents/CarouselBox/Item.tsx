import styled, { SystemProps, x } from '@xstyled/emotion';
import { FC } from 'react';

import Content from '@src/components/contents/CarouselBox/Content';
import ImageOrLottie from '@src/components/contents/CarouselBox/ImageOrLottie';
import { CarouselBoxItemType } from '@src/types';
import DirectButton from '@src/components/other/DirectButton';

const BOTTOM_RECT_HEIGHT = '6.875rem';

interface CarouselBoxItemProps extends CarouselBoxItemType {
  enableUserSelect?: boolean;
  isActive?: boolean;
  contentCss?: SystemProps;
}

const CarouselBoxItem: FC<CarouselBoxItemProps> = ({
  content,
  button,
  file,
  title,
  enableUserSelect = false,
  isActive = false,
  contentCss,
}) => {
  return (
    <StyledContainer
      position="relative"
      display="flex"
      flexDirection="column"
      pb={`calc(${BOTTOM_RECT_HEIGHT} + 1.75rem)`}
      h="100%"
      overflow="hidden"
      // Disable user-select to prevent selecting text in carousel
      userSelect={enableUserSelect ? 'auto' : 'none'}
    >
      <x.div
        flex="1"
        p={{
          _: '2rem 2rem 0',
          sm: '2.5rem 2.5rem 0',
        }}
        mb={{
          _: '1.5rem',
          sm: '0.25rem',
        }}
      >
        <x.div mb={{ _: '1.5rem', '&:last-child': 0 }} {...contentCss}>
          {title && (
            <x.h3
              fontSize="1.125rem"
              mb={{ _: '1rem', '&:last-child': 0 }}
              lineHeight="1.1875rem"
              fontFamily="poppins"
            >
              {title}
            </x.h3>
          )}
          {content && <Content content={content} />}
        </x.div>

        {button?.linkText && (
          <DirectButton
            v="gradient"
            {...(button?.linkUrl && { as: 'a', href: button.linkUrl })}
            target={button?.openLinkInNewTab ? '_blank' : '_self'}
            padding="0.75rem 1.0625rem"
            fontSize="0.875rem"
            lineHeight="1.125rem"
            h="auto"
            // https://github.com/adobe/react-spectrum/issues/2799#issuecomment-1035386952
            {...(isActive ? {} : { excludeFromTabOrder: true })}
          >
            {button?.linkText}
          </DirectButton>
        )}
      </x.div>

      {file?.url && (
        <x.div mb="-3.5rem">
          <ImageOrLottie file={file} />
        </x.div>
      )}
    </StyledContainer>
  );
};

export default CarouselBoxItem;

const StyledContainer = styled(x.div)`
  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: ${BOTTOM_RECT_HEIGHT};
    content: '';
    background: linear-gradient(90deg, #eaf3aa 0%, #f0f6c3 100%);
    z-index: -1;
  }
`;
