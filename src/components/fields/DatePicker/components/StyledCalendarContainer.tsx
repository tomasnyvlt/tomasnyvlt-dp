import styled, { th, x } from "@xstyled/emotion";
import { FC, PropsWithChildren } from "react";

const StyledCalendarContainer: FC<PropsWithChildren> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default StyledCalendarContainer;

/* Base styles in components/styles/DatePickerStyle.ts */
const StyledContainer = styled(x.div)`
  .react-datepicker-popper {
    border: 1px solid;
    border-color: ${th("grayscale.gray5")};
    box-shadow: 0px 0.3125rem 2.125rem rgba(0, 0, 0, 0.075);
    border-radius: 1.25rem;
    overflow: hidden;
    z-index: 100;
    background-color: ${th("primary.white")};
    padding: 0;
    cursor: auto;

    /* Placement styles */
    transform: none !important;
    inset: 100% 0 auto 0 !important;
    width: 100%;
  }

  .react-datepicker__month-container,
  .react-datepicker__year--container {
    padding: 1.375rem;
  }

  .react-datepicker__header {
    padding: 0;
  }

  .react-datepicker__week {
    display: flex;
  }

  .react-datepicker__day {
    font-family: poppins;
    font-size: 0.875rem;
    line-height: 1;
    font-weight: 400;
    border-radius: 50% !important;
    padding: 0;
    color: ${th("primary.black")};
    margin: 0;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    &--selected {
      color: ${th("primary.black")} !important;
      background-color: ${th("primary.greenDirect")} !important;
    }

    &:not(&--selected) {
      outline-color: ${th("primary.greenDirect50")};
    }

    &--disabled {
      &,
      &:hover {
        color: ${th("grayscale.gray2")} !important;
        background-color: transparent !important;
      }
    }

    &--outside-month {
      visibility: hidden;
      pointer-events: none;
    }
  }

  .react-datepicker__header {
    padding: 0;
  }

  .react-datepicker__day-names {
    margin-top: 1rem !important;
    margin-bottom: 1.5rem !important;
    padding-inline: 0;
  }

  .react-datepicker__day-name {
    color: ${th("grayscale.gray2")};
    font-size: 0.875rem;
    line-height: 1.125rem;
    font-weight: 500;
    margin: 0;
    text-transform: capitalize;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    width: calc(100% / 7);
  }

  .react-datepicker__year,
  .react-datepicker__month {
    margin: 0;
    margin-top: 1rem !important;
  }

  .react-datepicker__year-wrapper,
  .react-datepicker__month-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    max-width: unset;
  }

  .react-datepicker__year-text,
  .react-datepicker__month-text {
    font-family: poppins;
    font-size: 0.875rem;
    line-height: 2.5rem;
    font-weight: 400;
    color: ${th("primary.black")};
    width: 100%;
    margin: 0;
    border-radius: 10rem;
    transition: 300ms background-color;

    &--selected {
      background-color: ${th("primary.greenDirect")};
    }

    &--keyboard-selected,
    &:not(&--selected) {
      background-color: transparent;
    }

    &--disabled {
      color: ${th("grayscale.gray2")};
    }

    &:not(&--selected):not(&--disabled) {
      &:hover {
        background-color: ${th("primary.greenDirect10")};
      }
    }
  }

  .react-datepicker__month {
    &--disabled {
      color: ${th("grayscale.gray2")};
    }

    &--selected {
      background-color: ${th("primary.greenDirect")} !important;
    }

    &-text {
      text-transform: capitalize;

      &--keyboard-selected {
        background-color: transparent;
      }
    }
  }

  .react-datepicker__month-wrapper {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`;
