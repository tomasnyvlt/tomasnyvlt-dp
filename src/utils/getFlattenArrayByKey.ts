export type ArrWithObjectsType = Array<Record<string, any>>;

interface Props {
  array: ArrWithObjectsType;
  objectKey: string;
}

/**
 * Convert deep nested array of objects to flat array by object key
 */
const getFlattenArrayByKey = ({ array, objectKey }: Props): ArrWithObjectsType => {
  let childrenArray: any[] = [];

  const flattenArray = array.map((item) => {
    if (item?.[objectKey]?.length) {
      childrenArray = [...childrenArray, ...item[objectKey]];
    }
    return item;
  });

  if (!childrenArray?.length) {
    return [...flattenArray, ...childrenArray];
  }

  return [...flattenArray, ...getFlattenArrayByKey({ array: childrenArray, objectKey })];
};

export default getFlattenArrayByKey;
