import { useEffect, useRef } from "react";
import { InputProps, components } from "react-select";

import { OptionType } from "@src/types";

const Input = (props: InputProps<OptionType>) => {
  const { menuIsOpen, isSearchable } = props.selectProps;

  const isMobileDeviceRef = useRef(false);
  const inputElRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const inputEl = inputElRef.current;

    // 1. Check if it's a mobile device
    // 2. Check if menu is closed
    // 3. Check if select is searchable
    // 4. Check if input is focused
    if (!isMobileDeviceRef?.current || menuIsOpen || !isSearchable || inputEl !== document.activeElement) return;

    // Hide virtual keyboard on mobile devices when menu is closed
    inputEl?.blur();
  }, [menuIsOpen, isSearchable]);

  useEffect(() => {
    isMobileDeviceRef.current = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);

  return (
    <components.Input
      {...props}
      innerRef={(element) => {
        props.innerRef?.(element);
        inputElRef.current = element;
      }}
    />
  );
};

export default Input;
