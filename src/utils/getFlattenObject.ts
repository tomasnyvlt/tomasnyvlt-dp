const getFlattenObject = (obj: Record<string, any>, prefix: string = ""): Record<string, any> => {
  if (obj === null || obj === undefined) {
    return {};
  }

  if (typeof obj !== "object" || (typeof obj === "object" && Array.isArray(obj))) {
    if (!prefix) {
      return {};
    }

    return { [prefix]: obj };
  }

  return Object.keys(obj).reduce((acc, key) => {
    const newPrefix = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        let newValue = { ...acc };

        value.forEach((item, index) => {
          newValue = {
            ...newValue,
            ...getFlattenObject(item, `${newPrefix}.${index}`)
          };
        });
        return newValue;
      }
      return { ...acc, ...getFlattenObject(value, newPrefix) };
    }

    return { ...acc, [newPrefix]: value };
  }, {});
};

export default getFlattenObject;
