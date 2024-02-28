import { useFieldApi } from "@data-driven-forms/react-form-renderer";
import { Icon as AnolisIcon } from "anolis-ui";
import { FC } from "react";

import { IconType } from "@src/types/layout";

const Icon: FC<IconType> = (props) => {
  const { icon, css } = useFieldApi(props);

  return <AnolisIcon svg={icon} fill="grayscale.gray1" {...css} />;
};

export default Icon;
