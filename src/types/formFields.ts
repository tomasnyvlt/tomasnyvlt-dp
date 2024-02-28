import { ResolvePropsFunction } from '@data-driven-forms/react-form-renderer/common-types/field';
import { ConditionDefinition } from '@data-driven-forms/react-form-renderer/condition';
import { BasicComponentType } from '@src/types/basic';
import { ElementType, HTMLInputTypeAttribute, MouseEventHandler } from 'react';
import { InputProps } from 'anolis-ui';
import { ReactNode } from 'react';
import { SystemProps } from '@xstyled/system';
import { LayoutFieldsType } from '@src/types/layout';
import { DesignComponentType } from '@src/types/designComponents';
import { ValidationType } from '@src/types/validation';
import { FormOptions } from '@data-driven-forms/react-form-renderer';

/**
 * Basic form field type with validation
 */

interface SpyFieldCopyType {
  targetName: string;
  /**
   * Info if target field is select field or not
   *
   * react-select has different value structure than other fields
   * and needs to be handled differently
   */
  isSelectField?: boolean;
  /**
   * default: "copy" - copy value from target field on change
   */
  action?: 'copy';
  /**
   * Field value will be used by default, but sometimes is required
   * to spy on more complicated field (e.g. Select) and it's value may be nested
   *
   * example: {label: "label", fieldValue: "some value"}
   * usage of type: {name: "xyz", value: "fieldValue"}
   *
   * - this will get nested key from field value object
   */
  nestedKeyValue?: string;
  /**
   * Field value will execute selected action only when one of provided keys in array
   * has been ever focused
   *
   * Useful for fields that are autofilled (from localStorage for example)
   */
  whenVisitedKeys?: string[];
}

interface SpyFieldClearType
  extends Omit<SpyFieldCopyType, 'action' | 'whenVisitedKeys'> {
  /**
   * "clear" - clear value on target field change
   */
  action: 'clear';
  /**
   * Field value will execute selected action only when one of provided keys in array
   * has been ever focused
   *
   * Useful for fields that are autofilled (from localStorage for example)
   *
   * Required "whenVisitedKeys" for "clear" action to prevent clearing on autofill.
   * This is usually what you want, but if not, paste an empty array
   */
  whenVisitedKeys: string[];
}

export type SpyFieldType = SpyFieldCopyType | SpyFieldClearType;

export interface FieldsBasicType extends BasicComponentType {
  label: string;
  isRequired?: boolean;
  defaultValue?: string;
  // Field.validate type is not valid in useFieldApi hook + is not type safe
  validate?: ValidationType[];
  spyField?: SpyFieldType;
  condition?: ConditionDefinition | ConditionDefinition[];
}

/**
 * Form field types
 */
interface CheckboxType extends FieldsBasicType {
  initialValue?: boolean;
}

export interface CheckboxButtonType extends CheckboxType {
  component: 'checkbox-button';
  withIcon?: boolean;
}

export interface CardCheckboxType extends CheckboxType {
  component: 'card-checkbox';
  label: string;
  fields?: Array<DesignComponentType | FormFieldsType | LayoutFieldsType>;
  editFields?: string[];
  helper?: string;
  price?: number;
  priceShortTerm?: number;
  isDisabled?: boolean;
  hideField?: boolean;
  defaultSalesDiscount?: number;
  editMode?: boolean;
  noPriceText?: string;
  isPriceLoading?: boolean;
}

export interface CardCheckboxAdditionalType extends CheckboxType {
  component: 'card-checkbox-additional';
  tag?: string;
  cardHelper?: string;
  fields?: Array<DesignComponentType | FormFieldsType | LayoutFieldsType>;
  cardHelperLinkCss?: SystemProps;
}

export interface EditFieldType extends FieldsBasicType {
  component: 'edit-field';
  helper?: string;
  initialValue?: boolean;
  hideField?: boolean;
  price?: number;
  priceShortTerm?: boolean;
  isPriceLoading?: boolean;
  fields?: Array<DesignComponentType | FormFieldsType | LayoutFieldsType>;
}

export interface RadioWithInfoFieldType extends FieldsBasicType {
  component?: 'radio-with-info-field';
  fields?: Array<DesignComponentType | FormFieldsType | LayoutFieldsType>;
  label: string;
  helper?: string;
  value?: string;
  showHelperWhenChecked: boolean;
  hideField?: boolean;
  hideNestedFields?: boolean;
  priceShortTerm?: boolean;
  price?: number;
  noPriceText?: string;
  hidePrice?: boolean;
}

export interface RadioInfoListType extends Omit<FieldsBasicType, 'label'> {
  component: 'radio-info-list';
  info: Array<string>;
  description: string;
}

interface RadioListOptionType {
  price: number;
  value: string;
}

export interface RadioListContainerType extends Omit<FieldsBasicType, 'label'> {
  component: 'radio-list-container';
  isRequired?: boolean;
  options: RadioListOptionType[];
}

