import React, { createContext, FC, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import profileImg from "../../assets/images/nerkathir-user.svg";

//ACTION TYPES
const ADD_CEO_DETAIL = "ADD_CEO_DETAIL";
const EDIT_CEO_DETAIL = "EDIT_CEO_DETAIL";
const DELETE_CEO_DETAIL = "DELETE_CEO_DETAIL";
const CEO_DATA = "CEO_DATA";

export type ceoDetail = {
  id: string;
  name: string;
  profile: string;
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
  // ceoDetailsById: {
  //   "1": {
  //     id: "1",
  //     profile: profileImg,
  //     name: "goku",
  //     phoneNumber: "8610010875",
  //     dob: "10-08-1986",
  //     qualification: "B.E.agri",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit. ",
  //     joinedDate: "oct 20 1989",
  //   },
  //   "2": {
  //     id: "2",
  //     profile: profileImg,
  //     name: "vegeta",
  //     phoneNumber: "8610010875",
  //     dob: "10-08-1982",
  //     qualification: "B.E.agri",
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit consectetur adipisicing elit.  ",
  //     joinedDate: "oct 20 1989",
  //   },
  // },
  ceoDetailsById: {},
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

    case CEO_DATA:
      // console.log(action.payload);
      return { ...state, ceoDetailsById: action.payload };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

export const ceoDetailsContext = createContext<ceoDetailsContextType>(initialState);

const CeoDetailsContextProvider: FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: ceoData } = useQuery(["ceo"], () => axios.get("http://localhost:5001/ceo"));

  // console.log("ceoData", ceoData?.data);

  useEffect(() => {
    ceoData && fetchCeoData(ceoData?.data);
  }, [ceoData]);

  const fetchCeoData = (data: ceoDetail) => {
    dispatch({ type: CEO_DATA, payload: data });
  };

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
