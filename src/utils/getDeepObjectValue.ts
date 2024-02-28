interface Props {
  obj: Record<string, any>;
  keys: (string | number)[];
}

type Output<T> = T | null;

/**
 * Get value from deep object by keys array
 */
const getDeepObjectValue = <T = any>({ obj, keys }: Props): Output<T> => {
  const value = keys.reduce((acc, cur) => (acc && acc[cur] !== null && acc[cur] !== undefined ? acc[cur] : null), obj);

  return value as Output<T>;
};

export default getDeepObjectValue;
