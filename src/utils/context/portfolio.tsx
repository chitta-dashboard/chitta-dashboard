import React, { createContext, FC, useContext, useReducer } from "react";

//ACTION TYPES
const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface PortfolioContextType {
  searchFilter: string;
  setSearchFilter: (searchText: string) => void;
}

const initialState: PortfolioContextType = {
  searchFilter: "",
  setSearchFilter: () => {},
};

const reducer = (state: PortfolioContextType, action: any) => {
  switch (action.type) {
    case SET_SEARCH_FILTER:
      return { ...state, searchFilter: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const portfolioContext = createContext<PortfolioContextType>(initialState);

const PortfolioContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer<(reducer: any, initialState: any) => any>(reducer, initialState);

  const setSearchFilter = (searchText: string) => {
    dispatch({ type: SET_SEARCH_FILTER, payload: searchText });
  };

  let data = {
    ...state,
    setSearchFilter,
  };

  return <portfolioContext.Provider value={data}> {props.children} </portfolioContext.Provider>;
};

const usePortfolioContext = () => useContext(portfolioContext);

export { PortfolioContextProvider, usePortfolioContext };
