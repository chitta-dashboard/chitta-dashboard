import { ChangeEvent, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";
import { read, utils } from "xlsx";
import { farmerDetail } from "../../../../utils/context/farmersDetails";
import Toast from "../../../../utils/toast";

/**
 * Checks if the passed object is of valid farmerDetails structure.
 */
const isValidFarmerData = (farmerData: { [key: string]: string }) => {
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
    "profile",
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

export const handleImportData = (e: ChangeEvent<HTMLInputElement>, setImportedData: Dispatch<React.SetStateAction<farmerDetail[] | null>>) => {
  if (!e.target.value) {
    return Toast({ message: "No file chosen!", type: "warning", life: 2000 });
  }

  const reader = new FileReader();
  reader.addEventListener("loadend", () => {
    const rawData = read(reader.result, { type: "binary" });
    let farmerData: { [key: string]: string }[] = [];
    let dataSkipped = false;
    rawData.SheetNames.forEach((sheet) => {
      const farmer: { [key: string]: string }[] = utils.sheet_to_json(rawData.Sheets[sheet], { defval: "", raw: true });
      // adds sheet data data only if the sheet contains all required fields.
      if (isValidFarmerData(farmer[0])) {
        farmerData.push(...farmer);
      } else dataSkipped = true;
    });

    if (dataSkipped) Toast({ message: "Some data are skipped due to incorrect format.", type: "error" });
    farmerData = farmerData.map((farmer) => ({ ...farmer, id: uuidv4() }));
    farmerData?.length > 0 && setImportedData(farmerData as unknown as farmerDetail[]);
    e.target.value = "";
  });
  reader.readAsBinaryString(e.target.files![0]);
};
