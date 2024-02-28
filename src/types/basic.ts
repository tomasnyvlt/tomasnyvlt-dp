import { Field } from "@data-driven-forms/react-form-renderer";
import { ResolvePropsFunction } from "@data-driven-forms/react-form-renderer/common-types/field";
import { SystemProps } from "@xstyled/emotion";
import { ElementType } from "react";

/**
 * Basic
 */
export interface BasicComponentType extends Pick<Field, "name" | "condition" | "clearOnUnmount" | "initializeOnMount"> {
  css?: SystemProps & { as?: ElementType<any> };
  resolveProps?: ResolvePropsFunction;
}
