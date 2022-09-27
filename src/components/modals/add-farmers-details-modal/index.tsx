import { FC, useEffect, useState } from "react";
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
import { IAddFarmersDetailsFormInput, IAddFarmersDetailsPage1Input, IAddFarmersDetailsPage2Input } from "../type/formInputs";

import S from "./page-1-modal/body/page1Modal.styled";
import ModalHeader from "../../custom-modal/header";
import { useFarmerDetailsContext } from "../../../utils/context/farmers-details";
import ModalBody from "../../custom-modal/body";
import ModalFooter from "../../custom-modal/footer";

interface CustomProps {
  cb: (data: IAddFarmersDetailsFormInput) => void;
  openModal: boolean;
  handleClose: () => void;
  editMode?: boolean;
  id?: string;
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

const AddFarmersDetailsModal: FC<CustomProps> = ({ openModal, handleClose, cb, editMode = false, id = "" }) => {
  const [next, setNext] = useState(false);
  const [form1Data, setForm1Data] = useState({});
  const { farmersList } = useFarmerDetailsContext();

  const {
    register: form1Register,
    handleSubmit: form1handleSubmit,
    formState: { errors: form1Errors },
    clearErrors: form1ClearErrors,
    reset: form1Reset,
  } = useForm<IAddFarmersDetailsPage1Input>({
    resolver: yupResolver(form1Schema),
  });

  const {
    register: form2Register,
    handleSubmit: form2HandleSubmit,
    formState: { errors: form2Errors },
    clearErrors: form2ClearErrors,
    reset: form2Reset,
    setValue: form2SetValue,
    trigger: form2Trigger,
  } = useForm<IAddFarmersDetailsPage2Input>({
    resolver: yupResolver(form2Schema),
  });

  useEffect(() => {
    if (editMode) {
      let farmerData = farmersList.find((f) => String(f.id) === id);
      form1Reset({
        name: farmerData?.name as string,
        fatherName: farmerData?.fatherName as string,
        sex: farmerData?.gender as string,
        spouseName: farmerData?.husbandName as string,
        dob: farmerData?.DOB as string,
        group: farmerData?.groupName as string,
        phoneNumber: farmerData?.mobileNo as unknown as string,
        addhaarNo: farmerData?.aadharNumber as unknown as string,
        voterIdNo: farmerData?.voterIdNumber as unknown as string,
        acre: farmerData?.acre as unknown as string,
      });

      form2Reset({
        education: farmerData?.education as string,
        village: farmerData?.village as string,
        postalNo: farmerData?.pincode as unknown as string,
        address: farmerData?.address as string,
        taluk: farmerData?.circle as string,
        district: farmerData?.district as string,
        surveyNo: farmerData?.surveyNo as unknown as string,
        landType: farmerData?.landType as string,
        waterType: farmerData?.irrigationType as string,
        farmerType: farmerData?.farmerType as string,
        seedType: farmerData?.cropType as string,
        animals: farmerData?.cattle as string,
        groupMember: farmerData?.membershipId as unknown as string,
      });
    }

    return () => {
      form1Reset({
        name: "",
        fatherName: "",
        sex: "",
        spouseName: "",
        dob: "",
        group: "",
        phoneNumber: "",
        addhaarNo: "",
        voterIdNo: "",
        acre: "",
      });

      form2Reset({
        education: "",
        village: "",
        postalNo: "",
        address: "",
        taluk: "",
        district: "",
        surveyNo: "",
        landType: "",
        waterType: "",
        farmerType: "",
        seedType: "",
        animals: "",
        groupMember: "",
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode, id]);

  const form1Submit: any = (data: IAddFarmersDetailsPage1Input) => {
    setForm1Data(data);
    setNext(true);
  };

  const form2Submit: any = (data: IAddFarmersDetailsPage2Input) => {
    cb(Object.assign(data, form1Data) as IAddFarmersDetailsFormInput);
    form1Reset();
    form2Reset();
    handleClose();
  };

  return (
    <>
      <CustomModal
        openModal={openModal}
        handleClose={() => {
          form1ClearErrors();
          form2ClearErrors();
          form1Reset();
          form2Reset();
          setNext(false);
          handleClose();
        }}
      >
        <ModalHeader
          handleClose={() => {
            form1ClearErrors();
            form2ClearErrors();
            form1Reset();
            form2Reset();
            setNext(false);
            handleClose();
          }}
        >
          Add Farmer's Details
        </ModalHeader>

        <AddProfile />
        {next ? (
          <>
            <ModalBody id={"farmersDetailsForm2"} onSubmit={form2HandleSubmit(form2Submit)}>
              <FormFieldPage2 register={form2Register} errors={form2Errors} trigger={form2Trigger} setValue={form2SetValue} />
              <PageNumber2 />
            </ModalBody>
            <ModalFooter>
              <S.ButtonContainer>
                <BackButton
                  handleClose={() => {
                    form2ClearErrors();
                    setNext(!next);
                  }}
                />
                <SubmitButton formId={"farmersDetailsForm2"} handleSubmit={() => {}} />
              </S.ButtonContainer>
            </ModalFooter>
          </>
        ) : (
          <>
            <ModalBody id={"farmersDetailsForm1"} onSubmit={form1handleSubmit(form1Submit)}>
              <FormField register={form1Register} errors={form1Errors} />
              <PageNumber1 />
            </ModalBody>
            <ModalFooter>
              <Next formId={"farmersDetailsForm1"} handleNext={form1Submit} />
            </ModalFooter>
          </>
        )}
      </CustomModal>
    </>
  );
};

export default AddFarmersDetailsModal;
