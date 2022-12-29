import { createSlice } from "@reduxjs/toolkit";
import { NORMAL, SortOrder } from "../../constants";
import placeHolderImg from "../../../assets/images/profile-placeholder.jpg";

export interface IFounders {
  id: string;
  name: string;
  phoneNumber: string;
  qualification: string;
  profile: string;
  dob: string;
  description?: string;
  joinDate?: string;
}

export interface IFoundersSlice {
  foundersById: { [id: string]: IFounders };
  searchFilter: string;
  sortFilter: SortOrder;
}

const initialState: IFoundersSlice = {
  foundersById: {
    a: {
      id: "a",
      profile: placeHolderImg,
      name: "Veera Raghavan",
      phoneNumber: "9945672156",
      qualification: "BBA, MBA",
      dob: "01-10-1982",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    b: {
      id: "b",
      profile: placeHolderImg,
      name: "John Durairaj",
      phoneNumber: "8610010875",
      qualification: "BA",
      dob: "27-01-1990",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    c: {
      id: "c",
      profile: placeHolderImg,
      name: "Vijay Kumar",
      phoneNumber: "8968456734",
      qualification: "BCom CA",
      dob: "09-11-1989",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    d: {
      id: "d",
      profile: placeHolderImg,
      name: "Kathiresan",
      phoneNumber: "8838461839",
      qualification: "BSc, Computer Science",
      dob: "12-10-1994",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    e: {
      id: "e",
      profile: placeHolderImg,
      name: "Jeevanandham",
      phoneNumber: "9854367213",
      qualification: "B.Tech, Information Technology",
      dob: "02-08-1992",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    f: {
      id: "f",
      profile: placeHolderImg,
      name: "Arockiyaraj Reddy",
      phoneNumber: "9945672156",
      qualification: "B.Tech, Computer Science",
      dob: "12-07-1985",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
  },
  searchFilter: "",
  sortFilter: NORMAL,
};

const foundersSlice = createSlice({
  name: "founders",
  initialState,
  reducers: {},
});

export const foundersReducer = foundersSlice.reducer;
