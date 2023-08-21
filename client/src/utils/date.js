import moment from "moment";

export const formatDate = (date) => {
  let now = moment();
  let momentDate = moment(date);
  let time = momentDate.fromNow(true);

  const getDay = () => {
    let days = time.split(" ")[0];
    if (Number(days) < 8) {
      return now.subtract(Number(days), "days").format("dddd");
    } else {
      return momentDate.format("DD/MM/YYYY");
    }
  };
  const getMinutes = () => {
    let minutes = time.split(" ")[0];
    if (minutes === "a") {
      return "1 min";
    } else {
      return `${minutes} min`;
    }
  };

  if (time === "a few seconds") return "Now";
  if (time === "a day") return "Yesterday";
  if (time.search("minute") !== -1) return getMinutes();
  if (time.search("hour") !== -1) return momentDate.format("HH:mm");
  if (time.search("days") !== -1) return getDay();

  return time;
};
