import { FC } from "react";
import S from "./apiLoader.styled";

interface CustomProps {
  loaderText?: string;
}

export const BufferLoader: FC<CustomProps> = ({ loaderText }) => {
  return (
    <S.LoaderContainer>
      <h4>{loaderText}</h4>
      <S.LoaderParticle1></S.LoaderParticle1>
      <S.LoaderParticle2></S.LoaderParticle2>
      <S.LoaderParticle3></S.LoaderParticle3>
    </S.LoaderContainer>
  );
};

const APIloader: FC<CustomProps> = ({ loaderText }) => {
  return (
    <S.Container open={true}>
      <BufferLoader loaderText={loaderText} />
    </S.Container>
  );
};

export default APIloader;
