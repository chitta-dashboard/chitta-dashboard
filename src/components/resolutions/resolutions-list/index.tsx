import { Dispatch, FC, Ref, useRef } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { IResolution, useResolutionsProviderContext } from "../../../utils/context/resolutions";
import { DESCENDING, sortObj } from "../../../utils/constants";
import DecisionPdf from "../../../views/decision-certificate/DecisionPdf";
import rightConnect from "../../../assets/images/rightDash.svg";
import leftConnect from "../../../assets/images/leftDash.svg";
import S from "./resolutionsList.styled";

interface Props {
  resolutionId: string;
  setResolutionId: Dispatch<string>;
}

const ResolutionsList: FC<Props> = ({ resolutionId, setResolutionId }) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { resolutions: resolutionsObj } = useResolutionsProviderContext();
  const navigate = useNavigate();
  const ResolutionFormPdf = useRef<HTMLDivElement>();
  const resolutions = sortObj<IResolution>(Object.values(resolutionsObj), DESCENDING, "creationTime", { asDate: true });
  const leftData = resolutions.filter((_: any, ind: number) => Number.isInteger(((ind + 1) / 2) % 2));
  const rightData = isMd ? resolutions : resolutions.filter((_: any, ind: number) => !Number.isInteger(((ind + 1) / 2) % 2));

  const NavigateResolutionGroup = (resolutionId: string) => {
    navigate(`/board-resolution/${resolutionId}`);
  };

  // to generate pdf of decision form
  const generateResolutionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => ResolutionFormPdf.current as HTMLDivElement,
  });

  return (
    <S.MasterContainer>
      <S.InvisibleBox>
        <DecisionPdf ref={ResolutionFormPdf as Ref<HTMLDivElement> | undefined} decisionId={resolutionId} />
      </S.InvisibleBox>
      {!isMd && (
        <S.LeftContainer>
          {leftData.map((data: IResolution) => (
            <S.LContent key={data.id}>
              <S.ContentHeader>
                <S.ContentTitle>{data.groupName}</S.ContentTitle>
                <S.ContentViewBtn
                  onClick={() => {
                    NavigateResolutionGroup(data.id);
                  }}
                >
                  View
                </S.ContentViewBtn>
                <S.ContentDownloadBtn
                  onClick={async () => {
                    await setResolutionId(data.id);
                    generateResolutionPDF();
                  }}
                >
                  <i>download</i>
                </S.ContentDownloadBtn>
              </S.ContentHeader>
              <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
              <S.ContentBodyText dangerouslySetInnerHTML={{ __html: data?.groupDescriptionRichText || data.groupDescription }} />
              <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
              <img src={leftConnect} alt="svg-vector" draggable={false} />
            </S.LContent>
          ))}
        </S.LeftContainer>
      )}
      <S.Divider />
      <S.RightContainer>
        {rightData.map((data: IResolution) => (
          <S.RContent key={data.id}>
            <S.ContentHeader>
              <S.ContentTitle>{data.groupName}</S.ContentTitle>
              <S.ContentViewBtn
                onClick={() => {
                  NavigateResolutionGroup(data.id);
                }}
              >
                View
              </S.ContentViewBtn>
              <S.ContentDownloadBtn
                onClick={async () => {
                  await setResolutionId(data.id);
                  generateResolutionPDF();
                }}
              >
                <i>download</i>
              </S.ContentDownloadBtn>
            </S.ContentHeader>
            <S.ContentSubtitle>{data.groupTitle}</S.ContentSubtitle>
            <S.ContentBodyText dangerouslySetInnerHTML={{ __html: data?.groupDescriptionRichText || data.groupDescription }} />
            <S.ContentTimeStamp>{data.timestamp}</S.ContentTimeStamp>
            <img src={rightConnect} alt="svg-vector" draggable={false} />
          </S.RContent>
        ))}
      </S.RightContainer>
    </S.MasterContainer>
  );
};

export default ResolutionsList;
