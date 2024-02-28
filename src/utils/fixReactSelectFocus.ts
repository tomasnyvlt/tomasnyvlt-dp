import { RefObject } from "react";
import { SelectInstance } from "react-select";

import { OptionDecorDataType, OptionType } from "@src/types";

interface Props {
  selectRef: RefObject<SelectInstance<OptionType | OptionDecorDataType>>;
  options: OptionType[];
}

/**
 * This util fixes well know focus bug of react-select selected option
 * when options are re-rendered (re-mount or options reference change).
 * In that case last selected option position is lost and react-select focuses first option.
 * This util fixes this by setting focused option to last selected option.
 *
 * Usage: Apply this util in onMenuOpen prop of react-select.
 */
export const fixReactSelectFocus = ({ selectRef, options }: Props): void => {
  const select = selectRef.current;

  if (!select || select.props.isMulti || !options?.length) return;

  const { selectValue, focusedOption } = select?.state || {};

  // Last selected value (also working for multi select)
  const lastSelectedValue = selectValue?.at(-1) as OptionType | undefined;

  if (!lastSelectedValue?.value) return;

  const selectedValue = options.find((option) => option.value === lastSelectedValue.value);

  if (!selectedValue) return;

  // Don't change focus if selected value is already focused
  if (selectedValue.value === focusedOption?.value) return;

  select.setState((prevState) => ({
    ...prevState,
    focusedOption: selectedValue
  }));
};
