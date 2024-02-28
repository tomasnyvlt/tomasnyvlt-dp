import { Spinner } from "anolis-ui";
import { FC } from "react";

import { LoaderType } from "@src/types/designComponents";

const Loader: FC<LoaderType> = ({ size = "sm" }) => {
  return <Spinner s={size} />;
};

export default Loader;
