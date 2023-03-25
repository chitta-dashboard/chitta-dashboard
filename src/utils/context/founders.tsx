import { createContext, FC, useContext, useReducer } from "react";
import { NORMAL, SortOrder } from "../constants";

//ACTION TYPES
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
const SET_SORT_FILTER = "SET_SORT_FILTER";

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

export interface FoundersContextType {
  searchFilter: string;
  sortFilter: SortOrder;
  setSortFilter: (sortOrder: SortOrder) => void;
  setSearchFilter: (searchText: string) => void;
}

const initialState: FoundersContextType = {
  searchFilter: "",
  sortFilter: NORMAL,
  setSortFilter: () => {},
  setSearchFilter: () => {},
};

const reducer = (state: FoundersContextType, action: any) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    case SET_SORT_FILTER:
      return { ...state, sortFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const foundersContext = createContext<FoundersContextType>(initialState);

const FoundersContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  const setSortFilter = (sortOrder: SortOrder) => {
    dispatch({ type: SET_SORT_FILTER, payload: sortOrder });
  };

  let data = {
    ...state,
    setSearchFilter,
    setSortFilter,
  };

  return <foundersContext.Provider value={data}>{props.children}</foundersContext.Provider>;
};

const useFounderContext = () => useContext(foundersContext);

export { FoundersContextProvider, useFounderContext };
