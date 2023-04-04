import React, { Dispatch, FC, MouseEvent, SetStateAction, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Control, UseFormGetValues, UseFormSetValue, UseFormUnregister, UseFormWatch } from "react-hook-form";
import { ENDPOINTS, fileValidation } from "../../../../utils/constants";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { useAdd, useFetch } from "../../../../utils/hooks/query";
import AddProfile from "../../../input-fields/add-profile";
import AddMdDetailsModal from "../../../../components/modals/new-md-details-modal";
import Input from "../../../input-fields/input/input";
import { IAddFarmersDetailsPage1Input } from "../../type/formInputs";
import S from "./page1Fields.styled";
import CustomPopover from "../../../common-components/pop-over/infoPopover.tsx";
import { farmerDetail } from "../../../../utils/context/farmersDetails";

interface CustomProps {
  control: Control;
  dynamicInputs: Array<{ [key: string]: [string, string, string] }>;
  addInput: () => void;
  removeInput: (key: string) => void;
  setValue: UseFormSetValue<IAddFarmersDetailsPage1Input>;
  getValues: UseFormGetValues<IAddFarmersDetailsPage1Input>;
  unregister: UseFormUnregister<IAddFarmersDetailsPage1Input>;
  editMode?: boolean;
  watch: UseFormWatch<IAddFarmersDetailsPage1Input>;
  selectedKey: string[];
  setSelectedKey: Dispatch<SetStateAction<string[]>>;
  isPhoneExist: boolean;
  setIsPhoneExist: Dispatch<SetStateAction<boolean>>;
  isAadharExist: boolean;
  setIsAadharExist: Dispatch<SetStateAction<boolean>>;
}

