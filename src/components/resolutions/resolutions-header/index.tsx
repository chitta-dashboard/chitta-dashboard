import { FC, useState } from "react";
import IconWrapper from "../../../utils/iconWrapper";
import ResolutionModal from "../../modals/resolution-modal";
import { ENDPOINTS, MessageStructured } from "../../../utils/constants";
import { useAdd, useFetch } from "../../../utils/hooks/query";
import { useAuthContext } from "../../../utils/context/auth";
import Toast from "../../../utils/toast";
import S from "./resolutionsHeader.styled";
import { useResolutionContext } from "../../../utils/context/resolution";

const ResolutionsHeader: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { tab, changeTab } = useResolutionContext();
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
                Toast({ message: "Resolution added successfully.", type: "success" });
              },
              errorCb: () => {
                Toast({ message: "Request failed, please try again.", type: "error" });
              },
            })
          }
        />
      )}
    </>
  );
};

export default ResolutionsHeader;
