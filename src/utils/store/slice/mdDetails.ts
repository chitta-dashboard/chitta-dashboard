import { createSlice } from "@reduxjs/toolkit";
import { NORMAL, SortOrder } from "../../constants";

 interface IMdDetails {
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

 interface IMdDetailsSlice {
  mdDetailsById: { [id: string]: IMdDetails };
  searchFilter: string;
  sortFilter: SortOrder;
  currentPage: number;
  pageCount: number;
  totalPageCount: number;
}

const initialState: IMdDetailsSlice = {
  mdDetailsById: {},
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

 const mdDetailActions = mdDetailsSlice.actions;
export const mdDetailsReducer = mdDetailsSlice.reducer;
