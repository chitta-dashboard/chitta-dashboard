import { useEffect, useState } from "react";
import { Badge, FormHelperText } from "@mui/material";
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import ImagePreview from "../../../utils/imageCrop/imagePreview";
import UploadButton from "./body/uploadButton";
import { fileValidation } from "../../../utils/constants";
import S from "./body/addProfile.styled";

interface CustomProps<FormInputTypes extends FieldValues> {
  ImageHandler?: () => void;
  inputName: string;
  setValue: UseFormSetValue<FormInputTypes>;
  trigger: UseFormTrigger<FormInputTypes>;
  errors: any;
}

function AddProfile<FormInputTypes>({ ImageHandler, setValue, trigger, inputName, errors }: CustomProps<FormInputTypes & FieldValues>) {
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
          badgeContent={<UploadButton ImageHandler={handleImage} />}
        >
          <S.ProfilePicture alt={inputName} src={croppedImage} />
        </Badge>
        <FormHelperText>{errors[inputName]?.message}</FormHelperText>
      </S.ProfileContainer>
      {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={(croppedImg: string) => setCroppedImage(croppedImg)} />}
    </>
  );
}

export default AddProfile;
