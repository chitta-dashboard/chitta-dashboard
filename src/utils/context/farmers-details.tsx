import React, { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";

type farmerDetail = {
  id: number;
  profile: string;
  name: string;
  mobileNo?: number;
  groupName?: string;
  fatherName?: string;
  husbandName?: string;
  farmerGroup?: string;
  DOB?: string;
  phoneNumber?: number;
  aadharNumber?: number;
  voterIdNumber?: number;
  surveyNo?: number;
  acre?: number;
  gender?: string;
  education?: string;
  address?: string;
  village?: string;
  circle?: string;
  district?: string;
  pincode?: number;
  landType?: string;
  irrigationType?: string;
  farmerType?: string;
  cropType?: string;
  cattle?: string;
  isGroupAdmin?: string;
  membershipId?: number;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersList: farmerDetail[];
  editTableIcon: (data: farmerDetail) => void;
}

const initialState: farmerDetailsContextType = {
  farmersList: [
    {
      id: 1,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      groupName: "விவசாயிகள் சங்கம்",
    },
    {
      id: 2,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      groupName: "விவசாயிகள் சங்கம்",
    },
    {
      id: 3,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      groupName: "விவசாயிகள் சங்கம்",
    },
    {
      id: 4,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      groupName: "விவசாயிகள் சங்கம்",
    },
    {
      id: 5,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      groupName: "விவசாயிகள் சங்கம்",
    },
    {
      id: 6,
      profile: profileImg,
      name: "Arokiya",
      mobileNo: 8610010875,
      groupName: "விவசாயிகள் சங்கம்",
    },
  ],
  editTableIcon: () => {},
};

const reducer = (state: farmerDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_FARMER_DETAIL":
      return { ...state, farmersList: [...state.farmersList, action.payload] };
    case "DELETE_FARMER_DETAIL":
      return { ...state, mdList: state.farmersList.filter((list) => list.id !== action.payload) };
    case "EDIT_TABLE_ICON":
      let data = state.farmersList.filter((item) => item.id !== action.payload.id);
      return { ...state, farmersList: [...data, action.payload] };
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

  const deleteFarmerDetail = (data: farmerDetail) => {
    dispatch({ type: "DELETE_FARMER_DETAIL", payload: data });
  };

  const editTableIcon = (data: farmerDetail) => {
    dispatch({ type: "EDIT_TABLE_ICON", payload: data });
  };

  let data = {
    ...state,
    addFarmerDetail,
    deleteFarmerDetail,
    editTableIcon,
  };

  return <farmerDetailsContext.Provider value={data}>{props.children}</farmerDetailsContext.Provider>;
};

const useFarmerDetailsContext = () => useContext(farmerDetailsContext);

export { FarmerDetailsContextProvider, useFarmerDetailsContext };
