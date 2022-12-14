import { read, utils, write, writeFile } from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { queryClient } from "../../../containers/provider";
import { ENDPOINTS } from "../../../utils/constants";
import { FarmersGroup } from "../../../utils/context/farmersGroup";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { IDropValidationResult } from "../../common-components/drop-file";
import FileSaver from "file-saver";
import Toast from "../../../utils/toast";

/**
 * Checks if the passed object is of valid farmerDetails structure.
 */

let InputFarmersDatas: farmerDetail[] = [];

const isValidFormat = (farmerData: { [key: string]: string }) => {
  const requiredFields = [
    "spouseName",
    "phoneNumber",
    "addhaarNo",
    "dob",
    "sex",
    "address",
    "village",
    "taluk",
    "district",
    "postalNo",
    "landAreaInCent",
    "surveyNo",
    "landType",
    "irrigationType",
    "cropsType",
    "cattle",
    "smallOrMarginalFarmer",
    "membershipId",
    "name",
    "fatherName",
    "group",
    "border",
    "farmerType",
    "waterType",
    "animals",
    "groupMember",
    "acre",
    "qualification",
    "nameAsPerBank",
    "bankName",
    "accountNumber",
    "ifscCode",
  ];
  const loadedFields = Object.keys(farmerData);
  if (requiredFields.length !== loadedFields.length) return false;
  requiredFields.forEach((key) => {
    if (!loadedFields.includes(key)) {
      return false;
    }
  });
  return true;
};

/**
 * Validates the file based on the following rules.
 *    - Excel data is in expected format.
 *    - Phonenumbers are all unregistered.
 * @param {File} file - The excel file to validate
 * @returns A promise which resolves with an object with 'status' & 'message' property, The 'status' holds the validation result, the 'message' holds the error message if 'status' is falsey.
 */
export const validateFarmerData = function (file: File) {
  const reader = new FileReader();
  const readerPromise = new Promise<IDropValidationResult>((resolve) => {
    reader.addEventListener("loadend", () => {
      const rawData = read(reader.result, { type: "binary" });
      const totalSheets = rawData.SheetNames.length;

      // format validation
      for (let i = 0; i < totalSheets; i++) {
        const farmersInCurrentSheet: { [key: string]: string }[] = utils.sheet_to_json(rawData.Sheets[rawData.SheetNames[i]], {
          defval: "",
          raw: true,
        });
        // if the first row is in correct format, then all rows in the sheet will be correct.
        // so validating format only on first row of the sheet.
        if (!isValidFormat(farmersInCurrentSheet[0])) {
          return resolve({
            status: false,
            message: "Invalid Column Format. Please check if all required fields are present in all sheets.",
          });
        }
        InputFarmersDatas.push(...(farmersInCurrentSheet as unknown as farmerDetail[]));
      }

      // validation for repeating phone & aadhaar numbers on import file

      const phoneNos = Object.values(InputFarmersDatas).map((i) => i.phoneNumber);
      const aadhaarNos = Object.values(InputFarmersDatas).map((i) => i.addhaarNo);

      // checking for repeating phone numbers & empty fields

      if (phoneNos.length > 0 || aadhaarNos.length > 0) {
        for (let i = 0; i < phoneNos.length; i++) {
          for (let j = i + 1; j < phoneNos.length; j++) {
            if (phoneNos[i] === phoneNos[j] || phoneNos[i] === "" || phoneNos[j] === "") {
              return resolve({ status: false, message: "Some phone numbers are repeating or empty! Rejected." });
            }
          }
        }

        // checking for repeating aadhaar numbers & empty fields

        for (let i = 0; i < aadhaarNos.length; i++) {
          for (let j = i + 1; j < aadhaarNos.length; j++) {
            if (aadhaarNos[i] === aadhaarNos[j] || aadhaarNos[i] === "" || aadhaarNos[j] === "") {
              return resolve({ status: false, message: "Some aadhaar numbers are repeating or empty! Rejected." });
            }
          }
        }
      }

      // validation for phone & aadhaar number existing on db.json

      let DBFarmerDetails = queryClient.getQueryData([`${ENDPOINTS.farmerDetails}-fetch`]) as { [key: string]: farmerDetail };

      if (DBFarmerDetails) {
        const dbPhoneNos = Object.values(DBFarmerDetails).map((farmer) => farmer.phoneNumber);
        const dbAadhaarNos = Object.values(DBFarmerDetails).map((farmer) => farmer.addhaarNo);
        const inputPhoneNos = InputFarmersDatas.map((i) => String(i.phoneNumber));
        const inputAadhaarNos = InputFarmersDatas.map((i) => String(i.addhaarNo));
        const existingPhoneNos = dbPhoneNos.filter((data: any) => inputPhoneNos.includes(data));
        const existingAadhaarNos = dbAadhaarNos.filter((data: any) => inputAadhaarNos.includes(data));
        const Iterationlength = Object.values(DBFarmerDetails).map((farmer) => farmer).length;

        if (existingPhoneNos.length > 0 || existingAadhaarNos.length > 0) {
          if (existingPhoneNos.length > 0 && existingAadhaarNos.length > 0) {
            return resolve({
              status: false,
              message: "Some phone or aadhaar numbers are already existed! Rejected.",
              existingFarmers: InputFarmersDatas.filter(
                (data: any) => existingPhoneNos.includes(data.phoneNumber) || existingAadhaarNos.includes(data.addhaarNo),
              ),
              newFarmers: InputFarmersDatas.filter(
                (data: any) => !existingPhoneNos.includes(data.phoneNumber) && !existingAadhaarNos.includes(data.addhaarNo),
              ),
            });
          }
          if (existingPhoneNos.length > 0 && existingAadhaarNos.length == 0) {
            return resolve({
              status: false,
              message: "Some phone or aadhaar numbers are already existed! Rejected.",
              existingFarmers: InputFarmersDatas.filter((data: any) => existingPhoneNos.includes(data.phoneNumber)),
              newFarmers: InputFarmersDatas.filter((data: any) => !existingPhoneNos.includes(data.phoneNumber)),
            });
          }
          if (existingAadhaarNos.length > 0 && existingPhoneNos.length == 0) {
            return resolve({
              status: false,
              message: "Some phone or aadhaar numbers are already existed! Rejected.",
              existingFarmers: InputFarmersDatas.filter((data: any) => existingAadhaarNos.includes(data.addhaarNo)),
              newFarmers: InputFarmersDatas.filter((data: any) => !existingAadhaarNos.includes(data.addhaarNo)),
            });
          }
        } else {
          return resolve({ status: true, message: "", data: InputFarmersDatas });
        }
      }

      resolve({ status: true, message: "" });
    });
  });
  reader.readAsBinaryString(file);
  return readerPromise;
};

