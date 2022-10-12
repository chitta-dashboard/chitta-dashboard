import { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";
import { ASCENDING, SortOrder } from "../constants";

//ACTION TYPES
const ADD_FOUNDERS = "ADD_FOUNDERS";
const EDIT_FOUNDERS = "EDIT_FOUNDERS";
const DELETE_FOUNDERS = "DELETE_FOUNDERS";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";

export type Founders = {
  id: string;
  name: string;
  phoneNumber: string;
  qualification: string;
  profile?: string;
  dob: string;
  description?: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface foundersContextType {
  foundersById: { [id: string]: Founders };
  searchFilter: string;
  sortFilter: SortOrder;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  addFounder: (data: Founders) => void;
  editFounder: (data: Founders) => void;
  deleteFounder: (id: string) => void;
}

const initialState: foundersContextType = {
  foundersById: {
    "1": {
      id: "1",
      profile: profileImg,
      name: "Veera Raghavan",
      phoneNumber: "9945672156",
      qualification: "BBA, MBA",
      dob: "1982-10-01",
      description: "",
    },
    "2": {
      id: "2",
      profile: profileImg,
      name: "John Durairaj",
      phoneNumber: "8610010875",
      qualification: "BA",
      dob: "1990-01-27",
      description: "",
    },
    "3": {
      id: "3",
      profile: profileImg,
      name: "Vijay Kumar",
      phoneNumber: "8968456734",
      qualification: "BCom CA",
      dob: "1989-11-09",
      description: "",
    },
    "4": {
      id: "4",
      profile: profileImg,
      name: "Kathiresan",
      phoneNumber: "8838461839",
      qualification: "BSc, Computer Science",
      dob: "1994-10-12",
      description: "",
    },
    "5": {
      id: "5",
      profile: profileImg,
      name: "Jeevanandham",
      phoneNumber: "9854367213",
      qualification: "B.Tech, Information Technology",
      dob: "1992-08-02",
      description: "",
    },
    "6": {
      id: "6",
      profile: profileImg,
      name: "Arockiyaraj Reddy",
      phoneNumber: "9945672156",
      qualification: "B.Tech, Computer Science",
      dob: "1985-07-12",
      description: "",
    },
  },
  searchFilter: "",
  sortFilter: ASCENDING,
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addFounder: () => {},
  editFounder: () => {},
  deleteFounder: () => {},
};

const reducer = (state: foundersContextType, action: any) => {
  switch (action.type) {
    case ADD_FOUNDERS:
      return { ...state, foundersById: { ...state.foundersById, [action.payload.id]: action.payload } };

    case EDIT_FOUNDERS:
      return { ...state, foundersById: { ...state.foundersById, [action.payload.id]: action.payload } };

    case DELETE_FOUNDERS:
      delete state.foundersById[action.payload];
      return { ...state, foundersById: { ...state.foundersById } };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const foundersContext = createContext<foundersContextType>(initialState);

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

  let data = {
    ...state,
    addFounder,
    editFounder,
    deleteFounder,
    setSearchFilter,
    setSortFilter,
  };

  return <foundersContext.Provider value={data}>{props.children}</foundersContext.Provider>;
};

const useFounderContext = () => useContext(foundersContext);

export { FoundersContextProvider, useFounderContext };
