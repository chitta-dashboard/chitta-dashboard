import { useEffect, useState } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { Badge, FormHelperText } from "@mui/material";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import UploadButton from "./body/uploadButton";
import { fileValidation } from "../../../utils/constants";
import S from "./body/addProfile.styled";

interface CustomProps<FormInputTypes extends FieldValues> {
  inputName: string;
  setValue: UseFormSetValue<FormInputTypes>;
  trigger: UseFormTrigger<FormInputTypes>;
  errors: any;
}

function AddProfile<FormInputTypes>({ setValue, trigger, inputName, errors }: CustomProps<FormInputTypes & FieldValues>) {
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState<string | undefined>("");

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    let chosenImage = (event.target.files as FileList)[0];

    setValue(
      inputName as Path<FormInputTypes & FieldValues>,
      chosenImage as PathValue<FormInputTypes & FieldValues, Path<FormInputTypes & FieldValues>>,
    );
    trigger(inputName as Path<FormInputTypes & FieldValues>);

    if (fileValidation(chosenImage.name)) {
      setImage(window.URL.createObjectURL(chosenImage));
    } else {
      setCroppedImage("");
    }
  };

  // this function is to clear the value of input field, so we can upload same file as many times as we want.
  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleCroppedImage = (croppedImg: string) => {
    if (!croppedImg) return;
    setCroppedImage(croppedImg);
  };

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
      <S.ProfileContainer>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={<UploadButton ImageHandler={handleImage} onClick={onInputClick} />}
        >
          <S.ProfilePicture alt={inputName} src={croppedImage} />
        </Badge>
        <FormHelperText>{errors[inputName]?.message}</FormHelperText>
      </S.ProfileContainer>
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
    </>
  );
}

export default AddProfile;
