interface SetFormValuesFromDataObjectProps {
  change: (name: string, value?: Record<string, any>) => void;
  data: Record<string, any>;
  prefix?: string;
}

const setFormValuesFromDataObject = ({ change, data, prefix = "" }: SetFormValuesFromDataObjectProps) => {
  if (!data) return;

  Object.keys(data).forEach((key) => {
    const value = data[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object") {
      setFormValuesFromDataObject({ change, data: value, prefix: fullKey });
      return;
    }

    // change(fullKey, value === "0" ? false : value);
    change(fullKey, value);
  });
};

export default setFormValuesFromDataObject;
