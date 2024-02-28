import { Input, InputProps } from "anolis-ui";
import { NumericFormat } from "react-number-format";
import { NumericFormatProps } from "react-number-format/types/types";

const CustomInput = ({ ...inputProps }) => {
  return <Input {...inputProps} />;
};

const CustomNumericFormat = ({
  prefix,
  suffix,
  allowNegative,
  decimalScale,
  isAllowed,
  ...props
}: Omit<NumericFormatProps, "type" | "defaultValue" | "color"> &
  Omit<InputProps, "type" | "defaultValue" | "color">) => {
  return (
    <NumericFormat
      thousandsGroupStyle="thousand"
      thousandSeparator=" "
      suffix={suffix}
      prefix={prefix}
      customInput={CustomInput}
      inputMode="numeric"
      allowNegative={allowNegative}
      decimalScale={decimalScale}
      isAllowed={isAllowed}
      {...props}
    />
  );
};

export default CustomNumericFormat;
