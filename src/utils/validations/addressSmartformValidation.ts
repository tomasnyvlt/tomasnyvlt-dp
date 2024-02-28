const expectedSubstrings = ["street", "zip", "city", "houseNumber", "addressWhole"];

const getKeyInFlatArray = (inputEntriesFlat: Array<string>, value: string) => {
  // get index of value in flat array
  const keyInFlatIndex = inputEntriesFlat.indexOf(value);

  if (keyInFlatIndex === -1) {
    // if key does not exist in array, return false
    return false;
  }
  // if key exists, find length its value which is index + 1, return if length > 0
  const valueExists = inputEntriesFlat[keyInFlatIndex + 1].length > 0;
  return valueExists;
};

export function addressSmartformValidation(inputValue: Record<string, string>): boolean {
  const inputKeys = Object.keys(inputValue);
  // example : ['zip', 'street', 'city','houseNumber', 'addressWhole']

  // check if keys has more than or equal to length as expected keys
  if (inputKeys.length < expectedSubstrings.length) return false;

  const inputEntriesFlat = Object.entries(inputValue).flat();
  // example: ['zip', '13000', 'street', 'Medlov', 'addressWhole', 'Medlov 208, 13000, Medlov', 'city', 'Medlov', 'houseNumber', '208']

  // check if every key has value
  const isValid = inputKeys.every((val) => {
    return getKeyInFlatArray(inputEntriesFlat, val);
  });

  return isValid;
}
