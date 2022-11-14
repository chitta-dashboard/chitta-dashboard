import { lazy } from "react";
import CryptoJS from "crypto-js";
import Compress from "react-image-file-resizer";
import { read, utils } from "xlsx";

const Dashboard = lazy(() => import("../../views/dashboard"));
const CEODetails = lazy(() => import("../../views/ceo-details"));
const MDDetails = lazy(() => import("../../views/md-details"));
const FarmersGroup = lazy(() => import("../../views/farmers-group"));
const FarmersDetails = lazy(() => import("../../views/farmers-details"));
const Founders = lazy(() => import("../../views/founders"));
const AdminPanel = lazy(() => import("../../views/admin-panel"));
const Resolutions = lazy(() => import("../../views/resolution"));
const NotFound = lazy(() => import("../../views/not-found"));
const FarmerFormPreview = lazy(() => import("../../views/farmer-detail-page/farmer-form-preview/FarmerFormPreview"));
const ResolutionCertificatePage = lazy(() => import("../../views/resolution-certificate"));
const MDDetailsFormPreview = lazy(() => import("../../views/md-details-page/mdDetails-form-preview/MdDetailsFormPreview"));

export const fileValidation = (file: string) => {
  var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!allowedExtensions.exec(file)) {
    return false;
  }
  return true;
};

export const searchWord = (text: String, word: String) =>
  text
    ? text
        .trim()
        .toLowerCase()
        .search(
          word
            .replace(/[*+?^${}()|[\]\\]/g, "\\$&")
            .trim()
            .toLowerCase(),
        ) >= 0
    : false;

export const ASCENDING = "ascending";
export const DESCENDING = "descending";
export const NORMAL = "normal";
export type SortOrder = typeof ASCENDING | typeof DESCENDING | typeof NORMAL;

export const sortObj = <ObjStructure>(
  arr: Array<ObjStructure>,
  sortOrder: SortOrder,
  sortKey: keyof ObjStructure,
  options: {
    asDate?: boolean;
  } = {
    asDate: false,
  },
) => {
  const arrClone = [...arr];

  switch (sortOrder) {
    case ASCENDING:
      if (options.asDate) {
        arrClone.sort((a, b) => {
          if (new Date(a[sortKey] as unknown as string) > new Date(b[sortKey] as unknown as string)) return 1;
          else return -1;
        });
      } else {
        arrClone.sort((a, b) => {
          if ((a[sortKey] as unknown as string).toLowerCase() > (b[sortKey] as unknown as string).toLowerCase()) return 1;
          else return -1;
        });
      }
      break;

    case DESCENDING:
      if (options.asDate) {
        arrClone.sort((a, b) => {
          if (new Date(a[sortKey] as unknown as string) < new Date(b[sortKey] as unknown as string)) return 1;
          else return -1;
        });
      } else {
        arrClone.sort((a, b) => {
          if ((a[sortKey] as unknown as string).toLowerCase() < (b[sortKey] as unknown as string).toLowerCase()) return 1;
          else return -1;
        });
      }
      break;

    case NORMAL:
      // do nothing;
      break;
  }

  return arrClone;
};

export const createTimeStamp = (dateTimeInString: string) => {
  const dateObj = new Date(dateTimeInString).toString().split(" ");
  const date = dateObj.slice(1, 4).join(",").replace(",", " ");
  let [hr, min] = dateObj[4].split(":").map((k) => +k);
  let time = `${((hr + 11) % 12) + 1}`.padStart(2, "0") + ":" + `${min}`.padStart(2, "0") + " " + (hr < 12 ? "AM" : "PM");
  return date + ", " + time;
};

// if no value specified, returns current time in input accepting format
// if value specified, returns the value in input accepting format
export const getCurrentTime = (value?: string): string => {
  const currentDate = value ? new Date(value) : new Date();
  const formattedDate = currentDate.toLocaleDateString("en-CA") + "T" + currentDate.toLocaleTimeString().slice(0, 5);
  return formattedDate;
};

export const ROUTES = [
  {
    route: "dashboard",
    name: "Dashboard",
  },
  {
    route: "ceo-details",
    name: "CEO Details",
  },
  {
    route: "md-details",
    name: "MD Details",
  },
  {
    route: "founders",
    name: "Founders",
  },
  {
    route: "farmers-group",
    name: "Farmers Group",
  },
  {
    route: "farmers-details",
    name: "Farmers Details",
  },
  {
    route: "board-resolution",
    name: "Board Resolution",
  },
  {
    route: "admin-panel",
    name: "Admin Panel",
  },
];

export const Message = (name: string) => {
  return {
    addMd: `New Md "${name}" has been registered`,
    deleteMd: `Md "${name}" has been removed`,
    addFarmGroup: `New Farmer group "${name}" has been registered`,
    deleteFarmGroup: `Farmer group "${name}" has been removed`,
    addFarmDetail: `New Farmer "${name}" has been registered`,
    deleteFarmDetail: `Farmer "${name}" has been removed`,
    addCeoDetails: `New ceo "${name}" has been registered`,
    deleteCeoDetails: `ceo "${name}" has been removed`,
    addFoundersDetails: `New Founder "${name}" has been registered`,
    deleteFoundersDetails: `Founder "${name}" has been removed`,
  };
};

