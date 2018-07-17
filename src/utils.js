import moment from "moment";

export const formatTimeStamp = timestamp =>
  moment(timestamp).format("DD/MM/YYYY");
