export const getValueByString = <T>(key: string, obj: T): any => {
  if (!key) return undefined;

  let currentKey = key.split(".");

  let result = obj?.[currentKey[0] as keyof typeof obj];

  if (Array.isArray(result)) {
    if (currentKey[1] === "length") {
      return result.length;
    }

    if (!Number.isNaN(+currentKey[0])) {
      result = result[+currentKey[0]];
    }

    const match = /\((.*):(.*)\)/.exec(currentKey[1]);
    if (match) {
      const found = (result as unknown as any[]).find((r) => r[match[1]].toString() === match[2]);
      if (found) {
        currentKey = currentKey.slice(1);
        result = found;
      }
    }
  }

  return currentKey.length > 1 ? getValueByString(currentKey.slice(1).join("."), result) : result;
};
