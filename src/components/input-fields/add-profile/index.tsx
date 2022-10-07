import { useEffect, useState } from "react";
import { Badge, FormHelperText } from "@mui/material";
import { Control, Controller, FieldValues, Path, PathValue, UseFormGetValues, UseFormSetValue, UseFormUnregister } from "react-hook-form";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import { fileValidation } from "../../../utils/constants";
import S from "./body/addProfile.styled";

interface AddProfileProps<FormInputTypes extends FieldValues> {
  ImageHandler?: () => void;
  inputName: string;
  control: Control;
  gridArea?: string;
  rules: { [key: string]: any };
  setValue: UseFormSetValue<FormInputTypes & FieldValues>;
  getValues: UseFormGetValues<FormInputTypes & FieldValues>;
  unregister: UseFormUnregister<FormInputTypes & FieldValues>;
}

function AddProfile<FormInputTypes>({ inputName, rules, control, setValue, gridArea, getValues }: AddProfileProps<FormInputTypes & FieldValues>) {
  // latest chosen image
  const [imageToCrop, setImageToCrop] = useState<string>("");
  // latest cropped image
  const [croppedImage, setCroppedImage] = useState<string | undefined>(getValues(inputName as Path<FormInputTypes & FieldValues>));

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let chosenImage = (event.target.files as FileList)[0];
    if (fileValidation(chosenImage.name)) {
      // if correct file chosen, replace the cropped image with latest file
      setImageToCrop(window.URL.createObjectURL(chosenImage));
    } else {
      // if wrong file chosen, reset the previously croped image.
      setCroppedImage("");
    }
  };

  const handleCroppedImage = (croppedImg: string) => {
    if (!croppedImg) return;
    setCroppedImage(croppedImg);
  };

  // sets the profile field with the value of cropped image
  useEffect(() => {
    if (croppedImage !== "")
      setValue(
        inputName as Path<FormInputTypes & FieldValues>,
        croppedImage as PathValue<FormInputTypes & FieldValues, Path<FormInputTypes & FieldValues>>,
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImage]);

  return (
    <>
      <S.ProfileContainer {...(gridArea ? { gridArea } : null)}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <label htmlFor="files">
              <S.UploadButton>add</S.UploadButton>
            </label>
          }
        >
          <S.ProfilePicture alt={inputName} src={croppedImage} />
        </Badge>
        <Controller
          name={inputName}
          rules={rules}
          defaultValue=""
          control={control}
          render={({ field, formState: { errors } }) => {
            return (
              <>
                <input
                  id="files"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange((e.target.files as FileList)[0]);
                    handleImage(e);
                  }}
                  onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                    const element = event.target as HTMLInputElement;
                    element.value = "";
                  }}
                />
                <FormHelperText sx={{ whiteSpace: "nowrap" }}>{errors[inputName]?.message as string}</FormHelperText>
              </>
            );
          }}
        />
      </S.ProfileContainer>
      {imageToCrop && <ImagePreview image={imageToCrop} setImage={setImageToCrop} handleCroppedImage={handleCroppedImage} />}
    </>
  );
}

export default AddProfile;
