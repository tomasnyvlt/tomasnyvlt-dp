import { diff } from 'deep-object-diff';

import getFlattenObject from '@src/utils/getFlattenObject';

interface Props {
  originalObj: Record<string, any>;
  newObj: Record<string, any>;
}

/**
 * Compare two objects and return flat object with changes between them
 *
 * @returns {Record<string, any>} Object with changes between two objects
 */
export const getObjectChanges = ({
  originalObj,
  newObj,
}: Props): Record<string, any> => {
  const objectDiff = diff(originalObj, newObj);

  return getFlattenObject(objectDiff);
};