export interface CheckboxFieldType extends CheckboxType {
  component: 'checkbox-field';
  checkboxColor?: 'white' | 'green';
  checkboxBorderColor?: 'white' | 'green' | 'indigo2';
  description?: string;
  labelCss?: SystemProps & { as?: ElementType<any> };
  onClick?: MouseEventHandler<HTMLElement>;
  checkboxAlignTop?: boolean;
  withArrowDownIcon?: boolean;
  hiddenLabel?: string;
  hideField?: boolean;
  hideInRadioBoxContainer?: boolean;
  isDisabled?: boolean;
  helper?: string;
  helperCss?: SystemProps;
  variant?: 'sm' | 'md' | 'cart';
}

export interface SwitchFieldType extends Omit<FieldsBasicType, 'label'> {
  component: 'switch-field';
  initialValue?: string;
  hideField?: boolean;
  options: Array<OptionType>;
  css?: SystemProps;
}

export interface TextFieldType extends FieldsBasicType {
  component: 'text-field';
  type?: HTMLInputTypeAttribute;
  _labelText?: SystemProps;
  inputProps?: InputProps;
  textarea?: boolean;
  helper?: string;
  helperCss?: SystemProps;
  initialValue?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  // Modify value before change
  onBeforeChange?: (value: string) => string;
  onChange?: (value: string, formOptions: FormOptions) => void;
  hideField?: boolean;
}

export interface FileUploadType extends Omit<FieldsBasicType, 'label'> {
  component: 'file-upload';
  inputProps?: InputProps;
  isDisabled?: boolean;
  documentType?: string;
  helper?: string;
  helperCss?: SystemProps;
}

export interface OptionType<TValue = string> {
  label: string;
  value: TValue;
  isDisabled?: boolean;
}

interface SelectGeneralFieldType extends Omit<FieldsBasicType, 'defaultValue'> {
  component: 'select-field';
  options: OptionType[];
  helper?: string;
  helperCss?: SystemProps;
  isSearchable?: boolean;
  isDisabled?: boolean;
  hideField?: boolean;
  updateLabelOnOptionChange?: boolean;
}

interface SelectSingleFieldType extends SelectGeneralFieldType {
  initialValue?: OptionType;
  isMulti?: false;
  fallbackValue?: never;
}

interface SelectMultiFieldType extends SelectGeneralFieldType {
  initialValue?: OptionType[];
  isMulti: true;
  // This value will be used on clear action + will be removed on different option change
  fallbackValue?: OptionType;
}

export type SelectFieldType = SelectSingleFieldType | SelectMultiFieldType;

export interface ClickChangeFieldType<TValue = any> {
  fieldName: string;
  value: TValue;
}

export interface OptionDecorDataType extends OptionType {
  info?: string;
  onClickChangeFields?: Array<ClickChangeFieldType | null>;
}

export interface SelectDecorFieldType
  extends Omit<FieldsBasicType, 'defaultValue'> {
  component: 'select-decor-field';
  // It is important to have to have "options" with OptionType only
  // because of condition and spyField functionality - additional data comes in "optionsData"
  options: OptionType[];
  optionsData: OptionDecorDataType[];
  initialValue?: OptionType;
}

export interface RadioImgOptionType extends OptionType {
  imgSrc: string;
}

export interface RadioImageFieldType
  extends Omit<FieldsBasicType, 'defaultValue'> {
  component: 'radio-image';
  options: RadioImgOptionType[];
  initialValue?: string;
}

export interface RadioFrequencyButtonOptionFieldType {
  label: string;
  price?: number;
  value: string;
  frequency?: number;
  size?: 'sm' | 'lg';
}

export interface RadioContainerFieldType
  extends Omit<FieldsBasicType, 'label'> {
  component: 'radio-container';
  withBorder?: boolean;
  isRequired?: boolean;
  options: RadioFrequencyButtonOptionFieldType[];
  initialValue?: string;
  buttonCss: SystemProps;
  innerCss?: SystemProps;
  expectedOptionsLength?: number;
}

export interface RadioInfoContainerType extends Omit<FieldsBasicType, 'label'> {
  component: 'radio-info-container';
  fields: RadioWithInfoFieldType[];
  initialValue?: string;
}

export interface RadioSelectFieldOptionType {
  label: string;
  price: string;
  value: string;
}

export interface RadioSelectContainerFieldType extends FieldsBasicType {
  component: 'radio-select-container';
  options: RadioSelectFieldOptionType[];
  initialValue?: string;
  isRequired?: boolean;
}

export type DefaultCalendarType = 'day' | 'month' | 'year';

export interface DatePickerType extends FieldsBasicType {
  component: 'date-picker';
  headerText?: string;
  // Date || ISO string
  minDate?: Date | string;
  maxDate?: Date | string;
  initialValue?: Date | string;
  // Default calendar
  defaultCalendarType?: DefaultCalendarType;
  helper?: string;
}

