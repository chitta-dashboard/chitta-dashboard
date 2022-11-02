import { Ref, RefObject, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popover } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import IconWrapper from "../../utils/iconWrapper";
import ResolutionPdf from "./resolutionPdf";
import DeleteModal from "../../components/modals/delete-modal";
import { IResolution } from "../../utils/store/slice/resolution";
import { editResolution, deleteResolution as deleteResolutionInContext } from "../../utils/store/slice/resolution";
import ResolutionModal from "../../components/modals/resolution-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import { RootState } from "../../utils/store";
import { useAuthContext } from "../../utils/context/auth";
import profile from "../../assets/images/Founder.png";
import { S } from "./resolutionCertificate.styled";

const ResolutionCertificatePage = () => {
  const [deletion, setDeletion] = useState(false);
  const [edition, setEdition] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const editedData = useRef<Partial<IResolution>>({});
  const { addNotification } = useAuthContext();
  const navigate = useNavigate();
  const ResolutionFormPdf = useRef<HTMLDivElement>();
  const { resolutionId } = useParams();
  const resolutions = useSelector((state: RootState) => state.resolution.resolutions);
  const threeDotRef = useRef<HTMLSpanElement>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const dispatch = useDispatch();

  // to generate pdf of resolution form
  const generateResolutionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => ResolutionFormPdf.current as HTMLDivElement,
  });

  const deleteResolution = useCallback(() => {
    setDeletion(false);
    resolutionId && dispatch(deleteResolutionInContext(resolutionId));
    navigate(-1);
    addNotification({
      id: "edit" + resolutionId,
      image: profile,
      message: `Resolution "${resolutions[resolutionId as string].groupTitle}" has been deleted.`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolutionId]);

  return (
    <>
      <S.ResolutionCertificateMainContainer>
        <S.CustomBackIcon onClick={() => navigate(-1)}>
          <IconWrapper>back</IconWrapper>
        </S.CustomBackIcon>
        <S.CustomThreeDotsIcon
          aria-describedby={"resolution-certificate-popover"}
          ref={threeDotRef as RefObject<HTMLSpanElement>}
          onClick={() => setPopoverOpen(true)}
        >
          <IconWrapper>three-dots</IconWrapper>
        </S.CustomThreeDotsIcon>
        <Popover
          id={"resolution-certificate-popover"}
          open={popoverOpen}
          anchorEl={threeDotRef.current}
          onClose={() => setPopoverOpen(false)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <S.CustomPopoverList
            onClick={() => {
              generateResolutionPDF();
              setPopoverOpen(false);
            }}
          >
            Download
          </S.CustomPopoverList>
          <S.CustomPopoverList
            onClick={() => {
              setEdition(true);
              setPopoverOpen(false);
            }}
          >
            Edit
          </S.CustomPopoverList>
          <S.CustomPopoverList
            onClick={() => {
              setDeletion(true);
              setPopoverOpen(false);
            }}
          >
            Delete
          </S.CustomPopoverList>
        </Popover>
        <ResolutionPdf ref={ResolutionFormPdf as Ref<HTMLDivElement> | undefined} />
      </S.ResolutionCertificateMainContainer>
      {deletion && (
        <DeleteModal
          openModal={true}
          handleClose={() => setDeletion(false)}
          handleDelete={deleteResolution}
          deleteMessage={
            <span>
              Do you want to delete resolution <S.HightlightText>"{resolutions[resolutionId as string]?.groupTitle}"</S.HightlightText> ?
            </span>
          }
        />
      )}
      {edition && (
        <ResolutionModal
          openModal={true}
          editMode
          handleClose={() => setEdition(false)}
          id={resolutionId}
          cb={(resolution) => {
            editedData.current = resolution;
            setConfirmation(true);
          }}
        />
      )}
      {confirmation && (
        <ConfirmationModal
          openModal={true}
          handleClose={() => setConfirmation(false)}
          yesAction={() => {
            dispatch(editResolution({ resolutionId, resolution: editedData.current as IResolution }));
            setConfirmation(false);
            setEdition(false);
            addNotification({
              id: "edit" + resolutionId,
              image: profile,
              message: `Resolution "${resolutions[resolutionId as string].groupTitle}" has been edited.`,
            });
          }}
        />
      )}
    </>
  );
};

export default ResolutionCertificatePage;
