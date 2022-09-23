import React, { createContext, FC, useContext, useReducer } from "react";

type farmerDetail = {
  name: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersList: farmerDetail[];
}

const initialState: farmerDetailsContextType = {
  farmersList: [],
};

const reducer = (state: farmerDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_FARMER_DETAIL":
      return { ...state, farmersList: action.payload };
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmerDetailsContext = createContext<farmerDetailsContextType>(initialState);

const FarmerDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFarmerDetail = (data: farmerDetail) => {
    dispatch({ type: "ADD_FARMER_DETAIL", payload: data });
  };

  let data = {
    ...state,
    addFarmerDetail,
  };

  return <farmerDetailsContext.Provider value={data}>{props.children}</farmerDetailsContext.Provider>;
};

const useFarmerDetailsContext = () => useContext(farmerDetailsContext);

export { FarmerDetailsContextProvider, useFarmerDetailsContext };
