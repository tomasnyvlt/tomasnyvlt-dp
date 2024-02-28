import { FC, memo } from "react";
import { OnBlur } from "react-final-form-listeners";

interface OnBlurItemProps {
  name: string;
  callback: () => void;
}

const OnBlurItem: FC<OnBlurItemProps> = ({ name, callback }) => {
  return <OnBlur name={name}>{callback}</OnBlur>;
};

export default memo(OnBlurItem);
