import React, { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";

type mdDetail = {
  id: number;
  profile: string;
  name: string;
  mobileNo: number;
  degree: string;
  dob: string;
  signature: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export interface mdDetailsContextType {
  mdList: mdDetail[];
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

const MdDetailsContextProvider: FC<Props> = (props) => {
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

export { MdDetailsContextProvider, useMdDetailsContext };
