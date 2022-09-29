import React, { createContext, FC, useContext, useReducer } from "react";

//ACTION TYPES
const ADD_FARMER_GROUP_DETAIL = "ADD_FARMER_GROUP_DETAIL";
const EDIT_FARMER_GROUP_DETAIL = "EDIT_FARMER_GROUP_DETAIL";
const DELETE_FARMER_GROUP_DETAIL = "DELETE_FARMER_GROUP_DETAIL";

export type farmerGroupDetail = {
  id: string;
  groupName: string;
  explanation: string;
  chairman: string;
  treasurer: string;
  secretary: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface farmerGroupDetailsContextType {
  farmerGroupList: farmerGroupDetail[];
  searchFilter: string;
  addFarmerGroupDetail: (data: farmerGroupDetail) => void;
  editFarmerGroupDetail: (data: farmerGroupDetail) => void;
  deleteFarmerGroupDetail: (id: string) => void;
}

const initialState: farmerGroupDetailsContextType = {
  farmerGroupList: [
    {
      id: "1",
      groupName: "விவசாயிகள் சங்கம்",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
    {
      id: "2",
      groupName: "விவசாயிகள் சங்கம்",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
    {
      id: "3",
      groupName: "விவசாயிகள் சங்கம்",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
    {
      id: "4",
      groupName: "விவசாயிகள் சங்கம்",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
    {
      id: "5",
      groupName: "விவசாயிகள் சங்கம்",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
    {
      id: "6",
      groupName: "விவசாயிகள் சங்கம்",
      explanation: "இந்த குழு சதீஷ் என்பவரால் உருவாக்கப்பட்டது...",
      chairman: "Ponniyin Selvan",
      treasurer: "Kariakalan",
      secretary: "vanthiyadevan",
    },
  ],
  searchFilter: "",
  addFarmerGroupDetail: () => {},
  editFarmerGroupDetail: () => {},
  deleteFarmerGroupDetail: () => {},
};

const reducer = (state: farmerGroupDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_FARMER_GROUP_DETAIL:
      return { ...state, farmerGroupList: [...state.farmerGroupList, action.payload] };
    case EDIT_FARMER_GROUP_DETAIL:
      const updatedfarmerGroupList = action.payload;
      const editfarmerGroupList = state.farmerGroupList.map((list) => {
        if (list.id === updatedfarmerGroupList.id) {
          return updatedfarmerGroupList;
        }
        return list;
      });
      return {
        ...state,
        farmerGroupList: editfarmerGroupList,
      };
    case DELETE_FARMER_GROUP_DETAIL:
      return { ...state, farmerGroupList: state.farmerGroupList.filter((list) => list.id !== action.payload) };
    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const farmerGroupDetailsContext = createContext<farmerGroupDetailsContextType>(initialState);

const FarmerGroupDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  state.addFarmerGroupDetail = (data: farmerGroupDetail) => {
    dispatch({ type: ADD_FARMER_GROUP_DETAIL, payload: data });
  };
  state.editFarmerGroupDetail = (data: farmerGroupDetail) => {
    dispatch({ type: EDIT_FARMER_GROUP_DETAIL, payload: data });
  };
  state.deleteFarmerGroupDetail = (id: string) => {
    dispatch({ type: DELETE_FARMER_GROUP_DETAIL, payload: id });
  };

  let data = {
    ...state,
  };

  return <farmerGroupDetailsContext.Provider value={data}>{props.children}</farmerGroupDetailsContext.Provider>;
};

const useFarmerGroupDetailsContext = () => useContext(farmerGroupDetailsContext);

export { FarmerGroupDetailsContextProvider, useFarmerGroupDetailsContext };
