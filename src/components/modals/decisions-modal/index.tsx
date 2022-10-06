import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { IAddDecisionsFormInput } from "../type/formInputs";
import { createTimeStamp, getCurrentTime } from "../../../utils/constants";
import { IDecision } from "../../../utils/context/decisionsContext";
import { Button } from "@mui/material";

interface CustomProps {
  cb: (data: IDecision) => void;
  openModal: boolean;
  handleClose: () => void;
}

const schema = yup
  .object({
    decisionHeading: yup.string().required("required"),
    creationTime: yup.string().required("required"),
    selectAll: yup.string().nullable().required("required"),
    groupName: yup.string().required("required"),
    presenter: yup
      .array()
      .nullable()
      .test("test", "required", (value: any) => value && value.length > 0),
    participator: yup
      .array()
      .nullable()
      .test("test", "required", (value: any) => value && value.length > 0),
    description: yup.string().required("required"),
    descriptionRichText: yup.string().required("required"),
  })
  .required();

const DecisionsModal: FC<CustomProps> = ({ cb, openModal, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
    trigger,
    control,
  } = useForm<IAddDecisionsFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: any = (data: IAddDecisionsFormInput) => {
    cb({
      id: uuidv4(),
      groupName: data.groupName,
      groupTitle: data.decisionHeading,
      groupDescription: data.description,
      groupDescriptionRichText: data.descriptionRichText,
      timestamp: createTimeStamp(data.creationTime),
      creationTime: getCurrentTime(),
    });
    reset();
    handleClose();
  };

  return (
    <>
      <CustomModal
        openModal={openModal}
        handleClose={() => {
          clearErrors();
          reset();
          handleClose();
        }}
        openAddDecisionModal={true}
      >
        <ModalHeader
          handleClose={() => {
            clearErrors();
            reset();
            handleClose();
          }}
        >
          Add Decisions
        </ModalHeader>

        <ModalBody id="addDecisions" onSubmit={handleSubmit(onSubmit)}>
          <FormField register={register} errors={errors} setValue={setValue} trigger={trigger} control={control} />
        </ModalBody>

        <ModalFooter>
          <Button form="addDecisions" type="submit">
            Submit
          </Button>
        </ModalFooter>
      </CustomModal>
    </>
  );
};
export default DecisionsModal;
