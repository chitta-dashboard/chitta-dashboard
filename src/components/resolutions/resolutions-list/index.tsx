import { Dispatch, FC, Ref, useEffect, useRef } from "react";
import { Theme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DESCENDING, ENDPOINTS, sortObj } from "../../../utils/constants";
import ResolutionPdf from "../../../views/resolution-certificate/resolutionPdf";
import { IResolution } from "../../../utils/context/resolution";
import { useFetch } from "../../../utils/hooks/query";
import Loader from "../../../utils/loaders/tree-loader";
import S from "./resolutionsList.styled";
import rightConnect from "../../../assets/images/rightDash.svg";
import leftConnect from "../../../assets/images/leftDash.svg";

interface Props {
  resolutionId: string | null;
  setResolutionId: Dispatch<string | null>;
}

const ResolutionsList: FC<Props> = ({ resolutionId, setResolutionId }) => {
  const isMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const {
    formatChangeSuccess,
    result: { data: resolutionsObj },
  } = useFetch(ENDPOINTS.resolutions);

  const navigate = useNavigate();
  const ResolutionFormPdf = useRef<HTMLDivElement>();
  const resolutions = formatChangeSuccess && sortObj<IResolution>(Object.values(resolutionsObj), DESCENDING, "creationTime", { asDate: true });
  const leftData = resolutions ? resolutions.filter((_: any, ind: number) => Number.isInteger(((ind + 1) / 2) % 2)) : [];
  const rightData = isMd ? resolutions : resolutions && resolutions.filter((_: any, ind: number) => !Number.isInteger(((ind + 1) / 2) % 2));

  // to generate pdf of resolution form
  const generateResolutionPDF = useReactToPrint({
    documentTitle: `Board_Resolution_${resolutionId && formatChangeSuccess && resolutionsObj[resolutionId].groupName}`,
    content: () => ResolutionFormPdf.current as HTMLDivElement,
  });

  useEffect(() => {
    if (resolutionId) {
      generateResolutionPDF();
    }
    setResolutionId(null);
  }, [resolutionId]);

  return formatChangeSuccess ? (
    <S.MasterContainer>
      <S.InvisibleBox>
        <ResolutionPdf ref={ResolutionFormPdf as Ref<HTMLDivElement> | undefined} resolutionId={resolutionId} />
      </S.InvisibleBox>
      {!isMd && (
        <S.LeftContainer>
          {leftData.map((data: IResolution) => (
            <S.LContent key={data.id}>
              <S.ContentHeader>
                <S.ContentTitle>{data.groupName}</S.ContentTitle>
                <S.ContentViewBtn onClick={() => navigate(`/board-resolution/${data.id}`)}>View</S.ContentViewBtn>
                <S.ContentDownloadBtn
                  onClick={() => {
                    setResolutionId(data.id);
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
        {rightData &&
          rightData.map((data: IResolution) => (
            <S.RContent key={data.id}>
              <S.ContentHeader>
                <S.ContentTitle>{data.groupName}</S.ContentTitle>
                <S.ContentViewBtn onClick={() => navigate(`/board-resolution/${data.id}`)}>View</S.ContentViewBtn>
                <S.ContentDownloadBtn
                  onClick={() => {
                    setResolutionId(data.id);
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
  ) : (
    <Loader />
  );
};

export default ResolutionsList;