export interface SmartFormFieldType extends FieldsBasicType {
  instance?: string;
  component?: 'smartform-field';
  inputProps?: InputProps;
  helper?: string;
}

export interface NumberFieldType extends FieldsBasicType {
  component: 'number-field';
  labelText?: string | ReactNode;
  _labelText?: SystemProps;
  inputProps?: InputProps;
  required?: boolean;
  helper?: string;
  disabledAdding?: boolean;
  disabledSubtracting?: boolean;
  changeBy?: number;
  isMonetaryValue?: boolean;
  minimumValue?: number;
  initialValue?: number;
}

export interface ToggleFieldType extends Omit<FieldsBasicType, 'label'> {
  component: 'toggle-field';
  isRequired?: boolean;
  options: OptionType<number>[];
  initialValue?: number;
  legend: string;
  helper?: string;
  hideField?: boolean;
}

export interface RangeFieldType extends Omit<FieldsBasicType, 'defaultValue'> {
  component: 'range-field';
  min?: number; // Default 0
  max?: number; // Default 100
  step?: number; // Default 1
  initialValue?: number;
  helper?: string;
  helperCss?: SystemProps;
}

export interface ButtonFieldType extends FieldsBasicType {
  component: 'button-field';
  //variant?: DirectButtonProps["v"];
  // TODO: FIX ANY
  variant?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  disabled?: boolean;
  css?: SystemProps;
}

export interface RadioBoxInfoModalType {
  modalLinkText: string;
  modal: {
    heading: string;
    content: string;
  };
}

export type RadioBoxInfoTextType = string | RadioBoxInfoModalType;

export interface RadioBoxInfoType {
  headings?: RadioBoxInfoTextType[];
  text?: RadioBoxInfoTextType[];
  isRichText?: boolean;
  checkboxField?: CheckboxFieldType;
}

export interface RadioBoxOptionType extends OptionType {
  recommended?: boolean;
  recommendedLgTag?: string;
  price: {
    text: string;
    variant?: 'big' | 'small';
  };
  mobileButtonText?: string;
  checkedButtonText?: string;
  buttonText: string;
  info: Array<RadioBoxInfoType[]>;
  onClickChangeFields?: Array<ClickChangeFieldType | null>;
}

export interface RadioBoxFieldType
  extends Omit<FieldsBasicType, 'defaultValue'> {
  component: 'radio-box';
  options: RadioBoxOptionType[];
  // Show load data skeleton
  isDataLoading?: boolean;
  initialValue?: string;
  theme?: 'primary' | 'tercial';
  // For skeleton style (default 3)
  expectedOptionsLength?: number;
  // For skeleton style to prevent layout shift
  expectedRecommendedOptionWithTag?: boolean;
  onChangeCb?: () => void;
  optionCss?: SystemProps;
}

export interface AssistanceModalType
  extends Omit<FieldsBasicType, 'defaultValue'> {
  component: 'assistance-modal';
  name: string;
  initialValue?: string;
  options: RadioBoxOptionType[];
  condition?: ConditionDefinition | ConditionDefinition[];
  isOpen?: boolean;
  editFields?: string[];
  resolveProps?: ResolvePropsFunction;
}

interface ShadowFieldWhenType {
  fieldName: string;
  value: unknown;
}

export interface ShadowCopyFieldType extends Omit<FieldsBasicType, 'label'> {
  component: 'shadow-copy';
  /**
   * List of fields that will be copied to this field
   * e.g. field names -> ["field1", "field2"]
   */
  copyFields: string[];
  /**
   * Copying will be active when all fields from "activeWhen" are equal to "value"
   */
  activeWhen: ShadowFieldWhenType[];
}

export interface MaskedNumberFieldType
  extends Omit<TextFieldType, 'component'> {
  component: 'masked-number-field';
  suffix?: string;
  prefix?: string;
  allowNegative?: boolean;
  decimalScale?: number;
  maxValue?: number;
  hideField?: boolean;
}

export interface MaskedPatternFieldType
  extends Omit<TextFieldType, 'component'> {
  component: 'masked-pattern-field';
  format: string;
  allowEmptyFormatting?: boolean;
  patternType?: 'phone' | 'personalIn';
}

export type FormFieldsType =
  | TextFieldType
  | SelectFieldType
  | SelectDecorFieldType
  | CheckboxFieldType
  | CheckboxButtonType
  | DatePickerType
  | RadioImageFieldType
  | NumberFieldType
  | RadioContainerFieldType
  | CardCheckboxType
  | CardCheckboxAdditionalType
  | EditFieldType
  | RadioWithInfoFieldType
  | RadioInfoContainerType
  | RadioInfoListType
  | RadioListContainerType
  | SwitchFieldType
  | RadioSelectContainerFieldType
  | ToggleFieldType
  | RangeFieldType
  | ButtonFieldType
  | RadioBoxFieldType
  | AssistanceModalType
  | ShadowCopyFieldType
  | SmartFormFieldType
  | FileUploadType
  | MaskedNumberFieldType
  | MaskedPatternFieldType;
