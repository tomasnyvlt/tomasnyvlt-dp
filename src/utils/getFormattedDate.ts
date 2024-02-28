type DateFormat = "YYYY-MM-DD" | "DD.MM.YYYY";

const getFormattedDate = (dateString: string, format: DateFormat = "YYYY-MM-DD") => {
  if (!dateString) {
    return undefined;
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  if (format === "DD.MM.YYYY") return `${day}. ${month}. ${year}`;

  return `${year}-${month}-${day}`;
};

export default getFormattedDate;
