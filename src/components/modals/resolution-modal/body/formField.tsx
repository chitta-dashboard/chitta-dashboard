import { FC, useEffect, useRef } from "react";
import { Control, useWatch, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import Editor from "../../../rich-text/rich-text-editor/index";
import { IResolutionFormInput } from "../../type/formInputs";
import Input from "../../../input-fields/input/input";
import { useFetch } from "../../../../utils/hooks/query";
import { ENDPOINTS, getCurrentTime } from "../../../../utils/constants";
import Loader from "../../../../utils/loaders/tree-loader";
import S from "./formField.styled";
import { FarmersGroup } from "../../../../utils/context/farmersGroup";

interface CustomProps {
  setValue: UseFormSetValue<IResolutionFormInput>;
  trigger: UseFormTrigger<IResolutionFormInput>;
  control: Control<IResolutionFormInput>;
  editMode?: boolean;
  id?: string;
}

const FormField: FC<CustomProps> = ({ setValue, trigger, control, editMode, id = "" }) => {
  //constants
  const {
    formatChangeSuccess: farmerGroupDataLoaded,
    result: { data: farmersGroupById },
  } = useFetch(ENDPOINTS.farmerGroup);
  const {
    formatChangeSuccess,
    result: { data: resolutions },
  } = useFetch(ENDPOINTS.resolutions);
  const { current: resolution } = useRef(formatChangeSuccess && resolutions ? resolutions[id] : {});
  const selectAllGroup = useWatch<IResolutionFormInput>({
    name: "selectAll",
    control,
    defaultValue: editMode && resolution.groupName !== "~All Groups~" ? "no" : "yes",
  });

  useEffect(() => {
    if (selectAllGroup === "yes") setValue("groupName", "~All Groups~");
    else setValue("groupName", editMode ? resolution.groupName : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectAllGroup]);

  return editMode && !formatChangeSuccess && farmerGroupDataLoaded ? (
    <Loader />
  ) : (
    <>
      <S.Container selectAll={selectAllGroup === "yes"}>
        <Input
          type="radio"
          control={control as unknown as Control}
          rules={{ required: "required" }}
          name="selectAll"
          defaultValue={editMode && resolution.groupName !== "~All Groups~" ? "no" : "yes"}
          options={{
            label: "அனைத்து குழுக்களையும் தேர்ந்தெடுக்கவா? *",
            gridArea: "sel",
            radioOptions: [
              ["yes", "ஆம்"],
              ["no", "இல்லை"],
            ],
          }}
        />
        <Input
          type="text"
          rules={{ required: "required" }}
          name="resolutionHeading"
          defaultValue={editMode ? resolution.groupTitle : ""}
          control={control as unknown as Control}
          options={{
            label: "தீர்மானம் தலைப்பு *",
            gridArea: "dhd",
            placeholder: "தீர்மான தலைப்பை உள்ளிடுக",
          }}
        />
        <Input
          type="datetime"
          rules={{ required: "required" }}
          name="creationTime"
          defaultValue={editMode ? getCurrentTime(resolution.timestamp) : getCurrentTime()}
          control={control as unknown as Control}
          options={{
            label: "தீர்மானம் தேதி *",
            gridArea: "dct",
          }}
        />
        {selectAllGroup === "yes" ? null : (
          <Input
            type="select"
            rules={{ required: "required" }}
            name="groupName"
            defaultValue={editMode ? resolution.groupName : ""}
            control={control as unknown as Control}
            helperText={farmersGroupById ? undefined : "No farmer group available!"}
            options={{
              label: "குழு *",
              gridArea: "grp",
              selectOptions: farmersGroupById
                ? Object.values(farmersGroupById as { [key: string]: FarmersGroup }).map((g) => [g.groupName, g.groupName])
                : [],
              specialOptions: ["~All Groups~"],
            }}
          />
        )}
        <Input
          type="multiselect"
          rules={{ required: "required" }}
          name="presenter"
          defaultValue={editMode ? resolution.presenter : ""}
          control={control as unknown as Control}
          options={{
            label: "தொகுப்பாளர் *",
            gridArea: "pre",
            selectOptions: ["person 1", "person 2", "person 3", "person 4", "person 5"],
          }}
        />
        <Input
          type="multiselect"
          rules={{ required: "required" }}
          name="participator"
          defaultValue={editMode ? resolution.participator : ""}
          control={control as unknown as Control}
          options={{
            label: "பங்கேற்பாளர்கள் *",
            gridArea: "par",
            selectOptions: ["person 1", "person 2", "person 3", "person 4", "person 5"],
            placeholder: "hello",
          }}
        />
        <S.EditorBox>
          <Editor
            defaultValue={editMode ? resolution.groupDescriptionRichText || resolution.groupDescription : ""}
            cb={(plainText: string, richText: string): void => {
              setValue("description", plainText);
              setValue("descriptionRichText", richText);
              trigger("description");
            }}
          />
          <Input type="text" rules={{ required: "required" }} name="description" control={control as unknown as Control} options={{ hide: true }} />
        </S.EditorBox>
      </S.Container>
    </>
  );
};

export default FormField;
