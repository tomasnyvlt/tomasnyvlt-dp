export const SCROLL_LOCK_DATA_ATTRIBUTE = "data-scroll-lock";
export const WINDOW_HEIGHT_VAR = "--window-inner-height";
export const TOP_POSITION_VAR = "--scroll-top-position";
export const SCROLLBAR_WIDTH_VAR = "--scrollbar-width";

const setWindowInnerHeight = (): void => {
  document.documentElement.style.setProperty(WINDOW_HEIGHT_VAR, `${window.innerHeight}px`);
};

/**
 * Locks the body from scrolling
 */
const lock = (): void => {
  const { documentElement } = document;
  const { scrollY } = window;

  setWindowInnerHeight();
  window.addEventListener("resize", setWindowInnerHeight);

  const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

  documentElement.setAttribute(SCROLL_LOCK_DATA_ATTRIBUTE, "");
  documentElement.style.setProperty(TOP_POSITION_VAR, `${scrollY}px`);
  documentElement.style.setProperty(SCROLLBAR_WIDTH_VAR, `${scrollbarWidth}px`);
};

/**
 * Unlocks the body from scrolling
 */
const unlock = (): void => {
  const { documentElement } = document;
  const scrollY = documentElement.style.getPropertyValue(TOP_POSITION_VAR);

  documentElement.removeAttribute(SCROLL_LOCK_DATA_ATTRIBUTE);

  [SCROLL_LOCK_DATA_ATTRIBUTE, WINDOW_HEIGHT_VAR, SCROLLBAR_WIDTH_VAR].forEach((property) => {
    documentElement.style.removeProperty(property);
  });

  window.removeEventListener("resize", setWindowInnerHeight);

  // Scroll to the position before the body was locked
  window.scrollTo({
    top: parseInt(scrollY, 10),
    // @ts-ignore - https://developer.mozilla.org/en-US/docs/Web/API/Window/scroll#parameters
    behavior: "instant"
  });
};

const scroll = { lock, unlock };
export default scroll;
