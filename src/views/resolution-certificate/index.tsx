import { Ref, RefObject, useCallback, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Popover } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import IconWrapper from "../../utils/iconWrapper";
import ResolutionPdf from "./resolutionPdf";
import DeleteModal from "../../components/modals/delete-modal";
import { IResolution } from "../../utils/store/slice/resolution";
import ResolutionModal from "../../components/modals/resolution-modal";
import ConfirmationModal from "../../components/modals/confirmation-modal";
import { useDelete, useEdit, useFetch } from "../../utils/hooks/query";
import { ENDPOINTS, MessageStructured } from "../../utils/constants";
import { useAuthContext } from "../../utils/context/auth";
import Loader from "../../components/loader";
import Toast from "../../utils/toast";
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
  const {
    formatChangeSuccess,
    result: { data: resolutions },
  } = useFetch(ENDPOINTS.resolutions);
  const threeDotRef = useRef<HTMLSpanElement>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { mutate: mutateEdition } = useEdit(ENDPOINTS.resolutions);
  const { mutate: mutateDeletion } = useDelete(ENDPOINTS.resolutions);

  // to generate pdf of resolution form
  const generateResolutionPDF = useReactToPrint({
    documentTitle: `Board_Resolution_${+new Date()}`,
    content: () => ResolutionFormPdf.current as HTMLDivElement,
  });

  const deleteResolution = useCallback(() => {
    setDeletion(false);
    resolutionId &&
      mutateDeletion({
        id: resolutionId,
        successCb: () => {
          navigate(-1);
          addNotification({
            id: "delete" + resolutionId,
            message: MessageStructured(resolutions[resolutionId as string].groupTitle, ENDPOINTS.resolutions, "delete"),
          });
          Toast({ message: "Resolution deleted successfully.", type: "success" });
        },
        errorCb: () => {
          Toast({ message: "Request failed, please try again.", type: "error" });
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolutionId, resolutions]);

  return formatChangeSuccess ? (
    <>
      {Object.keys(resolutions).includes(resolutionId as string) ? (
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
      ) : (
        <S.ResolutionCertificateNodataContainer>
          <S.NoDataErrorText>404 Page Not Found</S.NoDataErrorText>
          <S.NoDataErrorText2 onClick={() => navigate(-1)}>
            <i>back</i> Go Back
          </S.NoDataErrorText2>
        </S.ResolutionCertificateNodataContainer>
      )}
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
            mutateEdition({
              editedData: editedData.current,
              successCb: () => {
                addNotification({
                  id: "edit" + resolutionId,
                  message: MessageStructured(resolutions[resolutionId as string].groupTitle, ENDPOINTS.resolutions, "edit"),
                });
                Toast({ message: "Resolution edited successfully.", type: "success" });
              },
              errorCb: () => {
                Toast({ message: "Request failed, please try again.", type: "error" });
              },
            });
            setConfirmation(false);
            setEdition(false);
          }}
        />
      )}
    </>
  ) : (
    <Loader />
  );
};

export default ResolutionCertificatePage;
