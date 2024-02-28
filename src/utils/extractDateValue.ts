const extractDateValue = (date: string | undefined | null): string | null => {
  if (!date) return null;
  const splitted = date.split("-");
  const [year, month, day] = splitted;

  return `${day}. ${month}. ${year}`;
};

export default extractDateValue;