export const MessageStructured = (name: string, endPoint: string, action: "edit" | "add" | "delete") => {
  const key: {
    [key: string]: string;
  } = {
    ceo: "ceo",
    resolutions: "Resolution",
    farmerDetails: "Farmer",
    farmerGroup: "Farmer Group",
    mdDetails: "Md",
    founders: "Founder",
  };

  switch (action) {
    case "edit":
      return `${key[endPoint]} "${name}" has been edited`;
    case "delete":
      return `${key[endPoint] as string} "${name}" has been removed`;
    case "add":
      return `New ${key[endPoint] as string} "${name}" has been registered`;
  }
};

export const dateFormat = (mydate?: string) => {
  return mydate && mydate.split("-").reverse().join("-");
};

export const calculateAge = (dob: string) => {
  let seperatedDate = dob.split("-");
  let dob1 = [seperatedDate[1], seperatedDate[0], seperatedDate[2]].join("-");
  var today = new Date();
  var birthDate = new Date(dob1);
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age_now--;
  }
  return age_now;
};

export const createJoinDate = () => {
  const dateObj = new Date().toString().split(" ");
  const date = dateObj.slice(1, 4).join(",").replace(",", " ");
  return date;
};

/**
 * Encrypt a text.
 * @param {string} text - The text to encrypt
 * @param {string} secretPhrase - The encryption key (this should be used while decryption)
 * @returns {string} The encrypted text.
 */
export const encryptText = (text: string, secretPhrase: string = "123"): string => {
  const encryptedText = CryptoJS.AES.encrypt(text, secretPhrase).toString();
  return encryptedText;
};

/**
 * Decrypt a text.
 * @param {string} encryptedText - The text to decrypt
 * @param {string} secretPhrase - The decryption key (the same key that is used for encryption)
 * @returns {string} The decrypted text.
 */
export const decryptText = (encryptedText: string, secretPhrase: string = "123"): string => {
  try {
    const decryptedText = CryptoJS.AES.decrypt(encryptedText, secretPhrase).toString(CryptoJS.enc.Utf8);
    return decryptedText;
  } catch (err) {
    // console.log("the passed string was not a encrypted string");
    return encryptedText;
  }
};

/**
 * Encrypt a file.
 * @param {Blob | File} file - The file to encrypt
 * @returns {string} Returns the specified file's encrypted Base64 text.
 */
export const encryptFile = (file: Blob | File | string, isPath = false): Promise<string> =>
  new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      const encryptedBase64 = encryptText(reader?.result as string);
      resolve(encryptedBase64);
    };
    if (isPath && typeof file === "string") {
      file = await fetch(file).then((r) => r.blob());
    }
    reader.readAsDataURL(file as Blob | File);
  });

export const groupBy = (arr: any[], property: string) => {
  return arr.reduce((acc, obj) => {
    const key = obj[property];
    // Add object to list for given key's value
    acc[key] = { ...obj };
    return acc;
  }, {});
};

/**
 * Converts excel sheet data to JSON data
 * @param {File} file
 * @returns Returns a promise which resolves with the parsed JSON data.
 */
export const getJSONfromExcel = (file: File) => {
  const reader = new FileReader();
  const readerPromise = new Promise((resolve) => {
    reader.addEventListener("loadend", () => {
      const rawData = read(reader.result, { type: "binary" });
      let JSONData: { [key: string]: string }[] = [];
      rawData.SheetNames.forEach((sheet) => {
        const currentData: { [key: string]: string }[] = utils.sheet_to_json(rawData.Sheets[sheet], { defval: "", raw: true });
        JSONData.push(...currentData);
      });

      resolve(JSONData);
    });
  });
  reader.readAsBinaryString(file);

  return readerPromise as Promise<{ [key: string]: string }[]>;
};

export type Endpoints = "resolutions" | "ceo" | "farmerDetails" | "farmerGroup" | "mdDetails" | "founders" | "notification";

export const ENDPOINTS: {
  resolutions: Endpoints;
  ceo: Endpoints;
  farmerDetails: Endpoints;
  farmerGroup: Endpoints;
  mdDetails: Endpoints;
  founders: Endpoints;
  notification: Endpoints;
} = {
  resolutions: "resolutions",
  ceo: "ceo",
  farmerDetails: "farmerDetails",
  farmerGroup: "farmerGroup",
  mdDetails: "mdDetails",
  founders: "founders",
  notification: "notification",
};

export const handleDataByPage = (farmerData: any, page: number) => {
  let updatedData: any = {};
  let values = Object.values(farmerData);
  let i = (page - 1) * 25;
  let end = values.length < 25 * page ? values.length : 25 * page;
  while (i < end) {
    updatedData[i + 1] = values[i];
    i++;
  }
  return updatedData;
};

export const RouterDefaults = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/ceo-details",
    component: CEODetails,
  },
  {
    path: "/md-details",
    component: MDDetails,
  },
  {
    path: "/md-details/:mdId",
    component: MDDetailsFormPreview,
  },
  {
    path: "/farmers-group",
    component: FarmersGroup,
  },
  {
    path: "/farmers-details",
    component: FarmersDetails,
  },
  {
    path: "/farmers-details/:farmerId",
    component: FarmerFormPreview,
  },
  {
    path: "/founders",
    component: Founders,
  },
  {
    path: "/admin-panel",
    component: AdminPanel,
  },
  {
    path: "/board-resolution",
    component: Resolutions,
  },
  {
    path: "/board-resolution/:resolutionId",
    component: ResolutionCertificatePage,
  },
  {
    path: "/*",
    component: NotFound,
  },
];
export const imageCompressor = (file: any) =>
  new Promise<string>((resolve) => {
    Compress.imageFileResizer(
      file,
      300,
      300,
      "jpeg",
      80,
      0,
      (uri) => {
        resolve(uri as string);
      },
      "base64",
    );
  });
