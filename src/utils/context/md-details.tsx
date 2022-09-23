import React, { createContext, FC, useContext, useReducer } from "react";

type mdDetail = {
  name: string;
  profile:string;
  id:number
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface mdDetailsContextType {
  mdList: mdDetail[];
  addMdDetail:(data: mdDetail)=>void,
  editTableIcon:(data: mdDetail)=>void
}

const initialState: mdDetailsContextType = {
  mdList: [],
  addMdDetail:()=>{},
  editTableIcon:()=>{}
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_MD_DETAIL":
      return { ...state, mdList: action.payload };
    case "EDIT_TABLE_ICON":
      let data = state.mdList.filter(item=>item.id !== action.payload.id);
      return {...state,mdList:[...data,action.payload]}
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const mdDetailsContext = createContext<mdDetailsContextType>(initialState);

const MdDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addMdDetail = (data: mdDetail) => {
    dispatch({ type: "ADD_MD_DETAIL", payload: data });
  };

  const editTableIcon = (data:mdDetail)=>{
    dispatch({type:"EDIT_TABLE_ICON",payload:data})
  }

  let data = {
    ...state,
    addMdDetail,
    editTableIcon
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
