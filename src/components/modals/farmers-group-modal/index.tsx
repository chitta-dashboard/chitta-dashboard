import * as yup from "yup";
import { FC, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { yupResolver } from "@hookform/resolvers/yup";
import { Control, useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { useFarmersGroupContext } from "../../../utils/context/farmersGroup";
import { IAddFarmersGroupFormInput } from "../type/formInputs";
import CustomModal from "../../custom-modal";
import FormField from "./body/formField";
import ModalHeader from "../../custom-modal/header";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import { Message } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";

interface CustomProps {
  cb: (data: IAddFarmersGroupFormInput & { id: string; members: string[] }) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
  members?: string[];
}

const schema = yup
  .object()
  .shape({
    groupName: yup.string().required("required"),
    explanation: yup.string().required("required"),
    chairman: yup.string().required("required").nullable(),
    treasurer: yup.string().required("required").nullable(),
    secretary: yup.string().required("required").nullable(),
  })
  .required();

const FarmersGroupModal: FC<CustomProps> = (props) => {
  const { openModal, handleClose, cb, editMode = false, id = "", members = [] } = props;
  const { farmersGroupById } = useFarmersGroupContext();
  const { addNotification } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    setValue,
    trigger,
    unregister: formUnregister,
    getValues: formGetValues,
    control: formControl,
    watch,
  } = useForm<IAddFarmersGroupFormInput>({
    resolver: yupResolver(schema),
  });

  // for enabling the submit button
  const groupNameEvent = watch("groupName");
  const explanationEvent = watch("explanation");
  const chairmanEvent = watch("chairman");
  const treasurerEvent = watch("treasurer");
  const secretaryEvent = watch("secretary");
  let enableButton = true;

  if (groupNameEvent && explanationEvent && chairmanEvent && treasurerEvent && secretaryEvent) {
    enableButton = false;
  } else {
    enableButton = true;
  }

  useEffect(() => {
    if (editMode) {
      let groupData = Object.values(farmersGroupById).find((f) => String(f.id) === id);
      reset({
        groupName: groupData?.groupName as string,
        explanation: groupData?.explanation as string,
        chairman: groupData?.chairman as string,
        treasurer: groupData?.treasurer as string,
        secretary: groupData?.secretary as string,
      });
    }
    return () =>
      reset({
        groupName: "",
        explanation: "",
        chairman: "",
        treasurer: "",
        secretary: "",
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const onSubmit: any = (data: IAddFarmersGroupFormInput & { id: string; members: string[] }) => {
    cb({ ...data, id: editMode ? id : uuidv4(), members: members });
    !editMode && addNotification({ id: data.id, message: Message(data.groupName).addFarmGroup });
    !editMode && reset();
    !editMode && handleClose();
  };

  return (
    <CustomModal
      openModal={openModal}
      handleClose={() => {
        clearErrors();
        reset();
        handleClose();
      }}
    >
      <ModalHeader
        handleClose={() => {
          clearErrors();
          reset();
          handleClose();
        }}
      >
        {editMode ? "Edit Farmer's Group" : "Add Farmer's Group"}
      </ModalHeader>

      <ModalBody id={"farmersGroup"} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          register={register}
          errors={errors}
          setValue={setValue}
          trigger={trigger}
          control={formControl as unknown as Control}
          getValues={formGetValues}
          unregister={formUnregister}
        />
      </ModalBody>

      <ModalFooter>
        <Button form="farmersGroup" type="submit" disabled={enableButton}>
          Submit
        </Button>
      </ModalFooter>
    </CustomModal>
  );
};
export default FarmersGroupModal;
