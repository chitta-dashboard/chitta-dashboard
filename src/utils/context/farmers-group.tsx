import React, { createContext, FC, useContext, useReducer } from "react";

export type farmerGroupDetail = {
  id: number;
  groupName: string;
  description: string;
  leader: string;
  treasurer: string;
  secretary: string;
};
export type farmerGroupDetailDelete = {
  id: number;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerGroupDetailsContextType {
  farmerGroupList: farmerGroupDetail[];
  addFarmerGroupDetail: (data: farmerGroupDetail) => void;
}

const initialState: farmerGroupDetailsContextType = {
  farmerGroupList: [
    {
      id: 1,
      groupName: "விவசாயிகள் சங்கம்",
      description: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      leader: "",
      treasurer: "",
      secretary: "",
    },
    {
      id: 2,
      groupName: "விவசாயிகள் சங்கம்",
      description: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      leader: "",
      treasurer: "",
      secretary: "",
    },
    {
      id: 3,
      groupName: "விவசாயிகள் சங்கம்",
      description: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      leader: "",
      treasurer: "",
      secretary: "",
    },
    {
      id: 4,
      groupName: "விவசாயிகள் சங்கம்",
      description: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      leader: "",
      treasurer: "",
      secretary: "",
    },
    {
      id: 5,
      groupName: "விவசாயிகள் சங்கம்",
      description: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      leader: "",
      treasurer: "",
      secretary: "",
    },
    {
      id: 6,
      groupName: "விவசாயிகள் சங்கம்",
      description: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      leader: "",
      treasurer: "",
      secretary: "",
    },
  ],
  addFarmerGroupDetail: () => {},
};

const reducer = (state: farmerGroupDetailsContextType, action: any) => {
  switch (action.type) {
    case "ADD_FARMER_GROUP_DETAIL":
      return { ...state, farmerGroupList: [...state.farmerGroupList, action.payload] };
    case "DELETE_MD_DETAIL":
      console.log("id", action.payload);
      return { ...state, mdList: state.farmerGroupList.filter((list) => list.id !== action.payload) };
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
  const deleteFarmerGroupDetail = (data: farmerGroupDetailDelete) => {
    dispatch({ type: "DELETE_MD_DETAIL", payload: data });
  };

  let data = {
    ...state,
    addFarmerGroupDetail,
    deleteFarmerGroupDetail,
  };

  return <farmerGroupDetailsContext.Provider value={data}>{props.children}</farmerGroupDetailsContext.Provider>;
};

const useFarmerGroupDetailsContext = () => useContext(farmerGroupDetailsContext);

export { FarmerGroupDetailsContextProvider, useFarmerGroupDetailsContext };
