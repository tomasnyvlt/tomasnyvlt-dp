import { default as WizardContext } from '@data-driven-forms/react-form-renderer/wizard-context';
import {
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  CONTAINER_INLINE_MARGIN,
  LG_BREAKPOINT,
} from '@src/components/fields/RadioBox/constants';
import useDebounce from '@src/hooks/useDebounce';
import useHorizontalScroll from '@src/hooks/useHorizontalScroll';

interface Output {
  scrollContainerRef: RefObject<HTMLDivElement>;
  SIDE_GAP_STYLE: string;
  isScrolling: boolean;
  isOverflowing: boolean;
}

const useScrollableRadioBox = (): Output => {
  const { currentStep } = useContext(WizardContext);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobileBreakpoint, setIsMobileBreakpoint] = useState(
    window?.innerWidth < LG_BREAKPOINT
  );
  const [isOverflowing, setIsOverflowing] = useState(true);

  // Prevents scroll container from hiding the last option due to the side margin (mobile only)
  const maxStepWidth = currentStep?.maxWidth ?? '100%';
  const SIDE_GAP_STYLE = `max(calc((100vw - ${maxStepWidth}) / 2), ${CONTAINER_INLINE_MARGIN})`;

  const isMobileBreakpointDebounce = useDebounce(isMobileBreakpoint, 300);

  // Check if the container is currently scrolling
  const { isScrolling } = useHorizontalScroll({
    containerRef: scrollContainerRef,
    isEnabled: isMobileBreakpointDebounce,
  });

  const checkOverflowingContainer = useCallback(
    (isMobile: boolean) => {
      const container = scrollContainerRef?.current;

      if (!isMobile || !container) {
        setIsOverflowing(false);
        return;
      }

      setIsOverflowing(container.scrollWidth > container.clientWidth);
    },
    [scrollContainerRef]
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < LG_BREAKPOINT;

      setIsMobileBreakpoint(isMobile);
      checkOverflowingContainer(isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkOverflowingContainer]);

  return { scrollContainerRef, isScrolling, isOverflowing, SIDE_GAP_STYLE };
};

export default useScrollableRadioBox;
