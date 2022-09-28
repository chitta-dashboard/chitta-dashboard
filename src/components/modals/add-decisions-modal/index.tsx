import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import SubmitButton from "../../buttons/submit-button";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { IAddDecisionsFormInput } from "../type/formInputs";

interface CustomProps {
  cb: (data: IAddDecisionsFormInput) => void;
  openModal: boolean;
  handleClose: () => void;
}

const schema = yup
  .object({
    decisionHeading: yup.string().required("required"),
    dob: yup.string().required("required"),
    selectAll: yup.string().nullable().required("required"),
    qualification: yup.string().required("required"),
    presenter: yup
      .array()
      .nullable()
      .test("test", "required", (value: any) => value && value.length > 0),
    participator: yup
      .array()
      .nullable()
      .test("test", "required", (value: any) => value && value.length > 0),
  })
  .required();

const AddDecisionsModal: FC<CustomProps> = ({ cb, openModal, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
    reset,
    trigger,
  } = useForm<IAddDecisionsFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: any = (data: IAddDecisionsFormInput) => {
    cb(data);
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
          <FormField register={register} errors={errors} setValue={setValue} trigger={trigger} />
        </ModalBody>

        <ModalFooter>
          <SubmitButton formId="addDecisions" handleSubmit={() => {}} />
        </ModalFooter>
      </CustomModal>
    </>
  );
};
export default AddDecisionsModal;
