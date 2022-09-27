import { FC } from "react";


import S from "./addProfile.styled";

interface CustomProps {
  ImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: FC<CustomProps> = ({ ImageHandler }) => {
  const getImage = ImageHandler;

  return (
    <>
      <label htmlFor="files">
        <S.UploadButton>
          <i>add</i>
        </S.UploadButton>
      </label>
      <input id="files" type="file" style={{ visibility: "hidden" }} onChange={getImage} />
    </>
  );
};

export default UploadButton;
