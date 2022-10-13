import { useState } from "react";
import { Popover } from "@mui/material";
import TablePageHeader from "../../components/common-table-page-header";
import AddFarmersGroupModal from "../../components/modals/farmers-group-modal";
import FarmersGroupTable from "../../components/tables/farmers-group-table";
import { FarmersGroup as FarmersGroupType, useFarmersGroupContext } from "../../utils/context/farmersGroup";
import S from "./farmersGroup.styled";

const FarmersGroup = () => {
  const { addFarmersGroup, setSearchFilter, setSortFilter, sortFilter, setMemberFilter } = useFarmersGroupContext();
  const [addModal, setAddModal] = useState(false);
  const [membersFilterPop, setMemberFilterPop] = useState<boolean>(false);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const groupMembersFilter = [
    { id: "1", value: 1, label: "All" },
    { id: "2", value: 2, label: "With Members" },
    { id: "3", value: 3, label: "Without Members" },
  ];

  const popOverHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMemberFilterPop(!membersFilterPop);
    setAnchor(event.currentTarget);
  };

  const setMemberHandler = (value: number) => {
    setMemberFilter(value);
    setMemberFilterPop(!membersFilterPop);
  };

  //Add Modal Handler
  const addModalHandler = () => {
    setAddModal(!addModal);
  };

  // Add Farmergroup Handler
  const addDataHandler = (data: FarmersGroupType) => {
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
        open={membersFilterPop}
        anchorEl={anchor}
        onClose={() => setMemberFilterPop(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {groupMembersFilter.map((data) => (
          <S.Items onClick={() => setMemberHandler(data.value)} key={data.id}>
            {data.label}
          </S.Items>
        ))}
      </Popover>
    </>
  );
};

export default FarmersGroup;
