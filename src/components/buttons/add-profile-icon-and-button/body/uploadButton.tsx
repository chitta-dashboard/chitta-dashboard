import Props from "../../../modals/type/modalProps";

import S from "./addProfile.styled";

const UploadButton = (props: Props) => {
  const getImage = props.profile;

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
