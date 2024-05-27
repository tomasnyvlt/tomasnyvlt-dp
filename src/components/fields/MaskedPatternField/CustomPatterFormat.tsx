import { Input, InputProps } from 'anolis-ui';
import { PatternFormat } from 'react-number-format';
import { PatternFormatProps } from 'react-number-format/types/types';

const CustomInput = ({ ...inputProps }) => {
  return <Input {...inputProps} />;
};

const CustomPatternFormat = ({
  format,
  allowEmptyFormatting,
  ...props
}: Omit<PatternFormatProps, 'type' | 'defaultValue' | 'color'> &
  Omit<InputProps, 'type' | 'defaultValue' | 'color'>) => {
  return (
    <PatternFormat
      format={format}
      customInput={CustomInput}
      allowEmptyFormatting={allowEmptyFormatting}
      {...props}
    />
  );
};

export default CustomPatternFormat;
