/**
 * Generates unique key - used mainly for re-rendering (add as key prop to component)
 *
 * @returns {string} - unique key
 */
export const generateUniqueKey = (): string => {
  const date = new Date();

  return `${date.getTime()}`;
};
