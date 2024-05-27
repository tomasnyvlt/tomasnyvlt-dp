import { IPluginUploadFile } from '@src/components/contents/ImageOrLottie';
import { BasicComponentType } from '@src/types/basic';
import { DesignComponentType } from '@src/types/designComponents';
import { FormFieldsType } from '@src/types/formFields';
import { LayoutFieldsType } from '@src/types/layout';

/**
 * Fetch component types
 */
export interface SpzFetchFieldType extends BasicComponentType {
  component: 'spz-fetch-field';
  inputName: string;
  buttonName: string;
  file: IPluginUploadFile;
  fields: Array<
    DesignComponentType | LayoutFieldsType | FormFieldsType | FetchComponentType
  >;
}

export interface RZFetchFieldType extends BasicComponentType {
  component: 'rz-fetch-field';
  inputName: string;
  buttonName: string;
  file: IPluginUploadFile;
  fields: Array<
    DesignComponentType | LayoutFieldsType | FormFieldsType | FetchComponentType
  >;
}

export interface FlotilaAutoSjednavacFetchFieldType {
  component?: 'autosjednavac-zarazeni-do-flotily';
}

export interface FleetRestAddVehicle extends BasicComponentType {
  component: 'fleet-rest-add-vehicle';
}

export type FetchComponentType =
  | SpzFetchFieldType
  | RZFetchFieldType
  | FleetRestAddVehicle;
