import { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";
import { searchWord } from "../constants";

//ACTION TYPES
const ADD_MD_DETAIL = "ADD_MD_DETAIL";
const EDIT_MD_DETAIL = "EDIT_MD_DETAIL";
const DELETE_MD_DETAIL = "DELETE_MD_DETAIL";
const FILTER_MD_DETAIL = "FILTER_MD_DETAIL";
const EDIT_TABLE_ICON = "EDIT_TABLE_ICON";
const SET_PAGE = "SET_PAGE";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";

export type mdDetail = {
  id: string;
  name: string;
  phoneNumber: string;
  qualification: string;
  profile?: string;
  dob: string;
  signature?: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface mdDetailsContextType {
  mdList: mdDetail[];
  page: number;
  rowsPerPage: number;
  searchFilter: string;
  sortFilter: "ascending" | "descending";
  setSortFilter: (sortOrder: "ascending" | "descending") => void;
  setSearchFilter: (searchText: string) => void;
  addMdDetail: (data: mdDetail) => void;
  editMdDetail: (data: mdDetail) => void;
  deleteMdDetail: (id: string) => void;
  filterMdDetail: (name: string) => void;
  editTableIcon: (data: any) => void;
  setPage: (page: number) => void;
}

const initialState: mdDetailsContextType = {
  mdList: [
    {
      id: "1",
      profile: profileImg,
      name: "Aditha Karikalan",
      phoneNumber: "9945672156",
      qualification: "BBA, MBA",
      dob: "1982-10-01",
      signature: "",
    },
    {
      id: "2",
      profile: profileImg,
      name: "Arulmozhi Varman",
      phoneNumber: "8610010875",
      qualification: "BA",
      dob: "1990-01-27",
      signature: "",
    },
    {
      id: "3",
      profile: profileImg,
      name: "Nandini",
      phoneNumber: "8968456734",
      qualification: "BCom CA",
      dob: "1989-11-09",
      signature: "",
    },
    {
      id: "4",
      profile: profileImg,
      name: "Vanthiyathevan ",
      phoneNumber: "8838461839",
      qualification: "BSc, Computer Science",
      dob: "1994-10-12",
      signature: "",
    },
    {
      id: "5",
      profile: profileImg,
      name: "Kundavai",
      phoneNumber: "9854367213",
      qualification: "B.Tech, Information Technology",
      dob: "1992-08-02",
      signature: "",
    },
    {
      id: "6",
      profile: profileImg,
      name: "Rajendran Cholan",
      phoneNumber: "9945672156",
      qualification: "B.Tech, Computer Science",
      dob: "1985-07-12",
      signature: "",
    },
  ],
  page: 1,
  rowsPerPage: 6,
  searchFilter: "",
  sortFilter: "ascending",
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addMdDetail: () => {},
  editMdDetail: () => {},
  deleteMdDetail: () => {},
  editTableIcon: () => {},
  filterMdDetail: () => {},
  setPage: () => {},
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_MD_DETAIL:
      return { ...state, mdList: [...state.mdList, action.payload] };

    case EDIT_MD_DETAIL:
      const updatedMdDetail = action.payload;
      const editMdDetails = state.mdList.map((list) => {
        if (list.id === updatedMdDetail.id) {
          return updatedMdDetail;
        }
        return list;
      });
      return {
        ...state,
        mdList: editMdDetails,
      };

    case DELETE_MD_DETAIL:
      return { ...state, mdList: state.mdList.filter((list) => list.id !== action.payload) };

    case FILTER_MD_DETAIL:
      return {
        ...state,
        mdList: initialState.mdList.filter((md) => {
          return searchWord(md.name as string, action.payload);
        }),
      };

    case EDIT_TABLE_ICON:
      let data = state.mdList.filter((item) => item.id !== action.payload.id);
      return { ...state, mdList: [...data, action.payload] };
    case SET_PAGE:
      return { ...state, page: action.payload };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const foundersContext = createContext<mdDetailsContextType>(initialState);

const FoundersContextProvider: FC<Props> = (props) => {
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
  const filterMdDetail = (name: string) => {
    dispatch({ type: FILTER_MD_DETAIL, payload: name });
  };
  const editTableIcon = (data: mdDetail) => {
    dispatch({ type: EDIT_TABLE_ICON, payload: data });
  };
  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };
  const setPage = (page: number) => {
    dispatch({ type: SET_PAGE, payload: page });
  };
  const setSortFilter = (sortOrder: "ascending" | "descending") => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  let data = {
    ...state,
    addMdDetail,
    editMdDetail,
    deleteMdDetail,
    filterMdDetail,
    editTableIcon,
    setPage,
    setSearchFilter,
    setSortFilter,
  };

  return <foundersContext.Provider value={data}>{props.children}</foundersContext.Provider>;
};

const useFounderContext = () => useContext(foundersContext);

export { FoundersContextProvider, useFounderContext };
