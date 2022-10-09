import { FC } from "react";
import S from "./addProfile.styled";

interface CustomProps {
  ImageHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
}

const UploadButton: FC<CustomProps> = ({ ImageHandler, onClick }) => {
  return (
    <>
      <label htmlFor="files">
        <S.UploadButton>
          <i>add</i>
        </S.UploadButton>
      </label>
      <input id="files" type="file" style={{ visibility: "hidden" }} onChange={ImageHandler} onClick={onClick} />
    </>
  );
};

export default UploadButton;
