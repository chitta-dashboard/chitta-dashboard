import React, { createContext, FC, useContext, useReducer } from "react";

type farmerGroupDetail = {
  name: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerGroupDetailsContextType {
  farmerGroupList: farmerGroupDetail[];
}

const initialState: farmerGroupDetailsContextType = {
  farmerGroupList: [],
};

const reducer = (state: farmerGroupDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_FARMER_GROUP_DETAIL":
      return { ...state, farmerGroupList: action.payload };
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmerGroupDetailsContext = createContext<farmerGroupDetailsContextType>(initialState);

const FarmerGroupDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFarmerGroupDetail = (data: farmerGroupDetail) => {
    dispatch({ type: "ADD_FARMER_GROUP_DETAIL", payload: data });
  };

  let data = {
    ...state,
    addFarmerGroupDetail,
  };

  return <farmerGroupDetailsContext.Provider value={data}>{props.children}</farmerGroupDetailsContext.Provider>;
};

const useFarmerGroupDetailsContext = () => useContext(farmerGroupDetailsContext);

export { FarmerGroupDetailsContextProvider, useFarmerGroupDetailsContext };
