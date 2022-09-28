export interface IDecisionsFormInput {
  signature: string;
  image: string;
  file: any;
  files: any;
}

export interface IAddDecisionsFormInput {
  selectAll: boolean;
  decisionHeading: string;
  dob: string;
  qualification: string;
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
  voterIdNo: string;
  acre: string;
}

export interface IAddFarmersDetailsPage2Input {
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
}
