export interface SingleErrorType {
  // One message can be assigned to multiple fields
  // e.g. "field1||field2||field3"
  field: string;
  message: string;
}
