import React, { FC, useEffect, useState } from "react";
import { Control, UseFormGetValues, UseFormSetValue, UseFormUnregister, UseFormWatch } from "react-hook-form";
import { ENDPOINTS, fileValidation } from "../../../../utils/constants";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";
import { useFetch } from "../../../../utils/hooks/query";
import AddProfile from "../../../input-fields/add-profile";
import Input from "../../../input-fields/input/input";
import { IAddFarmersDetailsPage1Input } from "../../type/formInputs";
import S from "./page1Fields.styled";

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
}

const FormField: FC<CustomProps> = ({ control, dynamicInputs, addInput, removeInput, setValue, getValues, unregister, editMode, watch }) => {
  const [surveyNo, setSurveyNo] = useState<{ [key: string]: string }>(getValues("surveyNo") as { [key: string]: string });
  const [acre, setAcre] = useState<{ [key: string]: string }>(getValues("acre") as { [key: string]: string });
  const [border, setBorder] = useState<{ [key: string]: string }>(getValues("border") as { [key: string]: string });
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.farmerGroup);
  const { data: farmersGroupById } = result;
  let enableAddButton = true;

  useEffect(() => {
    setValue("surveyNo", surveyNo);
    setValue("acre", acre);
    setValue("border", border);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [surveyNo, acre, border]);

  // button enabling

  if (surveyNo && acre && border) {
    if (
      Object.values(surveyNo).length === dynamicInputs.length &&
      Object.values(acre).length === dynamicInputs.length &&
      Object.values(border).length === dynamicInputs.length
    ) {
      if (Object.values(surveyNo).includes("") !== true && Object.values(acre).includes("") !== true && Object.values(border).includes("") !== true) {
        enableAddButton = false;
      } else {
        enableAddButton = true;
      }
    }
  }

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
      <Input name="name" type="text" control={control} rules={{ required: "required" }} options={{ label: "பெயர் *", gridArea: "nme" }} />
      <Input
        name="sex"
        type="select"
        control={control}
        rules={{ required: "required" }}
        options={{
          label: "பாலினம் *",
          gridArea: "sex",
          selectOptions: [
            ["MALE", "ஆண்"],
            ["FEMALE", "பெண்"],
          ],
        }}
      />
      <Input
        name="fatherName"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "தந்தையின் பெயர் *", gridArea: "fnm" }}
      />
      <Input
        name="spouseName"
        type="text"
        control={control}
        rules={{ required: "required" }}
        options={{ label: "கணவன்/மணைவி பெயர் *", gridArea: "spo" }}
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
        options={{ label: "கைபேசி எண் *", gridArea: "phn" }}
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
        options={{ label: "ஆதார் எண் *", gridArea: "adh" }}
      />
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
      </S.DynamicInputsBox>
    </S.StaticBox>
  );
};

export default FormField;
