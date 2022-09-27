import { useForm } from "react-hook-form";
import React, { FC, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddProfile from "../../buttons/add-profile-icon-and-button";
import FormField from "./body/formField";
import CustomModal from "../../custom-modal";
import Submit from "../../buttons/submit-button";
import Chips from "../../input-fields/chips";

import S from "./body/addMdDetailsModal.styled";
import ModalHeader from "../../custom-modal/header";
import { IAddMDDetailsFormInput } from "../type/formInputs";

interface CustomProps extends IAddMDDetailsFormInput {

  openModal?: boolean;
  handleClose?: () => void;
}
const schema = yup
  .object({
    name: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    qualification: yup.string().required("required"),
    dob: yup.string().required("required"),
    signature: yup.mixed().test("required", "photo is required", (value) => {
      console.log(value);
      return value.length > 0;
    }),
  })
  .required();

const AddMdDetailsModal: FC<CustomProps> = ({ openModal, handleClose }) => {
  const [formData, setFormData] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm<CustomProps>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: CustomProps) => {
    reset();
    console.log("data", data);
    // setFormData(data.signature);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFormData(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <CustomModal
        openModal={openModal}
        handleClose={() => {
          clearErrors();
          reset();
          if (handleClose) handleClose();
        }}
      >
        <ModalHeader
          handleClose={() => {
            clearErrors();
            reset();
            if (handleClose) handleClose();
          }}
        >
          Add MD Details
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AddProfile />
          <FormField />

          {formData ? (
            <S.ChipContainer>
              <Chips
                label={formData}
                handleClose={() => {
                  clearErrors();
                  if (handleClose) handleClose();
                }}
              />
            </S.ChipContainer>
          ) : (
            <></>
          )}
          <Submit
            openModal={openModal}
            handleClose={() => {
              clearErrors();
              if (handleClose) handleClose();
            }}
          />
        </form>
      </CustomModal>
    </>
  );
};

export default AddMdDetailsModal;
