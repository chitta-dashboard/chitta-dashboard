import moment from "moment/moment";

type datePropsType = string | number;

export const handleDateDifference = (start: datePropsType, end: datePropsType) => {
  let updatedStart: number = new Date(start).getTime();
  let updatedEnd: number = new Date(end).getTime();

  let time = Math.abs(updatedEnd - updatedStart);
  let days = Math.ceil(time / (1000 * 60 * 60 * 24));

  if (days > 7) {
    let week = Math.floor(days / 7);
    let remainingDays = days % 7;

    let month = Math.floor(week / 4.34524);
    let remainingWeeks = Math.floor(week % 4.34524);
    let setRemainingDays = remainingDays > 1 ? "days" : "day";
    let setRemainingWeeks = remainingWeeks > 1 ? "weeks" : "week";

    const weekResult = `${week} ${week > 1 ? "weeks" : "week"} ${remainingDays > 0 ? `and ${remainingDays} ${setRemainingDays}` : ""}`;
    const monthResult = `${month} ${month > 1 ? "months" : "month"} ${remainingWeeks > 0 ? `and ${remainingWeeks} ${setRemainingWeeks}` : ""}`;
    let result = month > 0 ? monthResult : weekResult;
    return result;
  }

  return `${days} ${days > 1 ? "days" : "day"}`;
};

export const handleDateDifference2 = (start: datePropsType, end: datePropsType) => {
  let date1 = moment(start, "MMDDYYYY");
  let date2 = moment(end, "MMDDYYYY");

  let days = date2.diff(date1, "days");
  if (days > 5) {
    let week = Math.ceil(days / 7);
    let month = Math.ceil(week / 4.34524);

    let weekResult = `${week} ${week > 1 ? "weeks" : "week"}`;
    let monthResult = `${month} ${month > 1 ? "months" : "month"}`;

    let result = month > 1 ? monthResult : weekResult;
    return result;
  }
  return `${days} ${days > 1 ? "days" : "day"}`;
};

export const useSearchQuery = (searchKey: number | string, searchName: string) => {
  return searchKey === "" ? `?q=` : `?${searchName}_like=${searchKey}`;
};

export const useSortQuery = (sortKey: number | string, sortName: string) => {
  switch (sortKey) {
    case "normal":
      return "";
    case "ascending":
      return `&_sort=${sortName}&_order=asc`;
    case "descending":
      return `&_sort=${sortName}&_order=desc`;
    default:
      return "";
  }
};
