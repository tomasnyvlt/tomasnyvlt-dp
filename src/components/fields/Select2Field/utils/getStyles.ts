import { GroupBase, StylesConfig } from "react-select";

import { OptionType } from "@src/types";

interface Props {
  isError: boolean;
}

export const getStyles = ({ isError }: Props): StylesConfig<OptionType, boolean, GroupBase<OptionType>> => ({
  dropdownIndicator: (base) => ({
    ...base,
    padding: 10,
    paddingLeft: 4,
    pointerEvents: "none"
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: 0
  }),
  container: (base) => ({
    ...base,
    display: "block",
    height: "3.5rem",
    width: "100%",
    cursor: "inherit"
  }),
  control: (base, { menuIsOpen, isFocused }) => ({
    ...base,
    borderColor: isError ? "#f01c19" : menuIsOpen || isFocused ? "#becd00" : "#e1e4eb",
    height: "100%",
    boxShadow: "none",
    borderRadius: 12,
    cursor: "inherit",
    "&:hover": {
      border: `1px solid ${isError ? "#f01c19" : "#becd00"}`,
      boxShadow: "none"
    }
  }),
  singleValue: (base) => ({
    ...base,
    fontWeight: "500",
    color: "#000",
    marginTop: "0.75rem",
    marginLeft: "0.5rem"
  }),
  input: (base) => ({
    ...base,
    fontWeight: "500",
    color: "#000",
    marginTop: "0.75rem",
    marginLeft: "0.5rem",
    pointerEvents: "none"
  }),
  valueContainer: (base) => ({
    ...base,
    display: "grid",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }),
  menu: (base, { isMulti }) => ({
    ...base,
    marginTop: 0,
    paddingTop: 0,
    boxShadow: "0 6px 12px rgb(0 0 0 / 18%)",
    zIndex: 1000,
    ...(isMulti && {
      borderRadius: 12,
      overflow: "hidden"
    })
  }),
  menuList: (base, { isMulti }) => ({
    ...base,
    paddingBlock: 0,
    maxHeight: isMulti ? "13.5rem" : "10rem",
    cursor: "auto"
  }),
  option: (base, { isSelected, isFocused, isMulti, isDisabled }) => ({
    ...base,
    paddingInline: "1rem",
    fontFamily: "poppins",
    fontWeight: "500",
    fontSize: "1rem",
    overflowWrap: "break-word",
    color: "#000",
    cursor: isDisabled ? "inherit" : "pointer",
    pointerEvents: isDisabled ? "none" : "auto",
    transition: "300ms",

    // Pure select styles
    ...(!isMulti && {
      backgroundColor: isSelected ? "#becd00" : isFocused ? "#dfe680" : "transparent",
      paddingBlock: "0.75rem",
      ":hover": {
        backgroundColor: isSelected ? "#becd00" : "#dfe680"
      },
      ...(isDisabled && {
        backgroundColor: isFocused ? "#a9abbd" : "#d9dce3"
      })
    }),
    // Multi select styles
    ...(isMulti && {
      display: "flex",
      alignItems: "center",
      gap: "0.9375rem",
      backgroundColor: "transparent",
      paddingBlock: "0.5rem",
      textDecoration: isFocused ? "underline" : "none",

      "[data-icon-container]": {
        backgroundColor: isDisabled ? "#d9dce3" : isFocused ? "#f2f5cc" : "transparent"
      },
      ":active": {
        backgroundColor: "transparent",
        "[data-icon-container]": {
          backgroundColor: "#becd00"
        }
      },
      ":first-of-type": {
        paddingTop: "1rem"
      },
      ":last-of-type": {
        paddingBottom: "1rem"
      }
    })
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "transparent",
    marginTop: "0.75rem",
    marginBottom: "0",
    marginRight: "0",
    marginLeft: "0.5rem",
    gridArea: "1/1/2/3"
  }),
  multiValueLabel: (base) => ({
    ...base,
    fontSize: "1rem",
    fontWeight: "500",
    color: "#000",
    // Override default padding styles (keep both `padding` and `paddingLeft`)
    padding: 0,
    paddingLeft: 0
  }),
  placeholder: () => ({
    display: "none"
  }),
  indicatorSeparator: () => ({
    display: "none"
  }),
  multiValueRemove: () => ({
    display: "none"
  })
});
