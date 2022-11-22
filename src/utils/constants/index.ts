import { lazy } from "react";
import CryptoJS from "crypto-js";
import Compress from "react-image-file-resizer";
import { read, utils } from "xlsx";
import Paddy from "../../assets/images/rice.png";
import Millet from "../../assets/images/millet.png";
import Groundnut from "../../assets/images/groundnut.png";
import Maize from "../../assets/images/maize.png";
import Ragi from "../../assets/images/ragi.png";
import Blackgram from "../../assets/images/blackgram.png";
import Sugarcane from "../../assets/images/sugarcane.png";
import Cotton from "../../assets/images/cotton.png";

const Dashboard = lazy(() => import("../../views/dashboard"));
const CEODetails = lazy(() => import("../../views/ceo-details"));
const MDDetails = lazy(() => import("../../views/md-details"));
const FarmersGroup = lazy(() => import("../../views/farmers-group"));
const FarmersDetails = lazy(() => import("../../views/farmers-details"));
const Founders = lazy(() => import("../../views/founders"));
const AdminPanel = lazy(() => import("../../views/admin-panel"));
const Resolutions = lazy(() => import("../../views/resolution"));
const Portfolio = lazy(() => import("../../views/portfolio"));
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
  {
    route: "portfolio",
    name: "Portfolio",
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
    addProduct: `Product "${name}" has been added`,
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
  if (age_now <= 0) {
    return "Invalid Age";
  }
  return age_now;
};

export const createJoinDate = () => {
  const dateObj = new Date().toString().split(" ");
  const date = dateObj.slice(1, 4).join(",").replace(",", " ");
  return date;
};

/**
 * Returns the base64 encoding of a file.
 * @param {Blob | File} file - The file to encode
 * @returns {string} Returns the specified file's Base64 encoding.
 */
export const fileToBase64 = (file: Blob | File | string, isPath = false): Promise<string> =>
  new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.onload = function () {
      resolve(reader.result as string);
    };
    if (isPath && typeof file === "string") {
      file = await fetch(file).then((r) => r.blob());
    }
    reader.readAsDataURL(file as Blob | File);
  });

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
export const encryptFile = async (file: Blob | File | string, isPath = false): Promise<string> => {
  const base64 = await fileToBase64(file, isPath);
  return encryptText(base64);
};

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

export type Endpoints =
  | "resolutions"
  | "ceo"
  | "farmerDetails"
  | "farmerGroup"
  | "mdDetails"
  | "founders"
  | "notification"
  | "portfolio-raw"
  | "portfolio-processed"
  | "portfolio-animal"
  | "admin";

export const ENDPOINTS: {
  resolutions: Endpoints;
  ceo: Endpoints;
  farmerDetails: Endpoints;
  farmerGroup: Endpoints;
  mdDetails: Endpoints;
  founders: Endpoints;
  notification: Endpoints;
  portfolioRaw: Endpoints;
  portfolioProcessed: Endpoints;
  portfolioAnimal: Endpoints;
  admin: Endpoints;
} = {
  resolutions: "resolutions",
  ceo: "ceo",
  farmerDetails: "farmerDetails",
  farmerGroup: "farmerGroup",
  mdDetails: "mdDetails",
  founders: "founders",
  notification: "notification",
  portfolioRaw: "portfolio-raw",
  portfolioProcessed: "portfolio-processed",
  portfolioAnimal: "portfolio-animal",
  admin: "admin",
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
    path: "/portfolio",
    component: Portfolio,
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

export const VARIANT_DATA: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  "eed0024e-9788-4f74-8ef0-ad9d9671b41e": {
    "e2fbf9be-101b-46d8-98d9-0ce106e25b26": "Basmati",
    test1: "Test Variant 1",
    test2: "Test Variant 2",
    test3: "Test Variant 3",
  },
  "ae276ede-06fd-4044-920e-a3c63c149639": {
    "a7e8d3fb-b318-481f-8913-a802323d0002": "Paiyur-1",
    test1: "Test Variant 1",
    test2: "Test Variant 2",
    test3: "Test Variant 3",
  },
  "b1644f14-fd5a-45dd-84be-a403d20ee0ef": {
    "88ee2e31-3abe-448f-a439-2dc087aa9573": "Basmati",
    test1: "Test Variant 1",
    test2: "Test Variant 2",
    test3: "Test Variant 3",
  },
  "79253524-3110-48f7-8769-b9adbd2a26a0": {
    "88618d44-a095-4217-b09e-30b1b341022f": "Basmati",
  },
  "ed07c5c6-dce2-48ae-9ef0-8385774e3703": {
    "38a003fd-af1a-4d68-98c9-3e5d4096a5c5": "Basmati",
  },
  "6831d66b-b090-469e-a1be-dda258c3b3eb": {
    "177977f1-861e-4b3d-b54a-1cacfbaa116c": "Basmati",
  },
  "2f085dc7-3c65-4fb2-bc41-17d07223a613": {
    "c717ca08-1c0d-47a2-a184-7b3a4760752f": "Basmati",
  },
  "456ea261-efad-492f-a067-ed2284c186c9": {
    "bf61e4b1-c9bb-4627-a64e-b6c6cec586a7": "Basmati",
  },
};

export const PRODUCT_DATA = {
  raw: [
    { id: "eed0024e-9788-4f74-8ef0-ad9d9671b41e", productId: 101, name: "Paddy Seeds", tamilName: "நெல் விதைகள்", image: "" },
    { id: "ae276ede-06fd-4044-920e-a3c63c149639", productId: 102, name: "Millet Seeds", tamilName: "தினை விதைகள்", image: "" },
    { id: "b1644f14-fd5a-45dd-84be-a403d20ee0ef", productId: 103, name: "Groundnut", tamilName: "நிலக்கடலை", image: "" },
    { id: "79253524-3110-48f7-8769-b9adbd2a26a0", productId: 104, name: "Maize", tamilName: "சோளம்", image: "" },
    { id: "ed07c5c6-dce2-48ae-9ef0-8385774e3703", productId: 105, name: "Ragi Seeds", tamilName: "ராகி விதைகள்", image: "" },
    { id: "6831d66b-b090-469e-a1be-dda258c3b3eb", productId: 106, name: "Black Gram", tamilName: "உளுந்து", image: "" },
    { id: "2f085dc7-3c65-4fb2-bc41-17d07223a613", productId: 107, name: "Sugarcane", tamilName: "கரும்பு", image: "" },
    { id: "456ea261-efad-492f-a067-ed2284c186c9", productId: 108, name: "Cotton Seeds", tamilName: "பருத்தி விதைகள்", image: "" },
  ],
  processed: [],
  animal: [],
};

// converting image to base64 and saving into Products details
(async () => {
  PRODUCT_DATA.raw[0].image = await fileToBase64(Paddy, true);
  PRODUCT_DATA.raw[1].image = await fileToBase64(Millet, true);
  PRODUCT_DATA.raw[2].image = await fileToBase64(Groundnut, true);
  PRODUCT_DATA.raw[3].image = await fileToBase64(Maize, true);
  PRODUCT_DATA.raw[4].image = await fileToBase64(Ragi, true);
  PRODUCT_DATA.raw[5].image = await fileToBase64(Blackgram, true);
  PRODUCT_DATA.raw[6].image = await fileToBase64(Sugarcane, true);
  PRODUCT_DATA.raw[7].image = await fileToBase64(Cotton, true);
})();
