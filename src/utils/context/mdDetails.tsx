import { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
const GET_MD_DETAIL = "GET_MD_DETAIL";
const SET_LOADER = "SET_LOADER";
const EDIT_MD_DETAIL = "EDIT_MD_DETAIL";
const DELETE_MD_DETAIL = "DELETE_MD_DETAIL";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";

export type mdDetail = {
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
};

export type selectedMdListData = number | string;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface mdDetailsContextType {
  mdDetailsById: { [id: string]: mdDetail };
  searchFilter: string;
  sortFilter: SortOrder;
  isLoader: boolean;
  getMdDetailsData: (data: mdDetail) => void;
  setLoader: (loading: boolean) => void;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  editMdDetail: (data: mdDetail) => void;
  deleteMdDetail: (id: string) => void;
  editTableIcon: (data: any) => void;
  checkboxSelect: (id: string | {}) => void;
}

const initialState: mdDetailsContextType = {
  mdDetailsById: {},
  searchFilter: "",
  sortFilter: NORMAL,
  isLoader: true,
  getMdDetailsData: () => {},
  setLoader: () => {},
  setSortFilter: () => {},
  setSearchFilter: () => {},
  editMdDetail: () => {},
  deleteMdDetail: () => {},
  editTableIcon: () => {},
  checkboxSelect: () => {},
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case GET_MD_DETAIL:
      return { ...state, mdDetailsById: action.payload };

    case SET_LOADER:
      return { ...state, isLoader: action.payload };

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

  const getMdDetailsData = (data: mdDetail) => {
    dispatch({ type: GET_MD_DETAIL, payload: data });
  };

  const setLoader = (loading: boolean) => {
    dispatch({ type: SET_LOADER, payload: loading });
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
    getMdDetailsData,
    setLoader,
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