/**
 * Changes the Farmer Data to proper format.
 */
export const processFarmerData = (farmers: { [key: string]: string }[]) => {
  return farmers.map(
    (farmer) =>
      ({
        ...farmer,
        id: uuidv4(),
        border: JSON.parse(farmer.border),
        acre: JSON.parse(farmer.acre),
        surveyNo: JSON.parse(farmer.surveyNo),
        profile: "", // placeholder will be shown incase of no image
      } as farmerDetail),
  );
};

/**
 * Downloads an excel sheet with sample Farmer Details format..
 */
export const downloadRejectedData = () => {
  let data: Object[] = [];
  InputFarmersDatas.map((i: any) =>
    data.push({
      spouseName: i.spouseName,
      phoneNumber: i.phoneNumber,
      addhaarNo: i.addhaarNo,
      dob: i.dob,
      sex: i.sex,
      address: i.address,
      village: i.village,
      taluk: i.taluk,
      district: i.district,
      postalNo: i.postalNo,
      landAreaInCent: i.landAreaInCent,
      surveyNo: i.surveyNo,
      landType: i.landType,
      irrigationType: i.irrigationType,
      cropsType: i.cropsType,
      cattle: i.cropsType,
      smallOrMarginalFarmer: i.smallOrMarginalFarmer,
      membershipId: i.membershipId,
      name: i.name,
      fatherName: i.fatherName,
      group: i.group,
      border: i.border,
      farmerType: i.farmerType,
      waterType: i.waterType,
      animals: i.animals,
      groupMember: i.groupMember,
      acre: i.acre,
      qualification: i.qualification,
      nameAsPerBank: i.nameAsPerBank,
      bankName: i.bankName,
      accountNumber: i.accountNumber,
      ifscCode: i.ifscCode,
    }),
  );
  try {
    const ws = utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const finalData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(finalData, "rejected-farmers.xlsx");
  } catch {
    Toast({ message: "Download failed, please try again." });
  }
};
export const exportSampleFormat = () => {
  const data = [
    {
      spouseName: "Data",
      phoneNumber: "1010101010",
      addhaarNo: "121212121212",
      dob: "dd-mm-yyyy",
      sex: "male/female",
      address: "Test",
      village: "Data",
      taluk: "Data",
      district: "Data",
      postalNo: "666666",
      landAreaInCent: "Data",
      surveyNo: `{"surveyNo-first":"123"}`,
      landType: "Test",
      irrigationType: "Test",
      cropsType: "Test",
      cattle: "Test",
      smallOrMarginalFarmer: "Test",
      membershipId: "Test",
      name: "Test",
      fatherName: "Test",
      group: "Test",
      border: `{"borderNo-first":"123"}`,
      farmerType: "Test",
      waterType: "Test",
      animals: "Test",
      groupMember: "Test",
      acre: `{"acreNo-first":"123"}`,
      qualification: "Test",
      nameAsPerBank: "Test",
      bankName: "Test",
      accountNumber: "Test",
      ifscCode: "Test",
    },
  ];

  try {
    const ws = utils.json_to_sheet(data);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
    const finalData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    FileSaver.saveAs(finalData, "format-sample.xlsx");
  } catch {
    Toast({ message: "Download failed, please try again." });
  }
};
