import ResolutionsHeader from "../../components/resolutions/resolutions-header";
import ResolutionsContent from "../../components/resolutions/resolutions-content";
import S from "./resolution.styled";

const Resolutions = () => {
  return (
    <S.Resolutions>
      <ResolutionsHeader />
      <ResolutionsContent />
    </S.Resolutions>
  );
};

export default Resolutions;
