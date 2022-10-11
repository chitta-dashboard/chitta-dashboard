import { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";

//ACTION TYPES
const ADD_MD_DETAIL = "ADD_MD_DETAIL";
const EDIT_MD_DETAIL = "EDIT_MD_DETAIL";
const DELETE_MD_DETAIL = "DELETE_MD_DETAIL";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT_ALL = "CHECKBOX_SELECT_ALL";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";

export type mdDetail = {
  id: string;
  name: string;
  phoneNumber: string;
  qualification: string;
  profile?: string;
  dob: string;
  signature?: string;
};

export type selectedMdListData = number | string;

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface mdDetailsContextType {
  mdDetailsById: { [id: string]: mdDetail };
  page: number;
  rowsPerPage: number;
  searchFilter: string;
  sortFilter: "ascending" | "descending";
  selectedMdListData: selectedMdListData[];
  setSortFilter: (sortOrder: "ascending" | "descending") => void;
  setSearchFilter: (searchText: string) => void;
  addMdDetail: (data: mdDetail) => void;
  editMdDetail: (data: mdDetail) => void;
  deleteMdDetail: (id: string) => void;
  editTableIcon: (data: any) => void;
  checkboxSelectAll: () => void;
  checkboxSelect: (id: string | number) => void;
}

const initialState: mdDetailsContextType = {
  mdDetailsById: {
    "1": {
      id: "1",
      profile: profileImg,
      name: "Aditha Karikalan",
      phoneNumber: "9945672156",
      qualification: "BBA, MBA",
      dob: "1989-10-12",
      signature: "",
    },
    "2": {
      id: "2",
      profile: profileImg,
      name: "Arulmozhi Varman",
      phoneNumber: "8610010875",
      qualification: "BA",
      dob: "1994-03-01",
      signature: "",
    },
    "3": {
      id: "3",
      profile: profileImg,
      name: "Nandini",
      phoneNumber: "8968456734",
      qualification: "BCom CA",
      dob: "1998-08-05",
      signature: "",
    },
    "4": {
      id: "4",
      profile: profileImg,
      name: "Vanthiyathevan ",
      phoneNumber: "8838461839",
      qualification: "BSc, Computer Science",
      dob: "1998-01-07",
      signature: "",
    },
    "5": {
      id: "5",
      profile: profileImg,
      name: "Kundavai",
      phoneNumber: "9854367213",
      qualification: "B.Tech, Information Technology",
      dob: "1994-01-01",
      signature: "",
    },
    "6": {
      id: "6",
      profile: profileImg,
      name: "Rajendran Cholan",
      phoneNumber: "9945672156",
      qualification: "B.Tech, Computer Science",
      dob: "1996-08-10",
      signature: "",
    },
  },
  page: 1,
  rowsPerPage: 6,
  searchFilter: "",
  selectedMdListData: [],
  sortFilter: "ascending",
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addMdDetail: () => {},
  editMdDetail: () => {},
  deleteMdDetail: () => {},
  editTableIcon: () => {},
  checkboxSelectAll: () => {},
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

    case CHECKBOX_SELECT_ALL:
      if (Object.values(state.selectedMdListData).length === Object.values(state.mdDetailsById).length) {
        return {
          ...state,
          selectedMdListData: [],
        };
      } else {
        return {
          ...state,
          selectedMdListData: [...Object.keys(state.mdDetailsById)],
        };
      }

    case CHECKBOX_SELECT:
      let farmerId = action.payload;
      if (state.selectedMdListData.includes(farmerId)) {
        return {
          ...state,
          selectedMdListData: state.selectedMdListData.filter((id) => id !== farmerId),
        };
      } else {
        return {
          ...state,
          selectedMdListData: [...state.selectedMdListData, farmerId],
        };
      }

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

  const setSortFilter = (sortOrder: "ascending" | "descending") => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  const checkboxSelectAll = () => {
    dispatch({ type: CHECKBOX_SELECT_ALL });
  };

  const checkboxSelect = (id: string | number) => {
    dispatch({ type: CHECKBOX_SELECT, payload: id });
  };

  let data = {
    ...state,
    addMdDetail,
    editMdDetail,
    deleteMdDetail,
    setSearchFilter,
    setSortFilter,
    checkboxSelectAll,
    checkboxSelect,
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
