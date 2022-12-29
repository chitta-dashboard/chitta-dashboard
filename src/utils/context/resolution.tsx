import React, { createContext, FC, useContext, useReducer } from "react";

//ACTION TYPES
const SET_TAB = "SET_TAB";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface IResolution {
  id: string;
  groupName: string;
  groupTitle: string;
  // the time that user selects as the resolution creation date
  timestamp: string;
  // the actual time in which the resolution is added to database(i.e: context)
  creationTime: string;
  groupDescription: string;
  groupDescriptionRichText?: string;
  presenter: string[];
  participator: string[];
}

export interface IResolutions {
  [id: string]: IResolution;
}

interface ResolutionContextType {
  tab: string;
  changeTab: (tabType: "tree" | "list") => void;
}

const initialState: ResolutionContextType = {
  tab: "tree",
  changeTab: () => {},
};

const reducer = (state: ResolutionContextType, action: any) => {
  switch (action.type) {
    case SET_TAB:
      return { ...state, tab: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const resolutionContext = createContext<ResolutionContextType>(initialState);

const ResolutionContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer<(reducer: any, initialState: any) => any>(reducer, initialState);

  const changeTab = (tabType: "tree" | "list") => {
    dispatch({ type: SET_TAB, payload: tabType });
  };

  let data = {
    ...state,
    changeTab,
  };

  return <resolutionContext.Provider value={data}> {props.children} </resolutionContext.Provider>;
};

const useResolutionContext = () => useContext(resolutionContext);

export { ResolutionContextProvider, useResolutionContext };
