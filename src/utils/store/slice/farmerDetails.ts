import { createSlice } from "@reduxjs/toolkit";
import { NORMAL, SortOrder } from "../../constants";

type farmerDetail = {
  membershipId?: string;
  profile: string;
  id: string;
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
  landAreaInCent?: string;
  irrigationType?: string;
  cropsType?: string;
  cattle?: string;
  smallOrMarginalFarmer?: string;
};

//Group filter value
export const DEFAULT_GROUP_FILTER = "all";

export type selectedFarmer = number | string;

interface FarmerDetailsContextType {
  farmersDetailsById: { [id: string]: farmerDetail };
  searchFilter: string;
  isFarmerDetailsDataSet: boolean;
  sortFilter: SortOrder;
  farmerId: selectedFarmer[];
  selectedFarmers: selectedFarmer[];
  groupFilter: string;
  currentPage: number;
  pageCount: number;
  totalPageCount: number;
  farmersIdToExport: [];
}

const initialState: FarmerDetailsContextType = {
  farmersDetailsById: {},
  searchFilter: "",
  isFarmerDetailsDataSet: false,
  sortFilter: NORMAL,
  farmerId: [],
  selectedFarmers: [],
  groupFilter: DEFAULT_GROUP_FILTER,
  currentPage: 1,
  pageCount: 0,
  totalPageCount: 0,
  farmersIdToExport: [],
};

const farmerDetailsSlice = createSlice({
  name: "farmerDetails",
  initialState,
  reducers: {
    addFarmerId: (state, action) => {
      state.farmerId = [...action.payload];
    },

    addFarmerDetails: (state, action) => {
      delete action.payload.farmerId;
      state.farmersDetailsById = { ...action.payload, ...state.farmersDetailsById };
      state.isFarmerDetailsDataSet = true;
    },

    editFarmerDetail: (state, action) => {
      const updateData = action.payload.farmerId ? { ...action.payload, id: action.payload.farmerId } : action.payload;
      action.payload.farmerId ? delete updateData.farmerId : delete action.payload.farmerId;
      state.farmersDetailsById = { ...state.farmersDetailsById, [updateData.id]: updateData };
    },

    deleteFarmerDetail: (state, action) => {
      delete state.farmersDetailsById[action.payload];
      state.farmersDetailsById = { ...state.farmersDetailsById };
    },

    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload;
    },

    checkboxSelectAll: (state) => {
      if (state.selectedFarmers.length === state.farmerId.length) {
        state.selectedFarmers = [];
      } else {
        state.selectedFarmers = state.farmerId;
      }
    },

    checkBoxUnselectAll: (state) => {
      state.selectedFarmers = [];
    },

    checkBoxSelect: (state, action) => {
      let farmerId = action.payload;
      if (state.selectedFarmers.includes(farmerId)) {
        state.selectedFarmers = state.selectedFarmers.filter((id) => id !== farmerId);
      } else {
        state.selectedFarmers = [...state.selectedFarmers, farmerId];
      }
    },

    setSortFilter: (state, action) => {
      state.sortFilter = action.payload;
    },

    setGroupFilter: (state, action) => {
      state.groupFilter = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageCount: (state, action) => {
      state.pageCount = action.payload.pageCount;
      state.totalPageCount = action.payload.totalPageCount;
    },
    setFarmersIdToExport: (state, action) => {
      state.farmersIdToExport = action.payload;
    },
  },
});

 const {
  addFarmerDetails,
  editFarmerDetail,
  deleteFarmerDetail,
  setSearchFilter,
  setSortFilter,
  checkboxSelectAll,
  checkBoxUnselectAll,
  setGroupFilter,
  checkBoxSelect,
  addFarmerId,
  setCurrentPage,
  setPageCount,
  setFarmersIdToExport,
} = farmerDetailsSlice.actions;

export const farmerDetailsReducer = farmerDetailsSlice.reducer;

