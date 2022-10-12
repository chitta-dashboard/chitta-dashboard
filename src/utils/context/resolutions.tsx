import React, { createContext, useContext, useReducer } from "react";

//ACTION TYPES
const ADD_RESOLUTION = "ADD_RESOLUTION";

export interface IResolution {
  id: string;
  groupName: string;
  groupTitle: string;
  timestamp: string;
  creationTime: string;
  groupDescription: string;
  groupDescriptionRichText?: string;
  presenter: string[];
  participator: string[];
}

interface IContextType {
  resolutions: { [id: string]: IResolution };
  addResolution: (resolution: IResolution) => void;
}

interface PropType {
  children: JSX.Element | JSX.Element[];
}

const initialState: IContextType = {
  resolutions: {
    "61ef4c82-3629-41ea-bbbe-6ec2ffdfce73": {
      id: "61ef4c82-3629-41ea-bbbe-6ec2ffdfce73",
      groupName: "Group - 1",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:30",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
    "3c0bc080-4e1c-40e5-86d2-9f1225287124": {
      id: "3c0bc080-4e1c-40e5-86d2-9f1225287124",
      groupName: "Group - 2",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:29",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
    "05ee8b0c-cbcb-45a9-bb3b-0866077b8374": {
      id: "05ee8b0c-cbcb-45a9-bb3b-0866077b8374",
      groupName: "Group - 3",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet ingilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:28",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
    "2f81d92f-daa4-47bc-a937-65009ef33c78": {
      id: "2f81d92f-daa4-47bc-a937-65009ef33c78",
      groupName: "Group - 4",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:27",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
    "1241d6fe-8f3f-47aa-a47f-5448a5e7fb8f": {
      id: "1241d6fe-8f3f-47aa-a47f-5448a5e7fb8f",
      groupName: "Group - 5",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:26",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
    "4581e5c2-b7f9-4f66-9432-b11d92e9d05b": {
      id: "4581e5c2-b7f9-4f66-9432-b11d92e9d05b",
      groupName: "Group - 6",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:25",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
    "7b8d005b-2ff2-432d-939e-e355592841b4": {
      id: "7b8d005b-2ff2-432d-939e-e355592841b4",
      groupName: "Group - 7",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent elementum facilisi",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:24",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
    "a39752e8-f070-4e59-9eb9-499f1008ee02": {
      id: "a39752e8-f070-4e59-9eb9-499f1008ee02",
      groupName: "Group - 8",
      groupTitle: "Certified true copy of the resolution passed",
      groupDescription:
        "Certified true copy of the resolution passed at the meeeting of the board of directors of nerkathir farmer producer company limited held on 16/03/22 at chennai, elit ut aliquam purus sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non enim praesent",
      timestamp: "Mar 16,2022, 10:30 AM",
      creationTime: "2022-03-16T10:23",
      presenter: ["person1", "person2", "person3"],
      participator: ["person1", "person2", "person3"],
    },
  },
  addResolution: () => {},
};

const resolutionsContext = createContext<IContextType>(initialState);

const reducer = (state: IContextType, action: { type: string; payload: any }) => {
  switch (action.type) {
    case ADD_RESOLUTION:
      return { ...state, resolutions: { ...state.resolutions, [action.payload.id]: action.payload } };

    default: {
      throw new Error(`Unknown type: ${action.type}`);
    }
  }
};

const ResolutionsProvider: React.FC<PropType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addResolution = (resolution: IResolution) => {
    dispatch({ type: ADD_RESOLUTION, payload: resolution });
  };

  const data = {
    ...state,
    addResolution,
  };

  return <resolutionsContext.Provider value={data}>{children}</resolutionsContext.Provider>;
};

const useResolutionsProviderContext = () => useContext(resolutionsContext);

export { ResolutionsProvider, useResolutionsProviderContext };
