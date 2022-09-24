import { DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddProfile from "../../buttons/add-profile-icon-and-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import Submit from "../../buttons/submit-button";
import TitleCloseButton from "../../buttons/title-close-button";
import Chips from "../../input-fields/chips";

import S from "./body/addMdDetailsModal.styled";

interface IFormInputs {
  name: string;
  phoneNumber: string;
  qualification: string;
  dob: string;
  signature: string;
}
const schema = yup
  .object({
    name: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    qualification: yup.string().required("required"),
    dob: yup.string().required("required"),
    signature: yup.mixed().test("required", "You need to provide a file", (file: any) => file.length !== 0),
  })
  .required();

const AddMdDetailsModal = (props: Props) => {
  const [formData, setFormData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: IFormInputs) => {
    reset();
    console.log(data);
    setFormData(data.signature);
  };
  return (
    <>
      <CustomModal
        openModal={props.openModal}
        handleClose={() => {
          clearErrors();
          reset();
          if (props.handleClose) props.handleClose();
        }}
      >
        <DialogTitle>
          <S.Title>Add MD Details</S.Title>
          <TitleCloseButton
            openModal={props.openModal}
            handleClose={() => {
              clearErrors();
              reset();
              if (props.handleClose) props.handleClose();
            }}
          />
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddProfile openModal={props.openModal} register={register} error={errors} />
          <FormField openModal={props.openModal} register={register} error={errors} />

          {formData ? (
            <S.ChipContainer>
              <Chips
                label={formData}
                openModal={props.openModal}
                handleClose={() => {
                  clearErrors();
                  if (props.handleClose) props.handleClose();
                }}
              />
            </S.ChipContainer>
          ) : (
            <></>
          )}
          <Submit
            openModal={props.openModal}
            handleClose={() => {
              clearErrors();
              if (props.handleClose) props.handleClose();
            }}
          />
        </form>
      </CustomModal>
    </>
  );
};

export default AddMdDetailsModal;
