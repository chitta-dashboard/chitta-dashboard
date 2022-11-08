import { Ref, useEffect, useRef, Dispatch, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { DESCENDING, ENDPOINTS, sortObj } from "../../../utils/constants";
import ResolutionPdf from "../../../views/resolution-certificate/resolutionPdf";
import { IResolution } from "../../../utils/store/slice/resolution";
import leafLine from "../../../assets/images/leafLine.svg";
import { useFetch } from "../../../utils/hooks/query";
import Loader from "../../loader";
import Toast from "../../../utils/toast";
import S from "./resolutionsTree.styled";

interface Props {
  resolutionId: string | null;
  setResolutionId: Dispatch<string | null>;
}

const ResolutionsTree: FC<Props> = ({ resolutionId, setResolutionId }) => {
  const {
    formatChangeSuccess,
    result: { data: resolutionsObj, isError },
  } = useFetch(ENDPOINTS.resolutions, { errorCb: () => Toast({ message: "Can't reach the server, please try again.", type: "error" }) });

  const resolutions = formatChangeSuccess ? sortObj<IResolution>(Object.values(resolutionsObj), DESCENDING, "creationTime", { asDate: true }) : [];
  const leafCount = resolutions?.length <= 4 ? resolutions?.length : 4;
  const navigate = useNavigate();
  const ResolutionFormPdf = useRef<HTMLDivElement>();

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
    <>
      <S.InvisibleBox>
        <ResolutionPdf ref={ResolutionFormPdf as Ref<HTMLDivElement> | undefined} resolutionId={resolutionId} />
      </S.InvisibleBox>
      <S.ResolutionsTreeBox leafCount={leafCount}>
        <S.Bud leafCount={leafCount}>
          <img src={leafLine} alt={""} draggable={false} />
        </S.Bud>
        {leafCount >= 1 && (
          <S.L1 leafCount={leafCount}>
            <S.ResolutionsTimestamp placement="left">{resolutions[0].timestamp}</S.ResolutionsTimestamp>
            <S.LeafContentBox>
              <S.LeafContent>
                <S.ResolutionTitle>{resolutions[0].groupName}</S.ResolutionTitle>
                <S.ResolutionDescription>{resolutions[0].groupTitle}</S.ResolutionDescription>
                <S.ButtonsBar>
                  <S.ViewBtn onClick={() => navigate(`/board-resolution/${resolutions[0].id}`)}>View</S.ViewBtn>
                  <S.DownloadBtn
                    onClick={() => {
                      setResolutionId(resolutions[0].id);
                    }}
                  >
                    <i>download</i>
                  </S.DownloadBtn>
                </S.ButtonsBar>
              </S.LeafContent>
            </S.LeafContentBox>
            <span className="stem"></span>
            <span className="branch"></span>
            <span className="leaf"></span>
          </S.L1>
        )}
        {leafCount >= 3 && (
          <S.L2 leafCount={leafCount}>
            <S.ResolutionsTimestamp placement="left">{resolutions[2].timestamp}</S.ResolutionsTimestamp>
            <S.LeafContentBox>
              <S.LeafContent>
                <S.ResolutionTitle>{resolutions[2].groupName}</S.ResolutionTitle>
                <S.ResolutionDescription>{resolutions[2].groupTitle}</S.ResolutionDescription>
                <S.ButtonsBar>
                  <S.ViewBtn onClick={() => navigate(`/board-resolution/${resolutions[2].id}`)}>View</S.ViewBtn>
                  <S.DownloadBtn
                    onClick={() => {
                      setResolutionId(resolutions[2].id);
                    }}
                  >
                    <i>download</i>
                  </S.DownloadBtn>
                </S.ButtonsBar>
              </S.LeafContent>
            </S.LeafContentBox>
            <span className="stem"></span>
            <span className="branch"></span>
            <span className="leaf"></span>
          </S.L2>
        )}
        {leafCount >= 2 && (
          <S.R1 leafCount={leafCount}>
            <S.ResolutionsTimestamp placement="right">{resolutions[1].timestamp}</S.ResolutionsTimestamp>
            <S.LeafContentBox>
              <S.LeafContent>
                <S.ResolutionTitle>{resolutions[1].groupName}</S.ResolutionTitle>
                <S.ResolutionDescription>{resolutions[1].groupTitle}</S.ResolutionDescription>
                <S.ButtonsBar>
                  <S.ViewBtn onClick={() => navigate(`/board-resolution/${resolutions[1].id}`)}>View</S.ViewBtn>
                  <S.DownloadBtn
                    onClick={() => {
                      setResolutionId(resolutions[1].id);
                    }}
                  >
                    <i>download</i>
                  </S.DownloadBtn>
                </S.ButtonsBar>
              </S.LeafContent>
            </S.LeafContentBox>
            <span className="stem"></span>
            <span className="branch"></span>
            <span className="leaf"></span>
          </S.R1>
        )}
        {leafCount >= 4 && (
          <S.R2 leafCount={leafCount}>
            <S.ResolutionsTimestamp placement="right">{resolutions[3].timestamp}</S.ResolutionsTimestamp>
            <S.LeafContentBox>
              <S.LeafContent>
                <S.ResolutionTitle>{resolutions[3].groupName}</S.ResolutionTitle>
                <S.ResolutionDescription>{resolutions[3].groupTitle}</S.ResolutionDescription>
                <S.ButtonsBar>
                  <S.ViewBtn onClick={() => navigate(`/board-resolution/${resolutions[3].id}`)}>View</S.ViewBtn>
                  <S.DownloadBtn
                    onClick={() => {
                      setResolutionId(resolutions[3].id);
                    }}
                  >
                    <i>download</i>
                  </S.DownloadBtn>
                </S.ButtonsBar>
              </S.LeafContent>
            </S.LeafContentBox>
            <span className="stem"></span>
            <span className="branch"></span>
            <span className="leaf"></span>
          </S.R2>
        )}
        <S.Shadow />
      </S.ResolutionsTreeBox>
      {leafCount === 0 && <S.NodataMessage>No Data</S.NodataMessage>}
    </>
  ) : !isError ? (
    <Loader />
  ) : (
    <S.NodataMessage>Something wrong, cannot reach the server.</S.NodataMessage>
  );
};

export default ResolutionsTree;
