import { createSlice } from "@reduxjs/toolkit";

 interface IResolution {
  id: string;
  groupName: string;
  groupTitle: string;
  // the time that user selects as the resolution creation date
  timestamp: string;
  // the actual time in which the resolution is added to database(i.e: context)
  creationTime: string;
  groupDescription: string;
  groupDescriptionRichText?: string;
  presenter: string[];
  participator: string[];
}

 interface IResolutions {
  [id: string]: IResolution;
}

 interface IResolutionSlice {
  resolutions: IResolutions;
  tab: "tree" | "list";
}

const initialState: IResolutionSlice = {
  resolutions: {
    // "61ef4c82-3629-41ea-bbbe-6ec2ffdfce73": {
    //   id: "61ef4c82-3629-41ea-bbbe-6ec2ffdfce73",
    //   groupName: "விவசாயிகள் சங்கம்-1",
    //   groupTitle: "Certified true copy of the resolution passed",
    //   groupDescription:
    //     "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
    //   timestamp: "Mar 16,2022, 10:30 AM",
    //   creationTime: "2022-03-16T10:30",
    //   presenter: ["person 1", "person 2", "person 3"],
    //   participator: ["person 1", "person 2", "person 3"],
    // },
    // "3c0bc080-4e1c-40e5-86d2-9f1225287124": {
    //   id: "3c0bc080-4e1c-40e5-86d2-9f1225287124",
    //   groupName: "விவசாயிகள் சங்கம்-2",
    //   groupTitle: "Certified true copy of the resolution passed",
    //   groupDescription:
    //     "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
    //   timestamp: "Mar 16,2022, 10:30 AM",
    //   creationTime: "2022-03-16T10:29",
    //   presenter: ["person 1", "person 2", "person 3"],
    //   participator: ["person 1", "person 2", "person 3"],
    // },
    // "05ee8b0c-cbcb-45a9-bb3b-0866077b8374": {
    //   id: "05ee8b0c-cbcb-45a9-bb3b-0866077b8374",
    //   groupName: "விவசாயிகள் சங்கம்-3",
    //   groupTitle: "Certified true copy of the resolution passed",
    //   groupDescription:
    //     "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet ingilla urna porttitor rhoncus dolor purus non enim praesent",
    //   timestamp: "Mar 16,2022, 10:30 AM",
    //   creationTime: "2022-03-16T10:28",
    //   presenter: ["person 1", "person 2", "person 3"],
    //   participator: ["person 1", "person 2", "person 3"],
    // },
    // "2f81d92f-daa4-47bc-a937-65009ef33c78": {
    //   id: "2f81d92f-daa4-47bc-a937-65009ef33c78",
    //   groupName: "~All Groups~",
    //   groupTitle: "Certified true copy of the resolution passed",
    //   groupDescription:
    //     "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
    //   timestamp: "Mar 16,2022, 10:30 AM",
    //   creationTime: "2022-03-16T10:27",
    //   presenter: ["person 1", "person 2", "person 3"],
    //   participator: ["person 1", "person 2", "person 3"],
    // },
    // "4h94k17g-daa4-47bc-a937-65009ef33c78": {
    //   id: "4h94k17g-daa4-47bc-a937-65009ef33c78",
    //   groupName: "~All Groups~",
    //   groupTitle: "Certified true copy of the resolution passed",
    //   groupDescription:
    //     "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
    //   timestamp: "Mar 16,2022, 10:30 AM",
    //   creationTime: "2022-03-16T10:27",
    //   presenter: ["person 1", "person 2", "person 3"],
    //   participator: ["person 1", "person 2", "person 3"],
    // },
  },
  tab: "tree",
};

const resolutionSlice = createSlice({
  name: "resolution",
  initialState,
  reducers: {
    addResolution: (state, { payload }) => {
      if (state.resolutions[payload.id] !== undefined) throw new Error("Another resolution with same ID already exist.");
      else state.resolutions[payload.id] = payload;
    },
    deleteResolution: (state, { payload }) => {
      delete state.resolutions[payload];
    },
    editResolution: (state, { payload: { resolutionId, resolution } }) => {
      state.resolutions[resolutionId] = resolution;
    },
    changeTab: (state, { payload }: { payload: "tree" | "list" }) => {
      state.tab = payload;
    },
  },
});

 const { addResolution, deleteResolution, editResolution, changeTab } = resolutionSlice.actions;
export const resolutionReducer = resolutionSlice.reducer;
