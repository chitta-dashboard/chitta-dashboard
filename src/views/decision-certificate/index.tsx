import { Ref, RefObject, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IResolution, useResolutionsProviderContext } from "../../utils/context/resolutions";
import { Popover } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import IconWrapper from "../../utils/iconWrapper";
import DecisionPdf from "./DecisionPdf";
import DeleteModal from "../../components/modals/delete-modal";
import DecisionsModal from "../../components/modals/decisions-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import { useAuthContext } from "../../utils/context/auth";
import profile from "../../assets/images/Founder.png";
import { S } from "./decision-certificate.styled";

const DecisionCertificatePage = () => {
  const [deletion, setDeletion] = useState(false);
  const [edition, setEdition] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const editedData = useRef<Partial<IResolution>>({});
  const { addNotification } = useAuthContext();
  const navigate = useNavigate();
  const DecisionFormPdf = useRef<HTMLDivElement>();
  const { resolutionId } = useParams();
  const { resolutions, editResolution, deleteResolution: deleteResolutionInContext } = useResolutionsProviderContext();
  const threeDotRef = useRef<HTMLSpanElement>();
  const [popoverOpen, setPopoverOpen] = useState(false);

  // to generate pdf of decision form
  const generateDecisionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => DecisionFormPdf.current as HTMLDivElement,
  });

  const deleteResolution = useCallback(() => {
    setDeletion(false);
    resolutionId && deleteResolutionInContext(resolutionId);
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
      <S.DecisionCertificateMainContainer>
        {/* <S.ButtonContainer>
          <IconWrapper onClick={() => navigate(-1)}>back</IconWrapper>
          <S.ButtonAlignmentBox>
            <S.Button onClick={() => setDeletion(true)}>Delete</S.Button>
            <S.Button
              onClick={() => {
                generateDecisionPDF();
              }}
            >
              Download
            </S.Button>
            <S.Button onClick={() => setEdition(true)}>Edit</S.Button>
          </S.ButtonAlignmentBox>
        </S.ButtonContainer> */}
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
              generateDecisionPDF();
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
        <DecisionPdf ref={DecisionFormPdf as Ref<HTMLDivElement> | undefined} />
      </S.DecisionCertificateMainContainer>
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
        <DecisionsModal
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
            editResolution(resolutionId || "", editedData.current as IResolution);
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

export default DecisionCertificatePage;
