// import { mdDetail } from "../context/mdDetails";

export const fileValidation = (file: string) => {
  var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

  if (!allowedExtensions.exec(file)) {
    return false;
  }
  return true;
};

export const searchWord = (text: string, word: string) =>
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

export const sortObj = <ObjStructure>(
  arr: Array<ObjStructure>,
  sortOrder: "ascending" | "descending",
  sortKey: keyof ObjStructure,
  options: {
    asDate?: boolean;
  } = {
      asDate: false,
    },
) => {
  const arrClone = [...arr];


  switch (sortOrder) {
    case "ascending":
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
    case "descending":
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

export const getCurrentTime = (): string => {
  const currentDate = new Date();
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
