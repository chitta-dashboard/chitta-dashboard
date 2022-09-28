import React, { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";
import { searchWord } from "../constants";

type mdDetail = {
  id: number;
  name: string;
  mobileNo: number;
  degree: string;
  profile?: string;
  dob?: string;
  signature?: string;
};
type mdDetailDelete = {
  id: number;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface mdDetailsContextType {
  mdList: mdDetail[];
  filterMdDetail?: (name: string) => void;
  addMdDetail: (data: mdDetail) => void;
  editTableIcon: (data: any) => void;
}

const initialState: mdDetailsContextType = {
  mdList: [
    {
      id: 1,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "BSc, Computer Science",
      dob: "01-01-2020",
      signature: "",
    },
    {
      id: 2,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "BSc, Computer Science",
      dob: "01-01-2020",
      signature: "",
    },
    {
      id: 3,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "BSc, Computer Science",
      dob: "01-01-2020",
      signature: "",
    },
    {
      id: 4,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "BSc, Computer Science",
      dob: "01-01-2020",
      signature: "",
    },
    {
      id: 5,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "BSc, Computer Science",
      dob: "01-01-2020",
      signature: "",
    },
    {
      id: 6,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      degree: "BSc, Computer Science",
      dob: "01-01-2020",
      signature: "",
    },
  ],
  addMdDetail: () => {},
  editTableIcon: () => {},
};

const reducer = (state: mdDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_MD_DETAIL":
      return { ...state, mdList: [...state.mdList, action.payload] };
    case "DELETE_MD_DETAIL":
      return { ...state, mdList: state.mdList.filter((list) => list.id !== action.payload) };
    case "FILTER_MD_DETAIL":
      return {
        ...state,
        mdList: initialState.mdList.filter((md) => {
          return searchWord(md.name, action.payload);
        }),
      };
    case "EDIT_TABLE_ICON":
      let data = state.mdList.filter((item) => item.id !== action.payload.id);
      return { ...state, mdList: [...data, action.payload] };
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
  const deleteMdDetail = (data: mdDetailDelete) => {
    dispatch({ type: "DELETE_MD_DETAIL", payload: data });
  };
  const filterMdDetail = (name: string) => {
    dispatch({ type: "FILTER_MD_DETAIL", payload: name });
  };
  const editTableIcon = (data: mdDetail) => {
    dispatch({ type: "EDIT_TABLE_ICON", payload: data });
  };

  let data = {
    ...state,
    addMdDetail,
    deleteMdDetail,
    filterMdDetail,
    editTableIcon,
  };

  return <mdDetailsContext.Provider value={data}>{props.children}</mdDetailsContext.Provider>;
};

const useMdDetailsContext = () => useContext(mdDetailsContext);

export { MdDetailsContextProvider, useMdDetailsContext };
