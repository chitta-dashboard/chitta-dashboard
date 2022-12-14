export interface IResolutionFormInput {
  selectAll: string;
  resolutionHeading: string;
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
  qualification: string;
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

export interface IAddFarmersDetailsPage3Input {
  nameAsPerBank: string;
  bankName: string;
  accountNumber: string;
  confirmAccountNumber?: string;
  ifscCode: string;
}

export interface IAddFarmersDetailsFormInput extends IAddFarmersDetailsPage1Input, IAddFarmersDetailsPage2Input {}

export interface IAddFarmersGroupFormInput {
  groupName: string;
  explanation: string;
  chairman: string;
  treasurer: string;
  secretary: string;
  id?: string;
  members?: string[];
}
export interface IProductVarient {
  variantId: string;
  productDescription: string;
  startDate: string;
  endDate: string;
  availableAmount: string;
  qualityGrade: string;
  timestamp: number;
}

export interface IAddProductsFormInput extends IProductVarient {
  productName: string;
  products: string[];
  foodType: string;
  profile: string;
  variantName: string;
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
  joinedDate: string;
}
export interface IAddFounderDetailsFormInput {
  name: string;
  phoneNumber: string;
  qualification: string;
  dob: string;
  profile: string;
  description: string;
  joinDate: string;
}
