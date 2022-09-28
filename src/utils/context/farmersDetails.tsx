import React, { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/profile.png";

//ACTION TYPES
const ADD_FARMER_DETAIL = "ADD_FARMER_DETAIL";
const EDIT_FARMER_DETAIL = "EDIT_FARMER_DETAIL";
const DELETE_FARMER_DETAIL = "DELETE_FARMER_DETAIL";
const EDIT_TABLE_ICON = "EDIT_TABLE_ICON";

export type farmerDetail = {
  membershipId?: string;
  profile?: string;
  id: string;
  name: string;
  fatherName: string;
  sex: string;
  spouseName: string;
  dob: string;
  group: string;
  phoneNumber: string;
  addhaarNo: string;
  voterIdNo: string;
  acre: string;
  education: string;
  village: string;
  postalNo: string;
  address: string;
  taluk: string;
  district: string;
  surveyNo: string;
  landType: string;
  farmerType: string;
  waterType: string;
  seedType: string;
  animals: string;
  groupMember: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerDetailsContextType {
  farmersList: farmerDetail[];
  addFarmerDetail: (data: farmerDetail) => void;
  editFarmerDetail: (data: farmerDetail) => void;
  deleteFarmerDetail: (id: string) => void;
  editTableIcon: (data: farmerDetail) => void;
}

const initialState: farmerDetailsContextType = {
  farmersList: [
    {
      id: "1",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      voterIdNo: "",
      acre: "",
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: "",
      landType: "",
      farmerType: "",
      waterType: "",
      seedType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "2",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      voterIdNo: "",
      acre: "",
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: "",
      landType: "",
      farmerType: "",
      waterType: "",
      seedType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "3",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      voterIdNo: "",
      acre: "",
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: "",
      landType: "",
      farmerType: "",
      waterType: "",
      seedType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "4",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      voterIdNo: "",
      acre: "",
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: "",
      landType: "",
      farmerType: "",
      waterType: "",
      seedType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "5",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      voterIdNo: "",
      acre: "",
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: "",
      landType: "",
      farmerType: "",
      waterType: "",
      seedType: "",
      animals: "",
      groupMember: "",
    },
    {
      id: "6",
      membershipId: "NER-FPC-2",
      profile: profileImg,
      name: "Arokiya",
      phoneNumber: "8610010875",
      group: "விவசாயிகள் சங்கம்",
      fatherName: "",
      sex: "",
      spouseName: "",
      dob: "",
      addhaarNo: "",
      voterIdNo: "",
      acre: "",
      education: "",
      village: "",
      postalNo: "",
      address: "",
      taluk: "",
      district: "",
      surveyNo: "",
      landType: "",
      farmerType: "",
      waterType: "",
      seedType: "",
      animals: "",
      groupMember: "",
    },
  ],
  addFarmerDetail: () => {},
  editFarmerDetail: () => {},
  deleteFarmerDetail: () => {},
  editTableIcon: () => {},
};

const reducer = (state: farmerDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_FARMER_DETAIL:
      return { ...state, farmersList: [...state.farmersList, action.payload] };
    case EDIT_FARMER_DETAIL:
      const updatedfarmerDetailList = action.payload;
      const editfarmerDetailList = state.farmersList.map((list) => {
        if (list.id === updatedfarmerDetailList.id) {
          return updatedfarmerDetailList;
        }
        return list;
      });
      return {
        ...state,
        farmersList: editfarmerDetailList,
      };
    case DELETE_FARMER_DETAIL:
      return { ...state, farmersList: state.farmersList.filter((list) => list.id !== action.payload) };
    case EDIT_TABLE_ICON:
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

  state.addFarmerDetail = (data: farmerDetail) => {
    dispatch({ type: ADD_FARMER_DETAIL, payload: data });
  };
  state.editFarmerDetail = (data: farmerDetail) => {
    dispatch({ type: EDIT_FARMER_DETAIL, payload: data });
  };
  state.deleteFarmerDetail = (id: string) => {
    dispatch({ type: DELETE_FARMER_DETAIL, payload: id });
  };
  const editTableIcon = (data: farmerDetail) => {
    dispatch({ type: EDIT_TABLE_ICON, payload: data });
  };

  let data = {
    ...state,
    editTableIcon,
  };

  return <farmerDetailsContext.Provider value={data}>{props.children}</farmerDetailsContext.Provider>;
};

const useFarmerDetailsContext = () => useContext(farmerDetailsContext);

export { FarmerDetailsContextProvider, useFarmerDetailsContext };