const FormField: FC<CustomProps> = ({
  control,
  dynamicInputs,
  addInput,
  removeInput,
  setValue,
  getValues,
  unregister,
  editMode,
  watch,
  selectedKey,
  setSelectedKey,
  isPhoneExist,
  setIsPhoneExist,
  isAadharExist,
  setIsAadharExist,
}) => {
  //state values
  const [surveyNo, setSurveyNo] = useState<{ [key: string]: string }>(getValues("surveyNo") as { [key: string]: string });
  const [acre, setAcre] = useState<{ [key: string]: string }>(getValues("acre") as { [key: string]: string });
  const [border, setBorder] = useState<{ [key: string]: string }>(getValues("border") as { [key: string]: string });
  const [openInfoPopover, setOpenInfoPopover] = useState<HTMLElement | null>(null);
  const [filteredFarmerDetails, setFilteredFarmerDetails] = useState<farmerDetail[]>([]);
  const [openMdModal, setOpenMdModal] = useState(false);
  // const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const [representativeFarmer, setRepresentativeFarmer] = useState<string>("");

  //constants
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.farmerGroup);
  const { data: farmersGroupById } = result;
  let enableAddButton = true;

  const {
    formatChangeSuccess: farmerIsSuccess,
    result: { data: farmersData },
  } = useFetch(ENDPOINTS.farmerDetails);

  //to get farmer details
  useEffect(() => {
    let filteredFarmerData: farmerDetail[] = Object.values(farmerIsSuccess && (farmersData as farmerDetail[])).filter(
      (farmer) => farmer.hasNoWhatsapp === "false" && farmer.phoneNumber,
    );
    setFilteredFarmerDetails([...filteredFarmerData]);
  }, [farmersData, farmerIsSuccess]);

  useEffect(() => {
    setValue("surveyNo", surveyNo);
    setValue("acre", acre);
    setValue("border", border);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyNo, acre, border]);

  useEffect(() => {
    if (selectedKey.length > 0) {
      setRepresentativeFarmer(selectedKey[0]);
    }
  }, [selectedKey]);

  // button enabling

  if (surveyNo && acre && border) {
    if (
      Object.values(surveyNo).length === dynamicInputs.length &&
      Object.values(acre).length === dynamicInputs.length &&
      Object.values(border).length === dynamicInputs.length
    ) {
      if (Object.values(surveyNo).includes("") !== true && Object.values(acre).includes("") !== true && Object.values(border).includes("") !== true) {
        enableAddButton = false;
      }
    }
  }

  //functions
  const handleCheckBoxSelect = (value: string) => {
    if (selectedKey[0] === value) {
      setSelectedKey([]);
      setRepresentativeFarmer("");
    } else {
      setSelectedKey([value]);
    }
  };

  const addButtonHandler = () => {
    setRepresentativeFarmer(selectedKey[0]);
    setOpenMdModal(false);
  };

  const InfoPopoverHandler = (e: MouseEvent<HTMLButtonElement>) => {
    setOpenInfoPopover(e.currentTarget);
    setTimeout(() => {
      setOpenInfoPopover(null);
    }, 5000);
  };

  const RepresentativeInputFocused = () => {
    setOpenMdModal(true);
  };

  //Verify phone number already exist or not
  const verifyPhoneExist = (phoneNumber: string) => {
    let isExist: farmerDetail[] = Object.values(farmerIsSuccess && (farmersData as farmerDetail[])).find(
      (farmer) => farmer.phoneNumber === `+91${phoneNumber}`,
    );
    setIsPhoneExist(Boolean(isExist));
  };

  // Verify aadhar number already exist or not
  const verifyAadharExist = (aadharNumber: string) => {
    let isAadharNumberExist: farmerDetail[] = Object.values(farmerIsSuccess && (farmersData as farmerDetail[])).find(
      (farmer) => farmer.addhaarNo === aadharNumber,
    );
    setIsAadharExist(Boolean(isAadharNumberExist));
  };

  return (
    <S.StaticBox>
      <AddProfile<IAddFarmersDetailsPage1Input>
        inputName="profile"
        control={control}
        rules={{
          required: "required",
          validate: {
            fileFormat: (file: File) => {
              if (typeof file === "string" && (file as string).length > 0) return true; // passes cropped image url
              return fileValidation(file ? file?.name : "") || "expected format: .jpg, .jpeg, .png";
            },
          },
        }}
        setValue={setValue}
        getValues={getValues}
        unregister={unregister}
        gridArea="prf"
      />
      <Input
        name="name"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "பெயர் *", gridArea: "nme", placeholder: "பெயரை உள்ளிடுக" }}
      />
      <Input
        name="sex"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          // initialvalue: "gender",
          // placeholder: "gender",
          // value: "gender",
          label: "பாலினம் *",
          gridArea: "sex",
          selectOptions: [
            ["male", "ஆண்"],
            ["female", "பெண்"],
          ],
          placeholder: "பாலினம் தேர்வு செய்க ",
        }}
      />
      <Input
        name="fatherName"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "தந்தையின் பெயர் *", gridArea: "fnm", placeholder: "தந்தையின் பெயரை உள்ளிடுக" }}
      />
      <Input
        name="spouseName"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "கணவன்/மணைவி பெயர் *", gridArea: "spo", placeholder: "துணைவர் பெயரை உள்ளிடுக" }}
      />
      <Input name="dob" type="date" control={control} rules={{ required: "required" }} options={{ label: "பிறந்த தேதி *", gridArea: "dob" }} />
      <Input
        name="group"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "குழு *",
          gridArea: "grp",
          selectOptions: Object.values(isSuccess && (farmersGroupById as FarmersGroup[])).map((g) => [g.groupName, g.groupName]),
          placeholder: "குழுவை தேர்வு செய்க ",
        }}
      />
      <Input
        name="phoneNumber"
        type="number"
        control={control}
        rules={{
          required: "required",
          minLength: { value: 10, message: "10 digits expected" },
          maxLength: { value: 10, message: "10 digits expected" },
        }}
        options={{
          label: "கைபேசி எண் *",
          gridArea: "phn",
          placeholder: "கைபேசி எண்ணை உள்ளிடுக",
          unitstart: "+91",
          disabled: editMode,
        }}
        helperText={isPhoneExist ? "Phone number already exist!" : ""}
        onChange={(e) => {
          verifyPhoneExist(e.target.value);
        }}
      />
      <Input
        name="addhaarNo"
        type="number"
        control={control}
        rules={{
          required: "required",
          minLength: { value: 12, message: "12 digits expected" },
          maxLength: { value: 12, message: "12 digits expected" },
        }}
        options={{ label: "ஆதார் எண் *", gridArea: "adh", placeholder: "ஆதார் எண்ணை உள்ளிடுக" }}
        helperText={isAadharExist ? "Aadhar number already exist!" : ""}
        onChange={(e) => {
          verifyAadharExist(e.target.value);
        }}
      />
      <Input
        name="email"
        type="text"
        control={control}
        rules={{
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        options={{ label: "மின்னஞ்சல் *", gridArea: "eml", placeholder: "மின்னஞ்சலை உள்ளிடுக" }}
      />
      <S.CheckboxContainer>
        {representativeFarmer === "" ? (
          <>
            <S.CustomCheckbox
              checked={openMdModal}
              onChange={() => {
                setOpenMdModal(!openMdModal);
              }}
            />
            <S.CheckboxText>
              Has no whatsapp
              <S.IBtnContainer
                onClick={(e) => {
                  InfoPopoverHandler(e);
                }}
              >
                <Typography>i</Typography>
              </S.IBtnContainer>
              {openInfoPopover && (
                <CustomPopover
                  id={Boolean(openInfoPopover) ? "info-icon" : undefined}
                  isOpen={openInfoPopover}
                  onClose={() => {
                    setOpenInfoPopover(null);
                  }}
                  children={
                    <S.CustomPopoverContainer>
                      <p>
                        Some farmers do not have access to a smartphone or do not know how to use Whatsapp. You can use a Friend-Of-Farmer as a
                        temporary solutions. For security reasons it is not yet possible to let a friend handle payments using the whatsapp wallet.
                        Farmers connected via a representative have NO access to financial services.
                      </p>
                      <p>Please do the following:</p>
                      <p>*Get a whatsapp enabled phone for the farmer or use a phone from a close relative to register the farmers field.</p>
                      <p>OR</p>
                      <p>*Select a Friend-Of-Farmer to handle the first registrations and switch to a normal account later.</p>
                    </S.CustomPopoverContainer>
                  }
                  customStyle={{
                    maxWidth: "auto",
                    maxHeight: "auto",
                  }}
                />
              )}
            </S.CheckboxText>
          </>
        ) : (
          <S.CustomTextBox onClick={RepresentativeInputFocused}>
            <p>
              {
                Object.values(farmerIsSuccess && (farmersData as farmerDetail))
                  .filter((item) => item.id === representativeFarmer)
                  .map((farmer) => farmer.name)[0]
              }
            </p>
          </S.CustomTextBox>
        )}
      </S.CheckboxContainer>

      <S.DividerLine />
      <S.AddLandDetailsContainer>
        Land Details
        <S.AddNewRowButton onClick={addInput} disabled={enableAddButton} />
      </S.AddLandDetailsContainer>

      <S.DynamicInputsBox>
        {dynamicInputs.map((inp, ind) => {
          const [[key, [surveyName, acreName, borderName]]] = Object.entries(inp);

          return (
            <S.DynamicInputs key={key}>
              <Input
                type="text"
                name={surveyName}
                control={control}
                rules={{ required: "required" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSurveyNo({ ...surveyNo, [surveyName]: e.target.value });
                }}
                options={{
                  label: "கணக்கெடுப்பு எண் *",
                  gridArea: "srv",
                  placeholder: "கணக்கெடுப்பு எண்ணை உள்ளிடுக",
                }}
              />
              <Input
                type="number"
                name={acreName}
                control={control}
                rules={{ required: "required" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setAcre({ ...acre, [acreName]: e.target.value });
                }}
                options={{
                  label: "ஏக்கர் *",
                  gridArea: "acr",
                  placeholder: "ஏக்கர் அளவை உள்ளிடுக",
                }}
              />
              <Input
                type="text"
                name={borderName}
                control={control}
                rules={{ required: "required" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBorder({ ...border, [borderName]: e.target.value });
                }}
                options={{
                  label: "நில எல்லை *",
                  gridArea: "bdr",
                  placeholder: "நில எல்லையை உள்ளிடுக",
                }}
              />

              <S.RemoveBtn
                onClick={() => {
                  removeInput(key);
                  unregister(surveyName);
                  unregister(acreName);
                  unregister(borderName);
                  setSurveyNo((d) => {
                    const updated = { ...d };
                    delete updated[surveyName];
                    return updated;
                  });
                  setAcre((d) => {
                    const updated = { ...d };
                    delete updated[acreName];
                    return updated;
                  });
                  setBorder((d) => {
                    const updated = { ...d };
                    delete updated[borderName];
                    return updated;
                  });
                }}
                disabled={dynamicInputs.length === 1 ? true : false}
              />
            </S.DynamicInputs>
          );
        })}
        {openMdModal && (
          <AddMdDetailsModal
            openModal={openMdModal}
            handleClose={() => {
              setOpenMdModal(false);
            }}
            handleConfirmModal={addButtonHandler}
            handleCheckBox={handleCheckBoxSelect}
            handleCheckBoxAll={() => {}}
            selectedFarmerKeys={selectedKey}
            farmerDetails={filteredFarmerDetails}
            representative={true}
          />
        )}
      </S.DynamicInputsBox>
    </S.StaticBox>
  );
};

export default FormField;
