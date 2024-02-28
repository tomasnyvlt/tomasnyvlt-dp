import { SMARTFORM_WHOLE_ADDRESS_SUFFIX } from '@src/constants/fields';
import { SUITABILITY_RECORD_FIELD_NAME_PREFIX } from '@src/schema/schemas/constants/fieldNames';

/**
 * Filter out fields from suitability record and
 * unify select fields (double label and value keys) into one key
 *
 * @param {string[]} keysArr - array of keys
 * @returns {string[]} filtered array of keys
 */
const getFilteredFields = (keysArr: string[]): string[] => {
  if (!keysArr.length) return [];

  const changedArr = keysArr.map((key) => {
    if (key.startsWith(SUITABILITY_RECORD_FIELD_NAME_PREFIX)) return null;

    const splittedKey = key.split('.');

    if (splittedKey.length === 1) return key;

    const lastPart = splittedKey[splittedKey.length - 1];

    if (
      lastPart !== 'value' &&
      lastPart !== 'label' &&
      lastPart !== SMARTFORM_WHOLE_ADDRESS_SUFFIX
    ) {
      return key;
    }

    splittedKey.pop();

    // Pop last part of the key if it's a number - it's an array index
    if (!Number.isNaN(Number(splittedKey.at(-1)))) {
      splittedKey.pop();
    }

    return splittedKey.join('.');
  });

  const filteredArr = changedArr.filter(Boolean);

  return Array.from(new Set(filteredArr)) as string[];
};

export default getFilteredFields;
