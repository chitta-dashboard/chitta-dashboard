import S from "./resolution.styled";
import ResolutionsContent from "../../components/resolutions/resolutions-content";
import ResolutionsHeader from "../../components/resolutions/resolutions-header";

const Resolutions = () => {
  return (
    <S.Resolutions>
      <ResolutionsHeader />
      <ResolutionsContent />
    </S.Resolutions>
  );
};

export default Resolutions;
