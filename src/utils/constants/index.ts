import CryptoJS from "crypto-js";

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
const encryptText = (text: string, secretPhrase: string = "123"): string => {
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
  const decryptedText = CryptoJS.AES.decrypt(encryptedText, secretPhrase).toString(CryptoJS.enc.Utf8);
  return decryptedText;
};

/**
 * Encrypt a file.
 * @param {Blob | File} file - The file to encrypt
 * @returns {string} Returns the specified file's encrypted Base64 text.
 */
export const encryptFile = (file: Blob | File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const encryptedBase64 = encryptText(reader?.result as string);
      resolve(encryptedBase64);
    };
    reader.readAsDataURL(file);
  });

export const groupBy = (arr: any[], property: string) => {
  return arr.reduce((acc, obj) => {
    const key = obj[property];
    // Add object to list for given key's value
    acc[key] = { ...obj };
    return acc;
  }, {});
};

export type Endpoints = "resolutions" | "ceo" | "farmerDetails" | "farmerGroup" | "mdDetails" | "founders";

export const ENDPOINTS: {
  resolutions: Endpoints;
  ceo: Endpoints;
  farmerDetails: Endpoints;
  farmerGroup: Endpoints;
  mdDetails: Endpoints;
  founders: Endpoints;
} = {
  resolutions: "resolutions",
  ceo: "ceo",
  farmerDetails: "farmerDetails",
  farmerGroup: "farmerGroup",
  mdDetails: "mdDetails",
  founders: "founders",
};
