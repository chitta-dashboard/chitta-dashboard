import { FC, useState } from "react";
import S from "./resolutionsHeader.styled";
import { ENDPOINTS, MessageStructured } from "../../../utils/constants";
import { useAuthContext } from "../../../utils/context/auth";
import { useResolutionContext } from "../../../utils/context/resolution";
import { useAdd, useFetch } from "../../../utils/hooks/query";
import IconWrapper from "../../../utils/iconWrapper";
import Toast from "../../../utils/toast";
import ResolutionModal from "../../modals/resolution-modal";

const ResolutionsHeader: FC = () => {
  // constants
  const toastId = "toadtId";
  // state values
  const [modalOpen, setModalOpen] = useState(false);
  const { tab, changeTab } = useResolutionContext();
  // Queries
  const {
    formatChangeSuccess,
    result: { data: resolutions },
  } = useFetch(ENDPOINTS.resolutions);
  const { mutate } = useAdd(ENDPOINTS.resolutions);
  const { addNotification } = useAuthContext();

  return (
    <>
      <S.Header>
        <IconWrapper onClick={() => changeTab("tree")} isDummy={tab === "tree"}>
          back
        </IconWrapper>
        <S.Title>Board Resolution</S.Title>
        <S.ButtonBox>
          {formatChangeSuccess && Object.values(resolutions).length > 4 && tab === "tree" ? (
            <S.Button onClick={() => changeTab("list")}>View All</S.Button>
          ) : null}
          <S.Button onClick={() => setModalOpen(true)}>Add</S.Button>
        </S.ButtonBox>
      </S.Header>
      {modalOpen && (
        <ResolutionModal
          openModal={true}
          handleClose={() => setModalOpen(false)}
          cb={(data) =>
            mutate({
              data: data,
              successCb: () => {
                addNotification({
                  id: "add" + data.id,
                  message: MessageStructured(data.groupTitle, ENDPOINTS.resolutions, "add"),
                });
                Toast({ message: "Resolution added successfully.", type: "success", customId: `${toastId}-resolutionAdd` });
              },
              errorCb: () => {
                Toast({ message: "Request failed, please try again.", type: "error", customId: `${toastId}-resolutionFail` });
              },
            })
          }
        />
      )}
    </>
  );
};

export default ResolutionsHeader;
