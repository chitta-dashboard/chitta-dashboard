import { FC } from "react";
import { DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";
import SubmitButton from "../../buttons/submit-button";
import { IDecisionsFormInput } from "../type/formInputs";

import S from "./body/addDecisionsModal.styled";

interface formProps extends Props {
  cb?: (data: IDecisionsFormInput) => void;
}

const schema = yup
  .object({
    decisionHeading: yup.string().required("required"),
    dob: yup.string().required("required"),
    qualification: yup.string().required("required"),
    decision: yup.string().required("required"),
  })
  .required();

const AddDecisionsModal: FC<formProps> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IDecisionsFormInput>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: IDecisionsFormInput) => {
    props.cb && props.cb(data);
    reset();
    if (props.handleClose) props.handleClose();
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
        addDecision={props.openModal}
      >
        <DialogTitle>
          <S.Title>Add Decisions</S.Title>
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
          <FormField openModal={props.openModal} register={register} error={errors} />
          <SubmitButton
            openModal={props.openModal}
            handleClose={() => {
              clearErrors();
              if (props.handleClose) props.handleClose();
            }}
            submit={onSubmit}
          />
        </form>
      </CustomModal>
    </>
  );
};
export default AddDecisionsModal;
