import { FC } from "react";
import S from "./apiLoader.styled";

interface CustomProps {
  loaderText?:string
}

const APIloader:FC<CustomProps> = ({loaderText}) => {
  return (
    <S.Container open={true}>
      <S.LoaderContainer>
        <h4>{loaderText}</h4>
        <S.LoaderParticle1></S.LoaderParticle1>
        <S.LoaderParticle2></S.LoaderParticle2>
        <S.LoaderParticle3></S.LoaderParticle3>
      </S.LoaderContainer>
    </S.Container>
  );
};

export default APIloader;
