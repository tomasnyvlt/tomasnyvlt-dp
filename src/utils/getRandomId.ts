export const DELETE_PREFIX_VALUE = "_delete-";

const getRandomId = (prefix = DELETE_PREFIX_VALUE) => {
  return `${prefix}${Math.random().toString(16).slice(2)}`;
};

export default getRandomId;
