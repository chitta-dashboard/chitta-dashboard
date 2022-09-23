import { useState } from "react";
import { DialogTitle} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddProfile from "../../../buttons/add-profile-icon-and-button";
import Next from "../../../buttons/next-button";
import Props from "../../type/modalProps";
import FormField from "./body/formField";
import PageNumber1 from "./body/pageNumber";
import AddFarmersDetailsModalPage2 from "../page-2-modal";
import CustomModal from "../../../custom-modal";
import TitleCloseButton from "../../../buttons/title-close-button";

import S from './body/page1Modal.styled'

interface IFormInputs {
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
const schema = yup
  .object({
    name: yup.string().required("required"),
    fatherName: yup.string().required("required"),
    sex: yup.string().required("required"),
    spouseName: yup.string().required("required"),
    dob: yup.string().required("required"),
    group: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    addhaarNo: yup.string().required("required"),
    voterIdNo: yup.string().required("required"),
    acre: yup.string().required("required"),
  })
  .required();

const AddFarmersDetailsModalPage1 = (props: Props) => {
  const [next, setNext] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: IFormInputs) => {
    nextPage();
  };
  const nextPage = () => {
    setNext(!next);
  };

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
        <AddProfile openModal={props.openModal} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField openModal={props.openModal} register={register} error={errors} />
          <PageNumber1 />
          <Next openModal={next} />
        </form>
      </CustomModal>
      <AddFarmersDetailsModalPage2 label={""} openModal={next} handleClose={nextPage} />
    </>
  );
};

export default AddFarmersDetailsModalPage1;
