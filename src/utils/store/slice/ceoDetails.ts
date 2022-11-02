import { createSlice } from "@reduxjs/toolkit";

export interface ICeoDetail {
  id: string;
  name: string;
  profile: string;
  dob: string;
  phoneNumber: string;
  qualification: string;
  description: string;
  joinedDate?: string;
}

export interface ICeoDetailSlice {
  ceoDetailsById: { [id: string]: ICeoDetail };
}

const initialState: ICeoDetailSlice = {
  ceoDetailsById: {
    // "1": {
    //   id: "1",
    //   profile: profileImg,
    //   name: "goku",
    //   phoneNumber: "8610010875",
    //   dob: "10-08-1986",
    //   qualification: "B.E.agri",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit. ",
    //   joinedDate: "oct 20 1989",
    // },
    // "2": {
    //   id: "2",
    //   profile: profileImg,
    //   name: "vegeta",
    //   phoneNumber: "8610010875",
    //   dob: "10-08-1982",
    //   qualification: "B.E.agri",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing consectetur adipisicing consectetur adipisicing elit consectetur adipisicing elit.  ",
    //   joinedDate: "oct 20 1989",
    // },
  },
};

const ceoDetailsSlice = createSlice({
  name: "ceoDetails",
  initialState,
  reducers: {},
});

// export const { } = ceoDetailsSlice.actions;
export const ceoDetailsReducer = ceoDetailsSlice.reducer;
