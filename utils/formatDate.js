module.exports = (date) => {
  //return time in hh:mm format
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  //get month in short- 3 letters
  const month = date.toLocaleDateString("en-us", { month: "short" });
  let day = date.getDate();
  const fullyear = date.getFullYear();
  // check date value to add suffix 
  switch (day) {
    case day === "1" || day === "21":
      day = `${day}st`;
      break;
    case day === "2" || day === "22":
      day = `${day}nd`;
      break;
    case day === "3" || day === "23":
      day = `${day}rd`;
      break;
    default:
      day = `${day}th`;
      break;
  }
  const formattedDate = ` ${month} ${day}, ${fullyear} at ${time}`;
  return formattedDate;
};
