const IDirectComponentTypes = {
  TEXT_FIELD: "text-field",
  SELECT_FIELD: "select2",
  INFO_BOX: "info-box",
  GRID: "grid"
} as const;

export type Components = (typeof IDirectComponentTypes)[keyof typeof IDirectComponentTypes];
