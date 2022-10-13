import { FC, Ref, useRef, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DESCENDING, sortObj } from "../../../utils/constants";
import { IResolution, useResolutionsProviderContext } from "../../../utils/context/resolutions";
import DecisionPdf from "../../../views/decision-certificate/DecisionPdf";
import S from "./resolutionsTree.styled";

interface Props {
  resolutionId: string;
  setResolutionId: Dispatch<string>;
}

const ResolutionsTree: FC<Props> = ({ resolutionId, setResolutionId }) => {
  const { resolutions: resolutionsObj } = useResolutionsProviderContext();
  const resolutions = sortObj<IResolution>(Object.values(resolutionsObj), DESCENDING, "creationTime", { asDate: true });
  const leafCount = resolutions.length <= 4 ? resolutions.length : 4;
  const navigate = useNavigate();
  const ResolutionFormPdf = useRef<HTMLDivElement>();
  const NavigateResolutionGroup = (resolutionId: string) => {
    navigate(`/board-resolution/${resolutionId}`);
  };

  // to generate pdf of decision form
  const generateResolutionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => ResolutionFormPdf.current as HTMLDivElement,
  });

  return (
    <>
      <S.InvisibleBox>
        <DecisionPdf ref={ResolutionFormPdf as Ref<HTMLDivElement> | undefined} decisionId={resolutionId} />
      </S.InvisibleBox>
      <S.ResolutionsTreeBox leafCount={leafCount}>
        <S.Bud>
          {/* don't remove. needed for styling. */}
          <span></span>
        </S.Bud>
        {leafCount >= 1 && (
          <S.L1>
            <S.ResolutionsTimestamp placement="left">{resolutions[0].timestamp}</S.ResolutionsTimestamp>
            <S.ResolutionTitle>{resolutions[0].groupName}</S.ResolutionTitle>
            <S.ResolutionDescription>{resolutions[0].groupTitle}</S.ResolutionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(resolutions[0].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setResolutionId(resolutions[0].id);
                  generateResolutionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.L1>
        )}
        {leafCount >= 3 && (
          <S.L2>
            <S.ResolutionsTimestamp placement="left">{resolutions[2].timestamp}</S.ResolutionsTimestamp>
            <S.ResolutionTitle>{resolutions[2].groupName}</S.ResolutionTitle>
            <S.ResolutionDescription>{resolutions[2].groupTitle}</S.ResolutionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(resolutions[2].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setResolutionId(resolutions[2].id);
                  generateResolutionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.L2>
        )}
        {leafCount >= 2 && (
          <S.R1>
            <S.ResolutionsTimestamp placement="right">{resolutions[1].timestamp}</S.ResolutionsTimestamp>
            <S.ResolutionTitle>{resolutions[1].groupName}</S.ResolutionTitle>
            <S.ResolutionDescription>{resolutions[1].groupTitle}</S.ResolutionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(resolutions[1].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setResolutionId(resolutions[1].id);
                  generateResolutionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.R1>
        )}
        {leafCount >= 4 && (
          <S.R2>
            <S.ResolutionsTimestamp placement="right">{resolutions[3].timestamp}</S.ResolutionsTimestamp>
            <S.ResolutionTitle>{resolutions[3].groupName}</S.ResolutionTitle>
            <S.ResolutionDescription>{resolutions[3].groupTitle}</S.ResolutionDescription>
            <S.ButtonsBar>
              <S.ViewBtn
                onClick={() => {
                  NavigateResolutionGroup(resolutions[3].id);
                }}
              >
                View
              </S.ViewBtn>
              <S.DownloadBtn
                onClick={async () => {
                  await setResolutionId(resolutions[3].id);
                  generateResolutionPDF();
                }}
              >
                <i>download</i>
              </S.DownloadBtn>
            </S.ButtonsBar>
          </S.R2>
        )}
        <S.Shadow leafCount={leafCount} />
      </S.ResolutionsTreeBox>
      {leafCount === 0 && <S.NodataMessage>No Data</S.NodataMessage>}
    </>
  );
};

export default ResolutionsTree;
