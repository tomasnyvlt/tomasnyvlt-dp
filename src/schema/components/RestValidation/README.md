# DDF Validator

## Description

This validator field should be used **only for REST validations**. Other validations are handle via DDF.

- Field errors on **same step** are handled with _validate_ prop from schema field definition (by default triggered on
  blur or on form submit)

  ```ts
  validate: [
    {
      type: "required",
      message: "This field is required"
    }
  ];
  ```

- Field errors from **different steps** are handled with custom validation prop defined in schema field definition (by
  default triggered on step change or on specified field value change)

  ```ts
  {
      // Rich text format
      message: "...",
      // Validate only for specific userType
      userType: ["internal"],
      fieldNames: ["fiestFieldName", "secondFieldName"]
  }
  ```

## How To Use REST validation

Simple setup description

1. Create rest validation component - in your component you can take advantage of
   [FormContext.tsx](/@src/context/FormContext.tsx) from which you can get
   `setRestValidation` function and set error messages or field errors with that. You can get field error info with
   [useFieldError](/@src/hooks/useFieldError.ts) hook and field messages will be
   displayed by the component
   [ValidationInfo.tsx](/@src/components/contents/ValidationInfo/index.tsx)
2. Add validator component to schema as a custom component like:

   ```ts
   customComponents: [
     {
       Component: Calculation, // Component rendered in FormWizard
       key: "autosjednavac-fetch-field" // Unique key used as a `key` inside .map() render method
     },
     {
       Component: AnotherCustomComponent,
       key: "another-unique-key" // Unique key has to be unique only in `customComponents` array
     }
   ],
   ```

   - `customComponents` are rendered in
     [FormWizard.tsx](/@src/components/controls/FormWizard.tsx)
