const getDateData = () => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const todayDate = new Date();
  const todayTime = todayDate.toTimeString();
  const todayDay = weekday[todayDate.getDay()];
  const todayTimeFormatted = todayTime.split("GMT")[0];
  return { todayDay, todayTimeFormatted };
};

export default getDateData;
