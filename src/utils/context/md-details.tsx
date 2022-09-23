import React, { createContext, FC, useContext, useReducer } from "react";

type mdDetail = {
  name: string;
};

type Props = {
  children: React.ReactNode;
};

interface mdDetailsContextType {
  mdList: mdDetail[];
}

const initialState: mdDetailsContextType = {
  mdList: [],
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_MD_DETAIL":
      return { ...state, mdList: action.payload };
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const mdDetailsContext = createContext<mdDetailsContextType>(initialState);

const mdDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMdDetail = (data: mdDetail) => {
    dispatch({ type: "ADD_MD_DETAIL", payload: data });
  };

  let data = {
    ...state,
    addMdDetail,
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { mdDetailsContextProvider, useMdDetailsContext };
