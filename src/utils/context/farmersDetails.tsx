import React, { createContext, FC, useContext, useReducer } from "react";
import { boolean } from "yup";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT_ALL = "CHECKBOX_SELECT_ALL";
const CHECKBOX_UNSELECT_ALL = "CHECKBOX_UNSELECT_ALL";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";
const GROUP_FILTER = "GROUP_FILTER";
const ADD_FARMER_ID = "ADD_FARMER_ID";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PAGE_COUNT = "SET_PAGE_COUNT";
const SET_FARMERS_ID_TO_EXPORT = "SET_FARMERS_ID_TO_EXPORT";
const SET_FARMER_QUERY = "SET_FARMER_QUERY";
const SET_FARMER_BANK_DETAIL = "SET_FARMER_BANK_DETAIL";

//Group filter value
export const DEFAULT_GROUP_FILTER = "all";

export type farmerDetail = {
  membershipId: string;
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
  nameAsPerBank?: string;
  bankName?: string;
  accountNumber?: string;
  confirmAccountNumber?: string;
  ifscCode?: string;
};

export type selectedFarmer = number | string;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersDetailsById: { [id: string]: farmerDetail };
  searchFilter: string;
  sortFilter: SortOrder;
  farmerId: selectedFarmer[];
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  selectedFarmers: selectedFarmer[];
  checkboxSelectAll: () => void;
  checkboxUnselectAll: () => void;
  checkboxSelect: (id: string | number) => void;
  groupFilter: string;
  setGroupFilter: (selectGroup: string) => void;
  addFarmerId: (id: string[] | number[]) => void;
  currentPage: number;
  pageCount: number;
  totalPageCount: number;
  farmersIdToExport: [];
  farmerQuery: string;
  setCurrentPage: (pageNo: number) => void;
  setPageCount: (updatePageCount: { pageCount: number; totalPageCount: number }) => void;
  setFarmersIdToExport: (id: string[] | number[]) => void;
  setFarmerQuery: (query: string) => void;
  farmerBankDetail: boolean;
  setFarmerBankDetail: (value: boolean) => void;
}

const initialState: farmerDetailsContextType = {
  farmersDetailsById: {},
  searchFilter: "",
  sortFilter: NORMAL,
  farmerId: [],
  setSortFilter: () => {},
  setSearchFilter: () => {},
  selectedFarmers: [],
  checkboxSelectAll: () => {},
  checkboxUnselectAll: () => {},
  checkboxSelect: () => {},
  groupFilter: DEFAULT_GROUP_FILTER,
  setGroupFilter: () => {},
  addFarmerId: () => {},
  currentPage: 1,
  pageCount: 0,
  totalPageCount: 0,
  farmersIdToExport: [],
  farmerQuery: "",
  setCurrentPage: () => {},
  setPageCount: () => {},
  setFarmersIdToExport: () => {},
  setFarmerQuery: () => {},
  farmerBankDetail: false,
  setFarmerBankDetail: boolean,
};

const reducer = (state: farmerDetailsContextType, action: any) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case CHECKBOX_SELECT_ALL:
      if (state.selectedFarmers.length === state.farmerId.length) {
        return {
          ...state,
          selectedFarmers: [],
        };
      } else {
        return {
          ...state,
          selectedFarmers: state.farmerId,
        };
      }

    case CHECKBOX_UNSELECT_ALL:
      return {
        ...state,
        selectedFarmers: [],
      };

    case CHECKBOX_SELECT:
      let farmerId = action.payload;
      if (state.selectedFarmers.includes(farmerId)) {
        return {
          ...state,
          selectedFarmers: state.selectedFarmers.filter((id) => id !== farmerId),
        };
      } else {
        return {
          ...state,
          selectedFarmers: [...state.selectedFarmers, farmerId],
        };
      }

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    case GROUP_FILTER:
      return { ...state, groupFilter: action.payload };

    case ADD_FARMER_ID:
      return { ...state, farmerId: [...action.payload] };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case SET_PAGE_COUNT:
      return { ...state, pageCount: action.payload.pageCount, totalPageCount: action.payload.totalPageCount };

    case SET_FARMERS_ID_TO_EXPORT:
      return { ...state, farmerId: action.payload };

    case SET_FARMER_QUERY:
      return { ...state, farmerQuery: action.payload };

    case SET_FARMER_BANK_DETAIL:
      return { ...state, farmerBankDetail: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmerDetailsContext = createContext<farmerDetailsContextType>(initialState);

const FarmerDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  const setSortFilter = (sortOrder: SortOrder) => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  const setGroupFilter = (selectGroup: string) => {
    dispatch({ type: GROUP_FILTER, payload: selectGroup });
  };

  const checkboxSelectAll = () => {
    dispatch({ type: CHECKBOX_SELECT_ALL });
  };

  const checkboxUnselectAll = () => {
    dispatch({ type: CHECKBOX_UNSELECT_ALL });
  };

  const checkboxSelect = (id: string | number) => {
    dispatch({ type: CHECKBOX_SELECT, payload: id });
  };

  const addFarmerId = (id: string[] | number[]) => {
    dispatch({ type: ADD_FARMER_ID, payload: id });
  };

  const setCurrentPage = (pageNo: number) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: pageNo });
  };

  const setPageCount = (updatePageCount: { pageCount: number; totalPageCount: number }) => {
    dispatch({ type: SET_PAGE_COUNT, payload: updatePageCount });
  };

  const setFarmersIdToExport = (id: string[] | number[]) => {
    dispatch({ type: SET_FARMERS_ID_TO_EXPORT, payload: id });
  };

  const setFarmerQuery = (query: string) => {
    dispatch({ type: SET_FARMER_QUERY, payload: query });
  };

  const setFarmerBankDetail = (value: boolean) => {
    dispatch({ type: SET_FARMER_BANK_DETAIL, payload: value });
  };

  let data = {
    ...state,
    setSearchFilter,
    setSortFilter,
    checkboxSelectAll,
    checkboxUnselectAll,
    checkboxSelect,
    setGroupFilter,
    addFarmerId,
    setCurrentPage,
    setPageCount,
    setFarmersIdToExport,
    setFarmerQuery,
    setFarmerBankDetail,
  };

  return <farmerDetailsContext.Provider value={data}>{props.children}</farmerDetailsContext.Provider>;
};

const useFarmerDetailsContext = () => useContext(farmerDetailsContext);

export { FarmerDetailsContextProvider, useFarmerDetailsContext };
