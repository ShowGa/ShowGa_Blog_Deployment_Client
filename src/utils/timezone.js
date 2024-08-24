import moment from "moment-timezone";

export const changeTimeZone = (time) => {
  const changedTime = moment(time).tz("Asia/Taipei").format("YYYY-MM-DD");

  return changedTime;
};
