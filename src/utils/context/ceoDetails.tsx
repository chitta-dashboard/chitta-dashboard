import React, { createContext, FC, useContext, useReducer } from "react";
import profileImg from "../../assets/images/Founder.png";

//ACTION TYPES
const ADD_CEO_DETAIL = "ADD_CEO_DETAIL";
const EDIT_CEO_DETAIL = "EDIT_CEO_DETAIL";
const DELETE_CEO_DETAIL = "DELETE_CEO_DETAIL";

export type ceoDetail = {
  id: string;
  name: string;
  profile?: string;
  dob: string;
  phoneNumber: string;
  qualification: string;
  description: string;
  joinedDate?: string;
};

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

interface ceoDetailsContextType {
  ceoDetailsById: { [id: string]: ceoDetail };
  addCeoDetail: (data: ceoDetail) => void;
  editCeoDetail: (data: ceoDetail) => void;
  deleteCeoDetail: (id: string) => void;
}

const initialState: ceoDetailsContextType = {
  ceoDetailsById: {
    "1": {
      id: "1",
      profile: profileImg,
      name: "goku",
      phoneNumber: "8610010875",
      dob: "1986-08-10",
      qualification: "B.E.agri",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit. ",
      joinedDate: "oct 20 1989",
    },
    "2": {
      id: "2",
      profile: profileImg,
      name: "vegeta",
      phoneNumber: "8610010875",
      dob: "1982-08-10",
      qualification: "B.E.agri",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit. ",
      joinedDate: "oct 20 1989",
    },
  },
  addCeoDetail: () => {},
  editCeoDetail: () => {},
  deleteCeoDetail: () => {},
};

const reducer = (state: ceoDetailsContextType, action: any) => {
  switch (action.type) {
    case ADD_CEO_DETAIL:
      return { ...state, ceoDetailsById: { ...state.ceoDetailsById, [action.payload.id]: action.payload } };

    case EDIT_CEO_DETAIL:
      return { ...state, ceoDetailsById: { ...state.ceoDetailsById, [action.payload.id]: action.payload } };

    case DELETE_CEO_DETAIL:
      delete state.ceoDetailsById[action.payload];
      return { ...state, ceoDetailsById: { ...state.ceoDetailsById } };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const ceoDetailsContext = createContext<ceoDetailsContextType>(initialState);

const CeoDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addCeoDetail = (data: ceoDetail) => {
    dispatch({ type: ADD_CEO_DETAIL, payload: data });
  };

  const editCeoDetail = (data: ceoDetail) => {
    dispatch({ type: EDIT_CEO_DETAIL, payload: data });
  };

  const deleteCeoDetail = (id: string) => {
    dispatch({ type: DELETE_CEO_DETAIL, payload: id });
  };

  let data = {
    ...state,
    addCeoDetail,
    editCeoDetail,
    deleteCeoDetail,
  };

  return <ceoDetailsContext.Provider value={data}>{props.children}</ceoDetailsContext.Provider>;
};

const useCeoDetailsContext = () => useContext(ceoDetailsContext);

export { CeoDetailsContextProvider, useCeoDetailsContext };
