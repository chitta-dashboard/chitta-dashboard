import { Ref, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IResolution, useResolutionsProviderContext } from "../../utils/context/resolutions";
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
  const deleteMessage = useRef(
    <span>
      Do you want to delete resolution <span style={{ color: "green" }}>"{resolutions[resolutionId as string]?.groupTitle}"</span> ?
    </span>,
  );

  // to generate pdf of decision form
  const generateDecisionPDF = useReactToPrint({
    documentTitle: `Nerkathir_${+new Date()}`,
    content: () => DecisionFormPdf.current as HTMLDivElement,
  });

  const deleteResolution = useCallback(() => {
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
        <S.ButtonContainer>
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
        </S.ButtonContainer>
        <DecisionPdf ref={DecisionFormPdf as Ref<HTMLDivElement> | undefined} />
      </S.DecisionCertificateMainContainer>
      {deletion && (
        <DeleteModal openModal={true} handleClose={() => setDeletion(false)} handleDelete={deleteResolution} deleteMessage={deleteMessage.current} />
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
