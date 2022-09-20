import S from "./addProfile.styled";

const AddButton = () => {
  return (
    <>
      <S.SmallAddButton onClick={() => alert("hi")}>+</S.SmallAddButton>
    </>
  );
};

export default AddButton;
