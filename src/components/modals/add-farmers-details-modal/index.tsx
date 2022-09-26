import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AddProfile from "../../buttons/add-profile-icon-and-button";
import Next from "../../buttons/next-button";
import FormField from "./page-1-modal/body/formField";
import FormFieldPage2 from "./page-2-modal/body/formField";
import PageNumber1 from "./page-1-modal/body/pageNumber";
import CustomModal from "../../custom-modal";

import PageNumber2 from "./page-2-modal/body/pageNumber";
import BackButton from "../../buttons/back-button";
import SubmitButton from "../../buttons/submit-button";
import { IAddFarmersDetailsFormInput } from "../type/formInputs";

import S from "./page-1-modal/body/page1Modal.styled";
import ModalHeader from "../../custom-modal/header";

interface CustomProps extends IAddFarmersDetailsFormInput {
  cb: (data: IAddFarmersDetailsFormInput) => void;
  openModal: boolean;
  handleClose: () => void;
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

const AddFarmersDetailsModal: FC<CustomProps> = ({ openModal, handleClose }) => {
  const [next, setNext] = useState(false);
  const [formData, setFormData] = useState({});

  const {
    register: form1Register,
    handleSubmit: form1handleSubmit,
    formState: { errors: form1Errors },
    clearErrors: form1ClearErrors,
    reset: form1reset,
  } = useForm<CustomProps>({
    resolver: yupResolver(form1Schema),
  });

  const {
    register: form2Register,
    handleSubmit: form2HandleSubmit,
    formState: { errors: form2Errors },
    clearErrors: form2ClearErrors,
    reset: form2Reset,
  } = useForm<CustomProps>({
    resolver: yupResolver(form2Schema),
  });

  const form1Submit: any = (data: CustomProps) => {
    setFormData(data);
    nextPage();
  };

  const form2Submit: any = (data: CustomProps) => {
    setFormData(Object.assign(data, formData));
    cb && cb(formData as CustomProps);
    form1reset();
    form2Reset();
    nextPage();
    if (handleClose) handleClose();
  };

  const nextPage = () => {
    setNext(!next);
  };

  return (
    <>
      <CustomModal
        openModal={openModal}
        handleClose={() => {
          form2ClearErrors();
          form1ClearErrors();
          form1reset();
          form2Reset();
          setNext(false);
          if (handleClose) handleClose();
        }}
      >
        <ModalHeader
          handleClose={() => {
            form2ClearErrors();
            form1ClearErrors();
            if (handleClose) handleClose();
            form1reset();
            form2Reset();
            setNext(false);
          }}
        >
          Add Farmer's Details
        </ModalHeader>

        <AddProfile />
        {next ? (
          <>
            <form onSubmit={form2HandleSubmit(form2Submit)}>
              <FormFieldPage2 register={form2Register} errors={form2Errors} />
              <PageNumber2 />
              <S.ButtonContainer>
                <BackButton
                  handleClose={() => {
                    form2ClearErrors();
                    setNext(!next);
                  }}
                />
                <SubmitButton submit={form2Submit} />
              </S.ButtonContainer>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={form1handleSubmit(form1Submit)}>
              <FormField register={form1Register} errors={form1Errors} />
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
