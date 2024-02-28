import styled, { th, x } from "@xstyled/emotion";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import ContentBottom from "@src/components/contents/Cart/components/ContentBottom";
import ContentItems from "@src/components/contents/Cart/components/ContentItems";
import ContentTopbar from "@src/components/contents/Cart/components/ContentTopbar";
import { CartDataType, ChangeProps } from "@src/components/contents/Cart/types";

interface CartContentProps extends CartDataType {
  isOpen: boolean;
  buttonId: string;
  contentId: string;
  deleteItem: (attr: ChangeProps) => void;
  hasVisibleCartFields: boolean;
  mainButtonHeight: number;
}

const CartContent: FC<CartContentProps> = ({
  isOpen,
  buttonId,
  contentId,
  deleteItem,
  items,
  hasVisibleCartFields,
  mainButtonHeight,
  ...bottomData
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [heightTransitionEnded, setHeightTransitionEnded] = useState(false);
  const [showPseudoBg, setShowPseudoBg] = useState(false);

  // Prevent focus on elements inside the cart content when it's closed
  const handleFocusableElements = useCallback((container: HTMLDivElement, preventFocus: boolean) => {
    const focusableElements = container.querySelectorAll("button, [href], input");

    focusableElements.forEach((element) => {
      element.setAttribute("tabindex", preventFocus ? "-1" : "0");
    });
  }, []);

  const onTransitionStart = (): void => {
    setHeightTransitionEnded(false);
  };

  useEffect(() => {
    if (!containerRef?.current) return;

    handleFocusableElements(containerRef.current, !isOpen);
  }, [handleFocusableElements, isOpen]);

  useEffect(() => {
    const containerEl = containerRef.current;

    if (!containerEl) return undefined;

    containerEl.addEventListener("transitionstart", onTransitionStart);

    return () => {
      containerEl.removeEventListener("transitionstart", onTransitionStart);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  useEffect(() => {
    if (!isOpen && !heightTransitionEnded) {
      window.setTimeout(() => {
        setShowPseudoBg(false);
      }, 50);
    }

    if (isOpen) {
      setShowPseudoBg(true);
    }
  }, [isOpen, heightTransitionEnded]);

  return (
    <>
      <StyledPseudoBg h="0" w="100%" position="relative" mainButtonHeight={mainButtonHeight} showBg={showPseudoBg} />

      <StyledHeightContainer
        id={contentId}
        aria-hidden={!isOpen}
        aria-labelledby={buttonId}
        ref={containerRef}
        border={isOpen ? "1px solid" : "0"}
        borderTop="0"
        borderColor="grayscale.gray4"
        borderRadius="0 0 2.75rem 2.75rem"
        h="100%"
        transition="max-height 300ms"
        maxH={isOpen ? "62.5rem" : 0}
        overflow="hidden"
        display="flex"
        flexDirection="column"
        position="relative"
        onTransitionEnd={() => setHeightTransitionEnded(true)}
      >
        <ContentTopbar />

        <x.div h="auto" overflow="hidden" display="flex" flexDirection="column">
          <ContentItems items={items} deleteItem={deleteItem} hasVisibleCartFields={hasVisibleCartFields} />

          <ContentBottom {...bottomData} />
        </x.div>
      </StyledHeightContainer>
    </>
  );
};

export default CartContent;

const StyledHeightContainer = styled(x.div)`
  will-change: max-height;
`;

const StyledPseudoBg = styled(x.div, {
  shouldForwardProp: (prop) => prop !== "mainButtonHeight" && prop !== "showBg"
})<{
  mainButtonHeight: number;
  showBg: boolean;
}>`
  &::before {
    content: "";
    position: absolute;
    display: ${({ showBg }) => (showBg ? "block" : "none")};
    bottom: 100%;
    width: 100%;
    height: ${({ mainButtonHeight }) => mainButtonHeight / 2}px;
    background: ${th.color("tercial.indigo5")};
    border: 1px solid;
    border-top: 0;
    border-bottom: 0;
    border-color: ${th.color("grayscale.gray4")};
    z-index: -1;
  }
`;
