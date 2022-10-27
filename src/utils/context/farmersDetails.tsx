import React, { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";
import profileImg from "../../assets/images/nerkathir-user.svg";

//ACTION TYPES
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
};

export type selectedFarmer = number | string;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersDetailsById: { [id: string]: farmerDetail };
  searchFilter: string;
  sortFilter: SortOrder;
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
  farmersDetailsById: {
    a: {
      id: "a",
      membershipId: "NER-FPC-2",
      profile: profileImg,
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
      membershipId: "NER-FPC-2",
      profile: profileImg,
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
      membershipId: "NER-FPC-2",
      profile: profileImg,
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
      membershipId: "NER-FPC-2",
      profile: profileImg,
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
    e: {
      id: "e",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Praveen",
      phoneNumber: "8967456745",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "12-10-1989",
      addhaarNo: "900786545687",
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
      qualification: "B.Sc, Agri",
    },
    f: {
      id: "f",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Karikalan",
      phoneNumber: "9867896778",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "01-03-1994",
      addhaarNo: "565623327856",
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
      qualification: "B.E, IT",
    },
    g: {
      id: "g",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Thiru",
      phoneNumber: "9090879087",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "Pandiyan",
      sex: "male",
      spouseName: "nil",
      dob: "11-11-1997",
      addhaarNo: "765678568956",
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
      qualification: "B.Sc-Computer Science",
    },
    h: {
      id: "h",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Vanthiyadevan",
      phoneNumber: "9867896778",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "Raja",
      sex: "male",
      spouseName: "nil",
      dob: "01-01-1990",
      addhaarNo: "408090746312",
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
      qualification: "B.E, IT",
    },
    i: {
      id: "i",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Nandhini",
      phoneNumber: "7890784567",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "01-03-1994",
      addhaarNo: "565623327856",
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
      qualification: "B.E, IT",
    },
    j: {
      id: "j",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Kundavai",
      phoneNumber: "9867896778",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "01-03-1994",
      addhaarNo: "565623327856",
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
      qualification: "B.E, IT",
    },
  },
  searchFilter: "",
  sortFilter: NORMAL,
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
