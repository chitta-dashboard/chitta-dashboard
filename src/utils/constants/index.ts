// import { mdDetail } from "../context/mdDetails";

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
export type SortOrder = typeof ASCENDING | typeof DESCENDING;

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
    addFarmGroup: `new farmer group "${name}" has been registered`,
    deleteFarmGroup: `new farmer group "${name}" has been removed`,
    addFarmDetail: `New farmer "${name}" has been registered`,
    deleteFarmDetail: `farmer "${name}" has been removed`,
  };
};
