import { FC, useState } from "react";
import { DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddProfile from "../../buttons/add-profile-icon-and-button";
import Next from "../../buttons/next-button";
import Props from "../type/modalProps";
import FormField from "./page-1-modal/body/formField";
import FormFieldPage2 from "./page-2-modal/body/formField";
import PageNumber1 from "./page-1-modal/body/pageNumber";
import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";

import PageNumber2 from "./page-2-modal/body/pageNumber";
import BackButton from "../../buttons/back-button";
import SubmitButton from "../../buttons/submit-button";
import { IDecisionsFormInput } from "../type/formInputs";

import S from "./page-1-modal/body/page1Modal.styled";

interface formProps extends Props {
  cb?: (data: IDecisionsFormInput) => void;
}

const form1Schema = yup
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

const form2Schema = yup.object({
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
});

const AddFarmersDetailsModal: FC<formProps> = (props) => {
  const [next, setNext] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    register: form1Register,
    handleSubmit: form1handleSubmit,
    formState: { errors: form1Errors },
    clearErrors: form1ClearErrors,
    reset: form1reset,
  } = useForm<IDecisionsFormInput>({
    resolver: yupResolver(form1Schema),
  });

  const {
    register: form2Register,
    handleSubmit: form2HandleSubmit,
    formState: { errors: form2Errors },
    clearErrors: form2ClearErrors,
    reset: form2Reset,
  } = useForm<IDecisionsFormInput>({
    resolver: yupResolver(form2Schema),
  });

  const form1Submit: any = (data: IDecisionsFormInput) => {
    setFormData(data);
    nextPage();
  };

  const form2Submit: any = (data: IDecisionsFormInput) => {
    setFormData(Object.assign(data, formData));
    props.cb && props.cb(formData as IDecisionsFormInput);
    form1reset();
    form2Reset();
    nextPage();
    if (props.handleClose) props.handleClose();
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
          form2ClearErrors();
          form1ClearErrors();
          form1reset();
          form2Reset();
          setNext(false);
          if (props.handleClose) props.handleClose();
        }}
      >
        <DialogTitle>
          <S.Title>Add Farmer's Details</S.Title>
          <TitleCloseButton
            label={""}
            openModal={props.openModal}
            handleClose={() => {
              form2ClearErrors();
              form1ClearErrors();
              if (props.handleClose) props.handleClose();
              form1reset();
              form2Reset();
              setNext(false);
            }}
          />
        </DialogTitle>
        <AddProfile openModal={props.openModal} />
        {next ? (
          <>
            <form onSubmit={form2HandleSubmit(form2Submit)}>
              <FormFieldPage2 openModal={props.openModal} register={form2Register} error={form2Errors} />
              <PageNumber2 />
              <S.ButtonContainer>
                <BackButton
                  openModal={props.openModal}
                  handleClose={() => {
                    form2ClearErrors();
                    setNext(!next);
                  }}
                />
                <SubmitButton openModal={props.openModal} submit={form2Submit} />
              </S.ButtonContainer>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={form1handleSubmit(form1Submit)}>
              <FormField openModal={props.openModal} register={form1Register} error={form1Errors} />
              <PageNumber1 />
              <Next openModal={next} submit={form1Submit} />
            </form>
          </>
        )}
      </CustomModal>
    </>
  );
};

export default AddFarmersDetailsModal;
