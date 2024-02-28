import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types/validator-types";
export type ValueOf<T> = T[keyof T];
type ValidatorNamesType = ValueOf<typeof validatorTypes>;

interface ValidatorMessageType {
  message?: string;
}

// BASIC TYPES with better type control
interface RequiredValidationType extends ValidatorMessageType {
  type: "required";
}

interface ThresholdValidationType extends ValidatorMessageType {
  type: Extract<ValidatorNamesType, "min-length" | "max-length" | "exact-length">;
  threshold: number;
}

interface NumberValueValidationType extends ValidatorMessageType {
  type: Extract<ValidatorNamesType, "min-number-value" | "max-number-value">;
  /**
   * Default: true
   *
   * If true, the threshold value will be considered valid
   */
  includeThreshold?: boolean;
  value: number;
}

interface PatternValidationType extends ValidatorMessageType {
  type: "pattern";
  pattern: string | RegExp;
  /**
   * i.e. "i" for case insensitive
   */
  flags?: string;
}

interface URLValidationType extends ValidatorMessageType {
  type: "url";
  /**
   * i.e. "https"
   */
  protocol?: string;
  protocolIdentifier?: boolean;
}

type DefaultValidationType =
  | RequiredValidationType
  | ThresholdValidationType
  | NumberValueValidationType
  | PatternValidationType
  | URLValidationType;

// CUSTOM TYPES - Add new validations if needed
export interface RequiredIfValidationType extends ValidatorMessageType {
  type: "required-if";
  /**
   * fields: { fieldName1: value, fieldName2: value, ... }
   */
  fields: Record<string, any>;
  /**
   * AND (default): all fields must match
   *
   * OR: at least one field must match
   */
  logical?: "AND" | "OR";
}

export interface EmailValidationType extends ValidatorMessageType {
  type: "email";
}

export interface CzechIdValidationType extends ValidatorMessageType {
  type: "czech-id";
}

export interface SmartformAddressValidationType extends ValidatorMessageType {
  type: "address-smartform";
}

export interface OnlyNumberValidationType extends ValidatorMessageType {
  type: "only-number";
}

export interface PhoneValidationType extends ValidatorMessageType {
  type: "phone";
}

export interface PhoneOnlyCodeValidationType extends ValidatorMessageType {
  type: "phone-with-code";
}

export interface DateValidationType extends ValidatorMessageType {
  type: "date";
}

export interface MinAgeValidationType extends ValidatorMessageType {
  type: "min-age";
  threshold: number;
  component: DateValidationType["type"] | CzechIdValidationType["type"];
}

export interface ExactLengthWithoutSpacesType extends ValidatorMessageType {
  type: "exact-length-without-spaces";
  threshold: number;
}

export type CustomValidationType =
  | RequiredIfValidationType
  | EmailValidationType
  | CzechIdValidationType
  | OnlyNumberValidationType
  | PhoneValidationType
  | PhoneOnlyCodeValidationType
  | DateValidationType
  | MinAgeValidationType
  | SmartformAddressValidationType
  | ExactLengthWithoutSpacesType;

// Combination of basic and custom validation types
export type ValidationType = DefaultValidationType | CustomValidationType;
