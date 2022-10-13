import { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";
import { ASCENDING, SortOrder } from "../constants";

//ACTION TYPES
const ADD_MD_DETAIL = "ADD_MD_DETAIL";
const EDIT_MD_DETAIL = "EDIT_MD_DETAIL";
const DELETE_MD_DETAIL = "DELETE_MD_DETAIL";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const CHECKBOX_SELECT = "CHECKBOX_SELECT";

export type mdDetail = {
  id: string;
  name: string;
  phoneNumber: string;
  qualification: string;
  profile?: string;
  dob: string;
  signature?: string;
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
  // selectedMdListData: selectedMdListData[];
  setSearchFilter: (searchText: string) => void;
  addMdDetail: (data: mdDetail) => void;
  editMdDetail: (data: mdDetail) => void;
  deleteMdDetail: (id: string) => void;
  editTableIcon: (data: any) => void;
  checkboxSelect: (id: object) => void;
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
  searchFilter: "",
  // selectedMdListData: [],
  sortFilter: ASCENDING,
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
      // let data = state.selectedMdListData;
      // let newData: string[] = [];
      // action.payload.map((id:string) => {
      //   !data.includes(id) && newData.push(id);
      // });
      // return {...state,selectedMdListData:[...newData,...data]}
      return { ...state, mdDetailsById: { ...state.mdDetailsById, ...action.payload } };

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

  const checkboxSelect = (farmerData: object) => {
    dispatch({ type: CHECKBOX_SELECT, payload: farmerData });
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
