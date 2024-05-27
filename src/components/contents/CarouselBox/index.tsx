import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import styled, { x } from '@xstyled/emotion';
import { FC } from 'react';
//import ReactCarousel from "react-multi-carousel";
//import "react-multi-carousel/lib/styles.css";

import { CarouselBoxType } from '@src/types';

const CarouselBox: FC<CarouselBoxType> = ({ css, contentCss, ...props }) => {
  const { items, hideField } = useFieldApi(props);

  if (!items?.length) return null;

  return (
    <StyledContainer
      display={hideField ? 'none' : 'flex'}
      border="1px solid"
      borderColor="grayscale.gray4"
      borderRadius="1.25rem"
      overflow="hidden"
      {...css}
    >
      {/*
      {items.length > 1 ? (
        <ReactCarousel
          responsive={{
            _: {
              breakpoint: {
                min: 0,
                max: 3000,
              },
              items: 1,
            },
          }}
          showDots
          swipeable
          ssr
          infinite
          keyBoardControl={false}
          slidesToSlide={1}
          arrows={false}
          customDot={<CarouselDot setActiveIndex={setActiveIndex} />}
        >
          {(items as CarouselBoxItemType[]).map((item, index) => (
            <Item
              key={`${index.toString()}`}
              {...item}
              isActive={activeIndex === index}
              contentCss={contentCss}
            />
          ))}
        </ReactCarousel>
      ) : (
        <Item enableUserSelect {...items[0]} contentCss={contentCss} />
      )}
      */}
      carousel
    </StyledContainer>
  );
};

export default CarouselBox;

const StyledContainer = styled(x.div)`
  .react-multi-carousel-list {
    flex: 1 0 100%;
    align-items: flex-start;
  }

  .react-multi-carousel-track {
    height: 100%;
  }

  .react-multi-carousel-dot-list {
    gap: 0.5rem;
    bottom: 1.5rem;
  }
`;
