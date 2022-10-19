import { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/nerkathir-user.svg";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
const ADD_MD_DETAIL = "ADD_MD_DETAIL";
const EDIT_MD_DETAIL = "EDIT_MD_DETAIL";
const DELETE_MD_DETAIL = "DELETE_MD_DETAIL";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";

export type mdDetail = {
  // id: string;
  // name: string;
  // phoneNumber: string;
  // qualification?: string;
  // profile: string;
  // dob: string;
  // signature?: string;
  // farmerId?: string;
  // membershipId?: string;
  // isChecked?: boolean;
  // fatherName?: string;
  // sex?: string;
  // spouseName?: string;
  // group?: string;
  // addhaarNo?: string;
  // surveyNo?: { [key: string]: string };
  // acre?: { [key: string]: string };
  // border?: { [key: string]: string };
  // village?: string;
  // postalNo?: string;
  // address?: string;
  // taluk?: string;
  // district?: string;
  // landType?: string;
  // farmerType?: string;
  // waterType?: string;
  // animals?: string;
  // groupMember?: string;
  membershipId?: string;
  profile: string;
  // isChecked?: boolean;
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
  farmerId?: string;
};

export type selectedMdListData = number | string;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface mdDetailsContextType {
  mdDetailsById: { [id: string]: mdDetail };
  searchFilter: string;
  sortFilter: SortOrder;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  addMdDetail: (data: mdDetail) => void;
  editMdDetail: (data: mdDetail) => void;
  deleteMdDetail: (id: string) => void;
  editTableIcon: (data: any) => void;
  checkboxSelect: (id: string | {}) => void;
}

const initialState: mdDetailsContextType = {
  mdDetailsById: {
    "1": {
      id: "1",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "10-08-1996",
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
      qualification: "B.E, Mechanical",
      farmerId: "1",
    },
    "2": {
      id: "2",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Sethu Ravichandran",
      phoneNumber: "8968456734",
      group: "விவசாயிகள் சங்கம்-3",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "01-01-1994",
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
      qualification: "B.E, ECE",
      farmerId: "2",
    },
    "3": {
      id: "3",
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
      farmerId: "3",
    },
    "4": {
      id: "4",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Raj",
      phoneNumber: "7845673879",
      group: "விவசாயிகள் சங்கம்-1",
      fatherName: "cholan",
      sex: "male",
      spouseName: "nil",
      dob: "05-08-1998",
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
      qualification: "MBBS",
      farmerId: "4",
    },
  },
  searchFilter: "",
  sortFilter: NORMAL,
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addMdDetail: () => {},
  editMdDetail: () => {},
  deleteMdDetail: () => {},
  editTableIcon: () => {},
  checkboxSelect: () => {},
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_MD_DETAIL:
      return { ...state, mdDetailsById: { ...state.mdDetailsById, [action.payload.id]: action.payload } };

    case EDIT_MD_DETAIL:
      return { ...state, mdDetailsById: { ...state.mdDetailsById, [action.payload.id]: action.payload } };

    case DELETE_MD_DETAIL:
      delete state.mdDetailsById[action.payload];
      return { ...state, mdDetailsById: { ...state.mdDetailsById } };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    case CHECKBOX_SELECT:
      return { ...state, mdDetailsById: { ...action.payload, ...state.mdDetailsById } };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const mdDetailsContext = createContext<mdDetailsContextType>(initialState);

const MdDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMdDetail = (data: mdDetail) => {
    dispatch({ type: ADD_MD_DETAIL, payload: data });
  };

  const editMdDetail = (data: mdDetail) => {
    dispatch({ type: EDIT_MD_DETAIL, payload: data });
  };

  const deleteMdDetail = (id: string) => {
    dispatch({ type: DELETE_MD_DETAIL, payload: id });
  };

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  const setSortFilter = (sortOrder: SortOrder) => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  const checkboxSelect = (id: string | {}) => {
    dispatch({ type: CHECKBOX_SELECT, payload: id });
  };

  let data = {
    ...state,
    addMdDetail,
    editMdDetail,
    deleteMdDetail,
    setSearchFilter,
    setSortFilter,
    checkboxSelect,
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
