import { MutableRefObject, useEffect, useRef, useState } from "react";

interface Props {
  containerRef: MutableRefObject<HTMLElement | null>;
  isEnabled?: boolean;
  /**
   * The offset in px when the scroll listener should fire. (default 3)
   */
  offsetX?: number;
  /**
   * Multiply speed of the scroll. (default 1.25)
   */
  scrollSpeed?: number;
}

interface Output {
  isScrolling: boolean;
}

/**
 * Enables horizontal scrolling on a container element
 * by clicking and dragging with the mouse.
 *
 * Usage:
 * 1. Add the ref to the container element
 * 2. Add the following styles to the container element:
 *    - overflow-x: auto;
 *    - scroll-behavior: unset; (while isScrolling) to prevent buggy behavior
 *    - user-select: none;
 *    - pointer-events: none; (for children elements while scrolling)
 *    - cursor: grab; (optional)
 *
 * usage example: data-driven-forms/components/fields/RadioBox/index.tsx
 */
const useHorizontalScroll = ({ containerRef, isEnabled = true, offsetX = 3, scrollSpeed = 1.25 }: Props): Output => {
  const [isScrolling, setIsScrolling] = useState(false);

  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (event: MouseEvent) => {
    const container = containerRef.current;

    if (!container) return;

    isMouseDown.current = true;
    startX.current = event.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    setIsScrolling(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    const container = containerRef?.current;

    if (!container || !isMouseDown.current) return;

    const xPosition = event.pageX - container.offsetLeft;
    const distance = xPosition - startX.current;
    const walk = distance * scrollSpeed;

    // Prevents scrolling when the mouse is not moved by offsetX
    if (Math.abs(distance) < offsetX) return;

    setIsScrolling(true);
    container.scrollLeft = scrollLeft.current - walk;
  };

  useEffect(() => {
    const container = containerRef?.current;

    if (!container || !isEnabled) return undefined;

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, isEnabled]);

  return { isScrolling };
};

export default useHorizontalScroll;
