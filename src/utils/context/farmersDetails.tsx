import React, { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
const GET_FARMERS_DETAILS = "GET_FARMERS_DETAILS";
const SET_LOADER = "SET_LOADER";
const ADD_FARMER_DETAIL = "ADD_FARMER_DETAIL";
const EDIT_FARMER_DETAIL = "EDIT_FARMER_DETAIL";
const DELETE_FARMER_DETAIL = "DELETE_FARMER_DETAIL";
const EDIT_TABLE_ICON = "EDIT_TABLE_ICON";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT_ALL = "CHECKBOX_SELECT_ALL";
const CHECKBOX_UNSELECT_ALL = "CHECKBOX_UNSELECT_ALL";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";
const GROUP_FILTER = "GROUP_FILTER";

//Group filter value
export const DEFAULT_GROUP_FILTER = "all";

export type farmerDetail = {
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

export type selectedFarmer = number | string;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersDetailsById: { [id: string]: farmerDetail };
  searchFilter: string;
  sortFilter: SortOrder;
  isLoader: boolean;
  getFarmersDetailsData: (data: farmerDetail) => void;
  setLoader: (loading: boolean) => void;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  selectedFarmers: selectedFarmer[];
  addFarmerDetail: (data: farmerDetail) => void;
  editFarmerDetail: (data: farmerDetail) => void;
  deleteFarmerDetail: (id: string) => void;
  editTableIcon: (data: farmerDetail) => void;
  checkboxSelectAll: () => void;
  checkboxUnselectAll: () => void;
  checkboxSelect: (id: string | number) => void;
  groupFilter: string;
  setGroupFilter: (selectGroup: string) => void;
}

const initialState: farmerDetailsContextType = {
  farmersDetailsById: {},
  searchFilter: "",
  sortFilter: NORMAL,
  isLoader: true,
  getFarmersDetailsData: () => {},
  setLoader: () => {},
  setSortFilter: () => {},
  setSearchFilter: () => {},
  selectedFarmers: [],
  addFarmerDetail: () => {},
  editFarmerDetail: () => {},
  deleteFarmerDetail: () => {},
  editTableIcon: () => {},
  checkboxSelectAll: () => {},
  checkboxUnselectAll: () => {},
  checkboxSelect: () => {},
  groupFilter: DEFAULT_GROUP_FILTER,
  setGroupFilter: () => {},
};

const reducer = (state: farmerDetailsContextType, action: any) => {
  switch (action.type) {
    case GET_FARMERS_DETAILS:
      return { ...state, farmersDetailsById: action.payload };

    case SET_LOADER:
      return { ...state, isLoader: action.payload };

    case ADD_FARMER_DETAIL:
      delete action.payload.farmerId;
      return { ...state, farmersDetailsById: { [action.payload.id]: action.payload, ...state.farmersDetailsById } };

    case EDIT_FARMER_DETAIL:
      const updateData = action.payload.farmerId ? { ...action.payload, id: action.payload.farmerId } : action.payload;
      action.payload.farmerId ? delete updateData.farmerId : delete action.payload.farmerId;
      return { ...state, farmersDetailsById: { ...state.farmersDetailsById, [updateData.id]: updateData } };

    case DELETE_FARMER_DETAIL:
      delete state.farmersDetailsById[action.payload];
      return { ...state, farmersDetailsById: { ...state.farmersDetailsById } };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case CHECKBOX_SELECT_ALL:
      if (Object.values(state.selectedFarmers).length === Object.values(state.farmersDetailsById).length) {
        return {
          ...state,
          selectedFarmers: [],
        };
      } else {
        return {
          ...state,
          selectedFarmers: [...Object.keys(state.farmersDetailsById)],
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

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmerDetailsContext = createContext<farmerDetailsContextType>(initialState);

const FarmerDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getFarmersDetailsData = (data: farmerDetail) => {
    dispatch({ type: GET_FARMERS_DETAILS, payload: data });
  };

  const setLoader = (loading: boolean) => {
    dispatch({ type: SET_LOADER, payload: loading });
  };

  const addFarmerDetail = (data: farmerDetail) => {
    dispatch({ type: ADD_FARMER_DETAIL, payload: data });
  };

  const editFarmerDetail = (data: farmerDetail) => {
    dispatch({ type: EDIT_FARMER_DETAIL, payload: data });
  };

  const deleteFarmerDetail = (id: string) => {
    dispatch({ type: DELETE_FARMER_DETAIL, payload: id });
  };

  const editTableIcon = (data: farmerDetail) => {
    dispatch({ type: EDIT_TABLE_ICON, payload: data });
  };

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

  let data = {
    ...state,
    getFarmersDetailsData,
    setLoader,
    addFarmerDetail,
    editFarmerDetail,
    deleteFarmerDetail,
    editTableIcon,
    setSearchFilter,
    setSortFilter,
    checkboxSelectAll,
    checkboxUnselectAll,
    checkboxSelect,
    setGroupFilter,
  };

  return <farmerDetailsContext.Provider value={data}>{props.children}</farmerDetailsContext.Provider>;
};

const useFarmerDetailsContext = () => useContext(farmerDetailsContext);

export { FarmerDetailsContextProvider, useFarmerDetailsContext };
