interface Props {
  price: number | undefined;
  withYear?: boolean;
}
export const getFormattedPrice = ({
  price,
  withYear,
}: Props): string | null => {
  if (price === undefined || Number.isNaN(price)) return null;

  const formattedPrice = price.toLocaleString('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });

  if (!withYear) return formattedPrice;

  return `${formattedPrice}/rok`;
};
