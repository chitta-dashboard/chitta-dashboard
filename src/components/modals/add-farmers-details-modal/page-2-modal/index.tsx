import { DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomModal from "../../../custom-modal";
import TitleCloseButton from "../../../buttons/title-close-button";
import Props from "../../type/modalProps";
import FormField from "./body/formField";
import PageNumber2 from "./body/pageNumber";

import S from "./body/page2Modal.styled";
import BackButton from "../../../buttons/back-button";
import SubmitButton from "../../../buttons/submit-button";

interface IFormInputs {
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
const schema = yup
  .object({
    education: yup.string().required("required"),
    village: yup.string().required("required"),
    postalNo: yup.string().required("required"),
    address: yup.string().required("required"),
    taluk: yup.string().required("required"),
    district: yup.string().required("required"),
    surveyNo: yup.string().required("required"),
    landType: yup.string().required("required"),
    waterType: yup.string().required("required"),
    farmerType: yup.string().required("required"),
    seedType: yup.string().required("required"),
    animals: yup.string().required("required"),
    groupMember: yup.string().required("required"),
  })
  .required();

const AddFarmersDetailsModalPage2 = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: IFormInputs) => {};
  return (
    <>
      <CustomModal
        label={""}
        openModal={props.openModal}
        handleClose={() => {
          clearErrors();
          if (props.handleClose) props.handleClose();
        }}
      >
        <DialogTitle>
          <S.Title>Add Farmer's Details</S.Title>
          <TitleCloseButton
            label={""}
            openModal={props.openModal}
            handleClose={() => {
              clearErrors();
              if (props.handleClose) props.handleClose();
            }}
          />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField openModal={props.openModal} register={register} error={errors} />
          <PageNumber2 />
          <S.ButtonContainer>
            <BackButton
              openModal={props.openModal}
              handleClose={() => {
                clearErrors();
                if (props.handleClose) props.handleClose();
              }}
            />
            <SubmitButton openModal={props.openModal} />
          </S.ButtonContainer>
        </form>
      </CustomModal>
    </>
  );
};

export default AddFarmersDetailsModalPage2;
