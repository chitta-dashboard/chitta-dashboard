import { read, utils, write, writeFile } from "xlsx";
import { v4 as uuidv4 } from "uuid";
import { queryClient } from "../../../containers/provider";
import { ENDPOINTS } from "../../../utils/constants";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { IDropValidationResult } from "../../common-components/drop-file";
import FileSaver from "file-saver";
import Toast from "../../../utils/toast";

/**
 * Checks if the passed object is of valid farmerDetails structure.
 */
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
      const farmers: farmerDetail[] = [];

      // format validation
      for (let i = 0; i < totalSheets; i++) {
        const farmersInCurrentSheet: { [key: string]: string }[] = utils.sheet_to_json(rawData.Sheets[rawData.SheetNames[i]], {
          defval: "",
          raw: true,
        });
        // if the first row is in correct format, then all rows in the sheet will be correct.
        // so validating format only on first row of the sheet.
        if (!isValidFormat(farmersInCurrentSheet[0])) {
          return resolve({ status: false, message: "Invalid Column Format. Please check if all required fields are present in all sheets." });
        }
        farmers.push(...(farmersInCurrentSheet as unknown as farmerDetail[]));
      }

      // phonenumber validation
      const farmerDetails = queryClient.getQueryData([`${ENDPOINTS.farmerDetails}-fetch`]) as { [key: string]: farmerDetail };
      const registeredNumbers = new Set(Object.values(farmerDetails).map((farmer) => farmer.phoneNumber));
      const totalFarmers = farmers.length;
      for (let i = 0; i < totalFarmers; i++) {
        if (registeredNumbers.has(farmers[i].phoneNumber)) {
          return resolve({ status: false, message: "Some phonenumbers are already registered! Rejected." });
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
