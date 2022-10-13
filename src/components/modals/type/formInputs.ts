export interface IAddDecisionsFormInput {
  selectAll: string;
  decisionHeading: string;
  creationTime: string;
  groupName: string;
  presenter: string[];
  participator: string[];
  description: string;
  descriptionRichText: string;
}

export interface IAddFarmersDetailsPage1Input {
  name: string;
  fatherName: string;
  sex: string;
  spouseName: string;
  dob: string;
  group: string;
  phoneNumber: string;
  addhaarNo: string;
  profile: string;
  surveyNo: { [key: string]: string };
  acre: { [key: string]: string };
  border: { [key: string]: string };

  [dynamicInputs: string]: string | string[] | { [key: string]: string };
}

export interface IAddFarmersDetailsPage2Input {
  education: string;
  village: string;
  postalNo: string;
  address: string;
  taluk: string;
  district: string;
  landType: string;
  waterType: string;
  farmerType: string;
  animals: string;
  groupMember: string;
}

export interface IAddFarmersDetailsFormInput extends IAddFarmersDetailsPage1Input, IAddFarmersDetailsPage2Input {}

export interface IAddFarmersGroupFormInput {
  groupName: string;
  explanation: string;
  chairman: string;
  treasurer: string;
  secretary: string;
}

export interface IAddMDDetailsFormInput {
  name: string;
  phoneNumber: string;
  qualification: string;
  dob: string;
  signature: string;
  profile: string;
}

export interface IAddCEODetailsFormInput {
  name: string;
  phoneNumber: string;
  qualification: string;
  dob: string;
  profile: string;
  description: string;
}
