import { useState, useEffect } from "react";
import { farmerDetail, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";

const Body = () => {
  const { farmersDetailsById: listData, searchFilter, sortFilter, groupFilter } = useFarmerDetailsContext();
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>(Object.values(listData));
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>(Object.values(listData));
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>(Object.values(listData));
  const [farmersList, setFarmersList] = useState<farmerDetail[]>(Object.values(listData));

  useEffect(() => {
    setFarmersListGroup(groupFilter === "all" ? Object.values(listData) : Object.values(listData).filter((list) => list.group === groupFilter));
  }, [groupFilter, listData]);

  useEffect(() => {
    setFarmersListSearch(farmersListGroup.filter((farmer) => searchWord(farmer.name, searchFilter)));
  }, [searchFilter, farmersListGroup]);

  useEffect(() => {
    setFarmersListSort(sortObj<farmerDetail>(farmersListSearch, sortFilter, "name"));
  }, [farmersListSearch, sortFilter]);

  useEffect(() => {
    setFarmersList(farmersListSort);
  }, [farmersListSort]);

  return (
    <>
      {farmersList.length > 0 ? (
        <BodyWrapper>
          {farmersList.map((user) => (
            <FarmersDetailsRow {...{ user }} key={user.id} />
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Farmers Details..</td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;
