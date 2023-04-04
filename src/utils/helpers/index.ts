import moment from "moment/moment";
import CryptoJS from "crypto-js";
import { Buffer } from "buffer";

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

    let checkDay = remainingDays > 1 ? "days" : "day";
    let checkWeek = week > 1 ? "weeks" : "week";
    let checkMonth = month > 1 ? "months" : "month";
    let checkRemainingWeek = remainingWeeks > 1 ? "weeks" : "week";

    const weekResult = `${week} ${checkWeek} ${remainingDays > 0 && `and ${remainingDays} ${checkDay}`}`;
    const monthResult = `${month} ${checkMonth} ${remainingWeeks > 0 && `and ${remainingWeeks} ${checkRemainingWeek}`}`;
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

const formatNumber = (num: number) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

const toFixedOf = (value: number, fixedOf: number) => {
  return !isNaN(value) && !isNaN(fixedOf) ? parseFloat(Number(value).toFixed(fixedOf)) : value;
};

export const formatNumberToSmallScale = (number: number) => {
  if (number / Math.pow(10, 9) >= 1) return `${formatNumber(toFixedOf(number / Math.pow(10, 9), 2))}B`;
  else if (number / Math.pow(10, 6) >= 1) return `${formatNumber(toFixedOf(number / Math.pow(10, 6), 2))}M`;
  else if (number / Math.pow(10, 3) >= 1) return `${formatNumber(toFixedOf(number / Math.pow(10, 3), 2))}K`;
  return number;
};

//encryption and decryption
export const decryptCrypto = (data: string) => {
  let salt = process.env.REACT_APP_API_SECRET ?? "";
  var bytes = CryptoJS.AES.decrypt(data, salt);
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

export const base64Encode = (data: string) => {
  return Buffer.from(data).toString("base64");
};

export const randomIntBetween = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateProfileName = (blob: Blob, newName: string) => {
  const file = new File([blob], newName, { type: blob.type });
  return file;
};
