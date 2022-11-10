import { createSlice } from "@reduxjs/toolkit";
import { NORMAL, SortOrder } from "../../constants";
import placeHolderImg from "../../../assets/images/profile-placeholder.jpg";

export interface IMdDetails {
  id: string;
  farmerId?: string;
  membershipId?: string;
  profile: string;
  name: string;
  fatherName: string;
  sex: string;
  spouseName: string;
  dob: string;
  group: string;
  phoneNumber: string;
  addhaarNo: string;
  surveyNo: { [key: string]: string };
  acre: { [key: string]: string };
  border: { [key: string]: string };
  village: string;
  postalNo: string;
  address: string;
  taluk: string;
  district: string;
  landType: string;
  farmerType: string;
  waterType: string;
  animals: string;
  groupMember: string;
  qualification: string;
}

export type selectedMdListData = number | string;

export interface IMdDetailsSlice {
  mdDetailsById: { [id: string]: IMdDetails };
  searchFilter: string;
  sortFilter: SortOrder;
  currentPage: number;
  pageCount: number;
  totalPageCount: number;
}

const initialState: IMdDetailsSlice = {
  mdDetailsById: {
    a: {
      id: "a",
      farmerId: "a",
      membershipId: "NER-FPC-2",
      profile: placeHolderImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "10-08-1996",
      addhaarNo: "503023001016",
      acre: { "acre-first": "1" },
      border: { "border-first": "1" },
      village: "cholanmaligai",
      postalNo: "612010",
      address: "thanjavur",
      taluk: "thanjavur",
      district: "thanjavur",
      surveyNo: { "surveyNo-first": "1" },
      landType: "option-1",
      farmerType: "option-2",
      waterType: "option-2",
      animals: "மாடு",
      groupMember: "yes",
      qualification: "B.E, Mechanical",
    },
    b: {
      id: "b",
      farmerId: "b",
      membershipId: "NER-FPC-2",
      profile: placeHolderImg,
      name: "Sethu Ravichandran",
      phoneNumber: "8968456734",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "01-01-1994",
      addhaarNo: "893245328967",
      acre: { "acre-first": "1" },
      border: { "border-first": "1" },
      village: "cholanmaligai",
      postalNo: "612010",
      address: "thanjavur",
      taluk: "thanjavur",
      district: "thanjavur",
      surveyNo: { "surveyNo-first": "1" },
      landType: "option-1",
      farmerType: "option-2",
      waterType: "option-2",
      animals: "மாடு",
      groupMember: "yes",
      qualification: "B.E, ECE",
    },
    c: {
      id: "c",
      farmerId: "c",
      membershipId: "NER-FPC-2",
      profile: placeHolderImg,
      name: "Vijay",
      phoneNumber: "9001237654",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "07-01-1998",
      addhaarNo: "901290129012",
      acre: { "acre-first": "1" },
      border: { "border-first": "1" },
      village: "cholanmaligai",
      postalNo: "612010",
      address: "thanjavur",
      taluk: "thanjavur",
      district: "thanjavur",
      surveyNo: { "surveyNo-first": "1" },
      landType: "option-1",
      farmerType: "option-2",
      waterType: "option-2",
      animals: "மாடு",
      groupMember: "yes",
      qualification: "B.Tech - IT",
    },
    d: {
      id: "d",
      farmerId: "d",
      membershipId: "NER-FPC-2",
      profile: placeHolderImg,
      name: "Raj",
      phoneNumber: "7845673879",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "05-08-1998",
      addhaarNo: "908990897654",
      acre: { "acre-first": "1" },
      border: { "border-first": "1" },
      village: "cholanmaligai",
      postalNo: "612010",
      address: "thanjavur",
      taluk: "thanjavur",
      district: "thanjavur",
      surveyNo: { "surveyNo-first": "1" },
      landType: "option-1",
      farmerType: "option-2",
      waterType: "option-2",
      animals: "மாடு",
      groupMember: "yes",
      qualification: "MBBS",
    },
  },
  searchFilter: "",
  sortFilter: NORMAL,
  currentPage: 1,
  pageCount: 0,
  totalPageCount: 0,
};

const mdDetailsSlice = createSlice({
  name: "mdDetails",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload.pageCount;
      state.totalPageCount = action.payload.totalPageCount;
    },
  },
});

export const mdDetailActions = mdDetailsSlice.actions;
export const mdDetailsReducer = mdDetailsSlice.reducer;
