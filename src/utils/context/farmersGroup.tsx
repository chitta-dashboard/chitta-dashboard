import React, { createContext, FC, useContext, useReducer } from "react";
import { ASCENDING, SortOrder } from "../constants";

//ACTION TYPES
const ADD_FARMERS_GROUP = "ADD_FARMERS_GROUP";
const EDIT_FARMERS_GROUP = "EDIT_FARMERS_GROUP";
const DELETE_FARMERS_GROUP = "DELETE_FARMERS_GROUP";
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";
const MEMBER_FILTER = "MEMBER_FILTER";
const ADD_MEMBERS = "ADD_MEMBERS";

export type FarmersGroup = {
  id: string;
  groupName: string;
  explanation: string;
  chairman: string;
  treasurer: string;
  secretary: string;
  members?: string[] | undefined;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmersGroupContextType {
  farmersGroupById: { [id: string]: FarmersGroup };
  page: number;
  rowsPerPage: number;
  searchFilter: string;
  memberFilter: string;
  sortFilter: SortOrder;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
  addFarmersGroup: (data: FarmersGroup) => void;
  editFarmersGroup: (data: FarmersGroup) => void;
  deleteFarmersGroup: (id: string) => void;
  addMembers: (id: string) => void;
  setMemberFilter: (setMember: string) => void;
}

const initialState: farmersGroupContextType = {
  farmersGroupById: {
    "1": {
      id: "1",
      groupName: "விவசாயிகள் சங்கம்-1",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      members: ["1", "4", "5"],
      secretary: "vanthiyadevan",
    },
    "2": {
      id: "2",
      groupName: "விவசாயிகள் சங்கம்-2",
      explanation: "இந்த குழு சோழர் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
      members: [],
    },
    "3": {
      id: "3",
      groupName: "விவசாயிகள் சங்கம்-3",
      explanation: "இந்த குழு பாண்டியன் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
      members: ["2", "3", "6"],
    },
  },

  page: 1,
  rowsPerPage: 6,
  searchFilter: "",
  sortFilter: ASCENDING,
  addMembers: () => {},
  setSortFilter: () => {},
  setSearchFilter: () => {},
  addFarmersGroup: () => {},
  editFarmersGroup: () => {},
  deleteFarmersGroup: () => {},
  memberFilter: "all",
  setMemberFilter: () => {},
};

const reducer = (state: farmersGroupContextType, action: any) => {
  switch (action.type) {
    case ADD_FARMERS_GROUP:
      return { ...state, farmersGroupById: { ...state.farmersGroupById, [action.payload.id]: action.payload } };

    case EDIT_FARMERS_GROUP:
      return { ...state, farmersGroupById: { ...state.farmersGroupById, [action.payload.id]: action.payload } };

    case DELETE_FARMERS_GROUP:
      delete state.farmersGroupById[action.payload];
      return { ...state, farmersGroupById: { ...state.farmersGroupById } };

    case ADD_MEMBERS:
      return { ...state, farmersGroupById: { ...state.farmersGroupById, members: [...action.payload] } };

    case MEMBER_FILTER:
      return { ...state, memberFilter: action.payload };

    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmersGroupContext = createContext<farmersGroupContextType>(initialState);

const FarmersGroupContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer<(reducer: any, initialState: any) => any>(reducer, initialState);

  const addFarmersGroup = (data: FarmersGroup) => {
    dispatch({ type: ADD_FARMERS_GROUP, payload: data });
  };

  const editFarmersGroup = (data: FarmersGroup) => {
    dispatch({ type: EDIT_FARMERS_GROUP, payload: data });
  };

  const deleteFarmersGroup = (id: string) => {
    dispatch({ type: DELETE_FARMERS_GROUP, payload: id });
  };

  const addMembers = (id: string) => {
    dispatch({ type: ADD_MEMBERS, payload: id });
  };

  const setMemberFilter = (setMember: string) => {
    dispatch({ type: MEMBER_FILTER, payload: setMember });
  };

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  const setSortFilter = (sortOrder: SortOrder) => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  let data = {
    ...state,
    addFarmersGroup,
    editFarmersGroup,
    deleteFarmersGroup,
    setSearchFilter,
    setSortFilter,
    setMemberFilter,
    addMembers,
  };

  return <farmersGroupContext.Provider value={data}>{props.children}</farmersGroupContext.Provider>;
};

const useFarmersGroupContext = () => useContext(farmersGroupContext);

export { FarmersGroupContextProvider, useFarmersGroupContext };
