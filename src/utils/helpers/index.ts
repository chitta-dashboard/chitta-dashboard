type datePropsType = string | number

export const handleDateDifference = (start:datePropsType, end:datePropsType) => {

  let updatedStart:number =  new Date(start).getTime();
  let updatedEnd: number = new Date(end).getTime();

  let time = Math.abs(updatedEnd - updatedStart);
  let days = Math.ceil(time / (1000 * 60 * 60 * 24));

  if (days > 7) {
    let week = Math.floor(days / 7);
    let remainingDays = days % 7;

    let month = Math.floor(week / 4.34524);
    let remainingWeeks = Math.floor(week % 4.34524);

    const weekResult = `${week} ${week > 1 ? "weeks" : "week"} ${
      remainingDays > 0 ? `and ${remainingDays} ${remainingDays > 1 ? "days" : "day"}` : ""
    }`;
    const monthResult = `${month} ${month > 1 ? "months" : "month"} ${
      remainingWeeks > 0 ? `and ${remainingWeeks} ${remainingWeeks > 1 ? "weeks" : "week"}` : ""
    }`;
    let result = month > 0 ? monthResult : weekResult;
    return result;
  }

  return `${days} days`;
};
