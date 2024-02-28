import { AnyObject } from "@data-driven-forms/react-form-renderer";

import { VALIDATION_INFO_DATA_ATTR } from "@src/components/contents/ValidationInfo/constants";
import getFirstVisibleFieldElement from "@src/utils/getFirstVisibleFieldElement";
import getFullErrorKeys from "@src/utils/getFullErrorKeys";

type ValidationErrors = AnyObject | undefined;

/**
 * Scroll to first error element on the page
 * If provided element is not visible, scroll to its parent element
 *
 * It's important to check all error elements, because react-finals-forms
 * sorts errors alphabetically, so the first error element in the object might not be
 * the first visible element on the page
 */
const scrollToFirstErrorOnPage = (errorsObject: ValidationErrors, withFocus = false): void => {
  const errorKeys = getFullErrorKeys({ errorsObject });

  const errorFields = errorKeys.map(getFirstVisibleFieldElement).filter(Boolean) as HTMLElement[];
  const validationInfoBox = [document.querySelector(`[${VALIDATION_INFO_DATA_ATTR}]`)].filter(Boolean) as HTMLElement[];

  const errorElements = [...errorFields, ...validationInfoBox];

  if (!errorElements?.length) return;

  // Returns the highest element on the page
  const firstElementInViewport = errorElements.reduce((acc, curr) => {
    const { top: accTop } = acc.getBoundingClientRect();
    const { top: currTop } = curr.getBoundingClientRect();

    if (accTop < currTop) return acc;

    return curr;
  });

  if (!firstElementInViewport) return;

  if (withFocus) firstElementInViewport.focus();

  firstElementInViewport.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
};

export default scrollToFirstErrorOnPage;
