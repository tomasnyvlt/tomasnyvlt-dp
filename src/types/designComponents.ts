import { ConditionDefinition } from "@data-driven-forms/react-form-renderer/condition";
import { SystemProps } from "@xstyled/emotion";
import { SpinnerSize } from "anolis-ui";
import { Variant as InfoboxThemeVariant } from "@src/components/contents/InfoBox/theme";
import { BasicComponentType } from "@src/types/basic";
import { ElementType } from "react";
import { IPluginUploadFile } from '@src/components/contents/ImageOrLottie';

type RichTextString = string;
type Link = { openLinkInNewTab?: boolean; linkText?: string; linkUrl?: string };

/**
 * Design component types
 */
export interface ImageType extends BasicComponentType {
  component: "image";
  file: Partial<IPluginUploadFile>;
}

export interface SpzWithBrandType extends BasicComponentType {
  component: "spz-with-brand";
  // TODO Add props for dynamic data load
}

export interface BoxContentItemType {
  label: string;
  value?: string;
  localStorageValue?: string;
}

export interface BoxContentType {
  items: BoxContentItemType[];
}

export interface BoxWithContentType extends BasicComponentType {
  component: "box-with-content";
  condition?: ConditionDefinition | ConditionDefinition[];
  content?: BoxContentType;
  variant?: "basic" | "reversed-color";
  spacing?: "default" | "space-between";
}

export interface ConfirmationBoxType extends BasicComponentType {
  component: "confirmation-box";
  content?: string;
}

export interface InfoBoxType extends BasicComponentType {
  component: "info-box";
  content: RichTextString | RichTextString[];
  variant?: keyof InfoboxThemeVariant;
  topCss?: SystemProps & { as?: ElementType<any> };
  noBorder?: boolean;
  id?: string;
  validationInfoData?: boolean;
}

export interface CarouselBoxItemType {
  title?: string;
  content: RichTextString;
  button?: Link;
  file?: IPluginUploadFile;
}

export interface CarouselBoxType extends BasicComponentType {
  component: "carousel-box";
  items: CarouselBoxItemType[];
  contentCss?: SystemProps;
}

export interface LoaderType extends BasicComponentType {
  component: "loader";
  size?: SpinnerSize;
}

export interface FleetInfoType extends BasicComponentType {
  component: "fleet-info";
}

export type DesignComponentType =
  | ImageType
  | SpzWithBrandType
  | BoxWithContentType
  | InfoBoxType
  | CarouselBoxType
  | ConfirmationBoxType
  | LoaderType
  | FleetInfoType;
