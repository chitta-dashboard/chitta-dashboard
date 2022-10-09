import { useForm } from "react-hook-form";
import { Stack } from "@mui/material";
import { FC, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import CustomModal from "../../custom-modal";
import ModalHeader from "../../custom-modal/header";
import { IAddMDDetailsFormInput } from "../type/formInputs";
import { useMdDetailsContext } from "../../../utils/context/mdDetails";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";
import TableData from "./body/tableData";
import { fileValidation } from "../../../utils/constants";
import SearchBar from "../../common-components/search-bar";

interface CustomProps {
  openModal: boolean;
  handleClose: () => void;
  cb: (data: IAddMDDetailsFormInput & { id: string }) => void;
  editMode?: boolean;
  id?: string;
}

const schema = yup
  .object({
    name: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
    qualification: yup.string().required("required"),
    dob: yup.string().required("required"),
    signature: yup
      .mixed()
      .test("signatureTest1", "required", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return file?.size > 0;
      })
      .test("signatureTest2", "expected format: .jpg, .jpeg, .png", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return fileValidation(file ? file?.name : "");
      }),
    profile: yup
      .mixed()
      .test("profileTest1", "required", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return file?.size > 0;
      })
      .test("profileTest2", "expected format: .jpg, .jpeg, .png", (file: File) => {
        if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
        return fileValidation(file ? file?.name : "");
      }),
  })
  .required();

const MdDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  let { mdList } = useMdDetailsContext();

  const { handleSubmit, reset, clearErrors } = useForm<IAddMDDetailsFormInput>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (editMode) {
      let userData = mdList.find((md) => String(md.id) === id);
      reset({
        name: userData?.name as string,
        phoneNumber: userData?.phoneNumber as unknown as string,
        qualification: userData?.qualification as string,
        dob: userData?.dob as string,
        signature: "", // temporary, until sbucket integration
        profile: "", // temporary, until sbucket integration
      });
    }

    return () =>
      reset({
        name: "",
        phoneNumber: "",
        qualification: "",
        dob: "",
        signature: "",
        profile: "",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);
  // }, [editMode, id]);

  const onSubmit: any = (data: IAddMDDetailsFormInput & { id: string }) => {
    cb({ ...data, id: editMode ? id : uuidv4() } as IAddMDDetailsFormInput & { id: string });
    handleClose();
    reset();
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
        Add MD Details
      </ModalHeader>
      <ModalBody id="mdDetails" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <SearchBar />
          <TableData />
          {/* <FormField register={register} errors={errors} setValue={setValue} trigger={trigger} setError={setError} clearErrors={clearErrors} /> */}
        </Stack>
      </ModalBody>
      <ModalFooter>{/* <Submit formId="mdDetails" handleSubmit={() => {}} /> */}</ModalFooter>
    </CustomModal>
  );
};

export default MdDetailsModal;
