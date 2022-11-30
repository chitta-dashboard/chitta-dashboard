import { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PAGE_COUNT = "SET_PAGE_COUNT";

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

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface mdDetailsContextType {
  mdDetailsById: { [id: string]: IMdDetails };
  searchFilter: string;
  sortFilter: SortOrder;
  currentPage: number;
  pageCount: number;
  totalPageCount: number;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  checkboxSelect: (id: string | {}) => void;
  setCurrentPage: (pageNo: number) => void;
  setPageCount: (updatePageCount: { pageCount: number; totalPageCount: number }) => void;
}

const initialState: mdDetailsContextType = {
  mdDetailsById: {},
  searchFilter: "",
  sortFilter: NORMAL,
  currentPage: 1,
  pageCount: 0,
  totalPageCount: 0,
  setSortFilter: () => {},
  setSearchFilter: () => {},
  checkboxSelect: () => {},
  setCurrentPage: () => {},
  setPageCount: () => {},
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    case CHECKBOX_SELECT:
      return { ...state, mdDetailsById: { ...action.payload, ...state.mdDetailsById } };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case SET_PAGE_COUNT:
      return { ...state, pageCount: action.payload.pageCount, totalPageCount: action.payload.totalPageCount };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const mdDetailsContext = createContext<mdDetailsContextType>(initialState);

const MdDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  const setSortFilter = (sortOrder: SortOrder) => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  const checkboxSelect = (id: string | {}) => {
    dispatch({ type: CHECKBOX_SELECT, payload: id });
  };

  const setCurrentPage = (pageNo: number) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: pageNo });
  };

  const setPageCount = (updatePageCount: { pageCount: number; totalPageCount: number }) => {
    dispatch({ type: SET_PAGE_COUNT, payload: updatePageCount });
  };

  let data = {
    ...state,
    setSearchFilter,
    setSortFilter,
    checkboxSelect,
    setCurrentPage,
    setPageCount,
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
