import { useState } from "react";
import { Popover } from "@mui/material";
import TablePageHeader from "../../components/common-table-page-header";
import AddFarmersGroupModal from "../../components/modals/farmers-group-modal";
import { IAddFarmersGroupFormInput } from "../../components/modals/type/formInputs";
import FarmersGroupTable from "../../components/tables/farmers-group-table";
import { useFarmersGroupContext } from "../../utils/context/farmersGroup";
import S from "./farmersGroup.styled";

const FarmersGroup = () => {
  const [addModal, setAddModal] = useState(false);
  const { addFarmersGroup, setSearchFilter, setSortFilter, sortFilter, setMemberFilter } = useFarmersGroupContext();
  const [pop, setPop] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const popOverHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPop(!pop);
    setAnchor(event.currentTarget);
  };

  const setMemberHandler = (value: string) => {
    setMemberFilter(value);
    setPop(!pop);
  };

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  // Add Farmergroup Handler
  const addDataHandler = (data: IAddFarmersGroupFormInput & { id: string }) => {
    addFarmersGroup(data);
  };

  return (
    <>
      <S.FarmersGroupContainer>
        <TablePageHeader
          addModalHandler={addModalHandler}
          searchHandler={setSearchFilter}
          sortHandler={setSortFilter}
          sortFilter={sortFilter}
          popOverHandler={popOverHandler}
        />
        <FarmersGroupTable />
      </S.FarmersGroupContainer>
      <AddFarmersGroupModal openModal={addModal} handleClose={addModalHandler} cb={addDataHandler} />

      <Popover
        open={pop}
        anchorEl={anchor}
        onClose={() => setPop(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <S.Items onClick={() => setMemberHandler("all")}>All</S.Items>
        <S.Items onClick={() => setMemberHandler("1")}>With Member</S.Items>
        <S.Items onClick={() => setMemberHandler("0")}>Without Member</S.Items>
      </Popover>
    </>
  );
};

export default FarmersGroup;
