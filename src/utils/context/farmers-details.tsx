import React, { createContext, FC, useContext, useReducer } from "react";

type farmerDetail = {
  name: string;
  profile:string;
  id:number
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersList: farmerDetail[];
  editTableIcon:(data: farmerDetail)=>void
}

const initialState: farmerDetailsContextType = {
  farmersList: [],
  editTableIcon:()=>{}
};

const reducer = (state: farmerDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_FARMER_DETAIL":
      return { ...state, farmersList: action.payload };
    case "EDIT_TABLE_ICON":
      let data = state.farmersList.filter(item=>item.id !== action.payload.id);
      return {...state,farmersList:[...data,action.payload]}
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

  const editTableIcon = (data:farmerDetail)=>{
    dispatch({type:"EDIT_TABLE_ICON",payload:data})
  }

  let data = {
    ...state,
    addFarmerDetail,
    editTableIcon
  };

  return <farmerDetailsContext.Provider value={data}>{props.children}</farmerDetailsContext.Provider>;
};

const useFarmerDetailsContext = () => useContext(farmerDetailsContext);

export { FarmerDetailsContextProvider, useFarmerDetailsContext };
