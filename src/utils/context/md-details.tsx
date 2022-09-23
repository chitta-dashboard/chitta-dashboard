import React, { createContext, FC, useContext, useReducer } from "react";

type mdDetail = {
  id: number;
  image: string;
  name: string;
  mobileNo: number;
  degree: string;
  profile:string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface mdDetailsContextType {
  mdList: mdDetail[];
  filterMdDetail?: (name: string) => void;
  addMdDetail:(data: mdDetail)=>void,
  editTableIcon:(data: mdDetail)=>void
}

const initialState: mdDetailsContextType = {
  mdList: [
    {
      id: 1,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 2,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 3,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 4,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 5,
      image: "image",
      name: "Arokiya Arokiya Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 6,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 7,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 8,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 9,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 10,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 11,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 12,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 13,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 14,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
    {
      id: 15,
      image: "image",
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "Higher Secondary",
    },
  ],
  addMdDetail:()=>{},
  editTableIcon:()=>{}
};

const searchWord = (text: string, word: string) =>
  text
    ? text
        .trim()
        .toLowerCase()
        .search(
          word
            .replace(/[*+?^${}()|[\]\\]/g, "\\$&")
            .trim()
            .toLowerCase(),
        ) >= 0
    : false;

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_MD_DETAIL":
      return { ...state, mdList: [...state.mdList, action.payload] };
    case "FILTER_MD_DETAIL":
      return {
        ...state,
        mdList: initialState.mdList.filter((md) => {
          return searchWord(md.name, action.payload);
        }),
      };
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

  const filterMdDetail = (name: string) => {
    dispatch({ type: "FILTER_MD_DETAIL", payload: name });
  };
  const editTableIcon = (data:mdDetail)=>{
    dispatch({type:"EDIT_TABLE_ICON",payload:data})
  }

  let data = {
    ...state,
    addMdDetail,
    filterMdDetail,
    editTableIcon
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
