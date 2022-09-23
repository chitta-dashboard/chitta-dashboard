import { DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";
import SubmitButton from "../../buttons/submit-button";

import S from "./body/addDecisionsModal.styled";

export interface IFormInputs {
  decisionHeading: string;
  dob: string;
  qualification: string;
  decision: string;
}
const schema = yup
  .object({
    decisionHeading: yup.string().required("required"),
    dob: yup.string().required("required"),
    qualification: yup.string().required("required"),
    decision: yup.string().required("required"),
  })
  .required();

interface Temp {
  cb?: (data: { [input: string]: string }) => void;
}

const AddDecisionsModal = (props: Props & Temp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: any = (data: { [input: string]: string }) => {
    if (props.cb) props.cb(data);
    console.log("decision submitted");
    reset();
  };

  return (
    <>
      <CustomModal
        openModal={props.openModal}
        handleClose={() => {
          clearErrors();
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
          />
        </form>
      </CustomModal>
    </>
  );
};
export default AddDecisionsModal;
