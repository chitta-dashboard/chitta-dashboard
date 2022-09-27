import { FC } from "react";
import { useForm } from "react-hook-form";
import { DialogTitle } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Submit from "../../buttons/submit-button";
import CustomModal from "../../custom-modal";
import TitleCloseButton from "../../buttons/title-close-button";
import Props from "../type/modalProps";
import FormField from "./body/formField";
import { IDecisionsFormInput } from "../type/formInputs";

import S from "./body/addFarmersGroupModal.styled";

interface formProps extends Props {
  cb?: (data: IDecisionsFormInput) => void;
}

const schema = yup
  .object({
    groupName: yup.string().required("required"),
    explanation: yup.string().required("required"),
    chairman: yup.string().required("required"),
    treasurer: yup.string().required("required"),
    secretary: yup.string().required("required"),
  })
  .required();

const AddFarmersGroupModal: FC<formProps> = (props) => {
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
        label={""}
        openModal={props.openModal}
        handleClose={() => {
          clearErrors();
          reset();
          if (props.handleClose) props.handleClose();
        }}
      >
        <DialogTitle>
          <S.Title>Add Farmer's Group</S.Title>
          <TitleCloseButton
            label={""}
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
          <Submit label={""} openModal={props.openModal} />
        </form>
      </CustomModal>
    </>
  );
};
export default AddFarmersGroupModal;
