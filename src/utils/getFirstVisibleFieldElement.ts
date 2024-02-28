import { SMARTFORM_WHOLE_ADDRESS_SUFFIX } from "@src/constants/fields";

/**
 * Return first visible element in the DOM
 * If provided element is not visible in the DOM, return its parent
 *
 * @param field string | HTMLElement
 */
const getFirstVisibleFieldElement = (field: string | HTMLElement): HTMLElement | null => {
  let element: HTMLElement | null = null;

  if (typeof field === "string") {
    // Added support for SmartForm addressWhole field
    element =
      document.querySelector(`[name="${field}"]`) ||
      document.querySelector(`[name="${`${field}.${SMARTFORM_WHOLE_ADDRESS_SUFFIX}`}"]`);
  } else {
    element = field;
  }

  if (!element?.parentElement) return null;

  const { display } = window.getComputedStyle(element);

  // If the element is not visible, return its parent
  // This is used primary as a fix for react-select hidden input
  if (display === "none") {
    return getFirstVisibleFieldElement(element.parentElement);
  }

  // Element is invisible, return null
  const { width, height } = element.getBoundingClientRect();
  if (!width || !height) return null;

  return element;
};

export default getFirstVisibleFieldElement;
