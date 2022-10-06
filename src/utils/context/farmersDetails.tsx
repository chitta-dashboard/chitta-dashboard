import React, { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/nerkathir-user.svg";

//ACTION TYPES
const ADD_FARMER_DETAIL = "ADD_FARMER_DETAIL";
const EDIT_FARMER_DETAIL = "EDIT_FARMER_DETAIL";
const DELETE_FARMER_DETAIL = "DELETE_FARMER_DETAIL";
const EDIT_TABLE_ICON = "EDIT_TABLE_ICON";
const SET_PAGE = "SET_PAGE";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT_ALL = "CHECKBOX_SELECT_ALL";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";
const SELECT_FILTER = "SELECT_FILTER";

export type farmerDetail = {
  membershipId?: string;
  profile?: string;
  isChecked?: boolean;
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
  education: string;
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
};

export type selectedFarmer = number | string;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersList: farmerDetail[];
  page: number;
  rowsPerPage: number;
  searchFilter: string;
  sortFilter: "ascending" | "descending";
  setSortFilter: (sortOrder: "ascending" | "descending") => void;
  setSearchFilter: (searchText: string) => void;
  selectedFarmers: selectedFarmer[];
  addFarmerDetail: (data: farmerDetail) => void;
  editFarmerDetail: (data: farmerDetail) => void;
  deleteFarmerDetail: (id: string) => void;
  editTableIcon: (data: farmerDetail) => void;
  setPage: (page: number) => void;
  checkboxSelectAll: () => void;
  checkboxSelect: (id: string | number) => void;
  groupFilter: string;
  setGroupFilter: (selectGroup: string) => void;
}

const initialState: farmerDetailsContextType = {
  farmersList: [
    {
      id: "1",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      acre: {},
      border: {},
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: {},
      landType: "",
      farmerType: "",
      waterType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "2",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Sethu Ravichandran",
      phoneNumber: "8968456734",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      acre: {},
      border: {},
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: {},
      landType: "",
      farmerType: "",
      waterType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "3",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Vijay",
      phoneNumber: "9001237654",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      acre: {},
      border: {},
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: {},
      landType: "",
      farmerType: "",
      waterType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "4",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Muthu",
      phoneNumber: "7845673879",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      acre: {},
      border: {},
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: {},
      landType: "",
      farmerType: "",
      waterType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "5",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Praveen",
      phoneNumber: "8967456745",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      acre: {},
      border: {},
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: {},
      landType: "",
      farmerType: "",
      waterType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "6",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Samy",
      phoneNumber: "9867896778",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      acre: {},
      border: {},
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: {},
      landType: "",
      farmerType: "",
      waterType: "",
      animals: "",
      groupMember: "",
    },
  ],
  page: 1,
  rowsPerPage: 6,
  searchFilter: "",
  sortFilter: "ascending",
  setSortFilter: () => {},
  setSearchFilter: () => {},
  selectedFarmers: [],
  addFarmerDetail: () => {},
  editFarmerDetail: () => {},
  deleteFarmerDetail: () => {},
  editTableIcon: () => {},
  setPage: () => {},
  checkboxSelectAll: () => {},
  checkboxSelect: () => {},
  groupFilter: "all",
  setGroupFilter: () => {},
};

const reducer = (state: farmerDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_FARMER_DETAIL:
      return { ...state, farmersList: [...state.farmersList, action.payload] };
    case EDIT_FARMER_DETAIL:
      const updatedfarmerDetailList = action.payload;
      const editfarmerDetailList = state.farmersList.map((list) => {
        if (list.id === updatedfarmerDetailList.id) {
          return updatedfarmerDetailList;
        }
        return list;
      });
      return {
        ...state,
        farmersList: editfarmerDetailList,
      };
    case DELETE_FARMER_DETAIL:
      return { ...state, farmersList: state.farmersList.filter((list) => list.id !== action.payload) };
    case EDIT_TABLE_ICON:
      let data = state.farmersList.filter((item) => item.id !== action.payload.id);
      return { ...state, farmersList: [...data, action.payload] };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };
    case CHECKBOX_SELECT_ALL:
      if (state.selectedFarmers.length === state.farmersList.length) {
        return {
          ...state,
          selectedFarmers: [],
        };
      } else {
        return {
          ...state,
          selectedFarmers: [...state.farmersList.map((user) => user.id)],
        };
      }

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

    case SELECT_FILTER:
      return { ...state, groupFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmerDetailsContext = createContext<farmerDetailsContextType>(initialState);

const FarmerDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
  const setPage = (page: number) => {
    dispatch({ type: SET_PAGE, payload: page });
  };
  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };
  const setSortFilter = (sortOrder: "ascending" | "descending") => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };
  const setGroupFilter = (selectGroup: string) => {
    dispatch({ type: SELECT_FILTER, payload: selectGroup });
  };
  const checkboxSelectAll = () => {
    dispatch({ type: CHECKBOX_SELECT_ALL });
  };
  const checkboxSelect = (id: string | number) => {
    dispatch({ type: CHECKBOX_SELECT, payload: id });
  };

  let data = {
    ...state,
    addFarmerDetail,
    editFarmerDetail,
    deleteFarmerDetail,
    editTableIcon,
    setPage,
    setSearchFilter,
    setSortFilter,
    checkboxSelectAll,
    checkboxSelect,
    setGroupFilter,
  };

  return <farmerDetailsContext.Provider value={data}>{props.children}</farmerDetailsContext.Provider>;
};

const useFarmerDetailsContext = () => useContext(farmerDetailsContext);

export { FarmerDetailsContextProvider, useFarmerDetailsContext };
