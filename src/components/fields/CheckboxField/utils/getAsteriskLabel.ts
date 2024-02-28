const ASTERISK = "*";

const getAsteriskLabel = (label: string, isRequired: boolean): string => {
  if (!isRequired) {
    return label;
  }

  const parsedLabel = JSON.parse(label);
  const { blocks } = parsedLabel ?? {};
  if (!blocks) return label;

  blocks[0].text = `${(blocks[0].text as string).trimEnd()}\xA0${ASTERISK}`;

  return JSON.stringify(parsedLabel);
};

export default getAsteriskLabel;
