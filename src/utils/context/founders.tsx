import { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
const ADD_FOUNDERS = "ADD_FOUNDERS";
const EDIT_FOUNDERS = "EDIT_FOUNDERS";
const DELETE_FOUNDERS = "DELETE_FOUNDERS";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const SET_FOUNDER_QUERY = "SET_FOUNDER_QUERY";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_PAGE_COUNT = "SET_PAGE_COUNT";

export type Founders = {
  id: string;
  name: string;
  phoneNumber: string;
  qualification: string;
  profile: string;
  dob: string;
  description?: string;
  joinDate?: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

type updatedCountType = {
  pageCount: number;
  totalPageCount: number;
};

export interface FoundersContextType {
  foundersById: { [id: string]: Founders };
  searchFilter: string;
  sortFilter: SortOrder;
  founderQuery: string;
  currentPage: number;
  pageCount: number;
  totalPageCount: number;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  addFounder: (data: Founders) => void;
  editFounder: (data: Founders) => void;
  deleteFounder: (id: string) => void;
  setFounderQuery: (data: string) => void;
  setCurrentPage: (value: number) => void;
  setPageCount: (value: updatedCountType) => void;
}

const initialState: FoundersContextType = {
  foundersById: {
    a: {
      id: "a",
      profile: "",
      name: "Veera Raghavan",
      phoneNumber: "9945672156",
      qualification: "BBA, MBA",
      dob: "01-10-1982",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    b: {
      id: "b",
      profile: "",
      name: "John Durairaj",
      phoneNumber: "8610010875",
      qualification: "BA",
      dob: "27-01-1990",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    c: {
      id: "c",
      profile: "",
      name: "Vijay Kumar",
      phoneNumber: "8968456734",
      qualification: "BCom CA",
      dob: "09-11-1989",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    d: {
      id: "d",
      profile: "",
      name: "Kathiresan",
      phoneNumber: "8838461839",
      qualification: "BSc, Computer Science",
      dob: "12-10-1994",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    e: {
      id: "e",
      profile: "",
      name: "Jeevanandham",
      phoneNumber: "9854367213",
      qualification: "B.Tech, Information Technology",
      dob: "02-08-1992",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
    f: {
      id: "f",
      profile: "",
      name: "Arockiyaraj Reddy",
      phoneNumber: "9945672156",
      qualification: "B.Tech, Computer Science",
      dob: "12-07-1985",
      description: "Cultivates land",
      joinDate: "mar 16,2022",
    },
  },
  searchFilter: "",
  sortFilter: NORMAL,
  founderQuery: "",
  currentPage: 1,
  pageCount: 0,
  totalPageCount: 0,
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addFounder: () => {},
  editFounder: () => {},
  deleteFounder: () => {},
  setFounderQuery: () => {},
  setCurrentPage: () => {},
  setPageCount: () => {},
};

const reducer = (state: FoundersContextType, action: any) => {
  switch (action.type) {
    case ADD_FOUNDERS:
      return { ...state, foundersById: { [action.payload.id]: action.payload, ...state.foundersById } };

    case EDIT_FOUNDERS:
      return { ...state, foundersById: { ...state.foundersById, [action.payload.id]: action.payload } };

    case DELETE_FOUNDERS:
      delete state.foundersById[action.payload];
      return { ...state, foundersById: { ...state.foundersById } };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };

    case SET_PAGE_COUNT:
      return { ...state, pageCount: action.payload.pageCount, totalPageCount: action.payload.totalPageCount };

    case SET_FOUNDER_QUERY:
      return { ...state, founderQuery: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const foundersContext = createContext<FoundersContextType>(initialState);

const FoundersContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFounder = (data: Founders) => {
    dispatch({ type: ADD_FOUNDERS, payload: data });
  };

  const editFounder = (data: Founders) => {
    dispatch({ type: EDIT_FOUNDERS, payload: data });
  };

  const deleteFounder = (id: string) => {
    dispatch({ type: DELETE_FOUNDERS, payload: id });
  };

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  const setSortFilter = (sortOrder: SortOrder) => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };
  const setCurrentPage = (pageNo: number) => {
    dispatch({ type: SET_CURRENT_PAGE, payload: pageNo });
  };
  const setPageCount = (updatePageCount: { pageCount: number; totalPageCount: number }) => {
    dispatch({ type: SET_PAGE_COUNT, payload: updatePageCount });
  };
  const setFounderQuery = (query: string) => {
    dispatch({ type: SET_FOUNDER_QUERY, payload: query });
  };

  let data = {
    ...state,
    addFounder,
    editFounder,
    deleteFounder,
    setSearchFilter,
    setSortFilter,
    setFounderQuery,
    setCurrentPage,
    setPageCount,
  };

  return <foundersContext.Provider value={data}>{props.children}</foundersContext.Provider>;
};

const useFounderContext = () => useContext(foundersContext);

export { FoundersContextProvider, useFounderContext };
