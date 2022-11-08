import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { farmerDetail, addFarmerId, setPageCount, checkBoxUnselectAll, setFarmersIdToExport } from "../../../../utils/store/slice/farmerDetails";
import { useFetch } from "../../../../utils/hooks/query";
import Loader from "../../../loader";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";

const Body = () => {
  const { searchFilter, sortFilter, groupFilter, currentPage } = useSelector((state: any) => state.farmerDetails);
  const dispatch = useDispatch();
  const { formatChangeSuccess: isSuccess, result }: any = useFetch(ENDPOINTS.farmerDetails);
  const { data: farmersDetailsById } = result;
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>([]);
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>([]);
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>([]);
  const [farmersList, setFarmersList] = useState<farmerDetail[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setFarmersListGroup(
        groupFilter === "all"
          ? Object.values(farmersDetailsById as farmerDetail[])
          : Object.values(farmersDetailsById as farmerDetail[]).filter((list) => list.group === groupFilter),
      );
    }
  }, [groupFilter, isSuccess, currentPage, farmersDetailsById]);

  useEffect(() => {
    let result = isSuccess && Object.values(farmersListGroup as farmerDetail[]).filter((farmer) => searchWord(farmer.name, searchFilter));
    let updatedData = isSuccess && [...result];
    isSuccess && setFarmersListSearch(result.splice((currentPage - 1) * 25, 25));
    dispatch(setPageCount({ pageCount: Math.ceil(result.length / 25) + 1, totalPageCount: updatedData.length }));
  }, [searchFilter, farmersListGroup, isSuccess]);

  useEffect(() => {
    isSuccess && setFarmersListSort(sortObj<farmerDetail>(farmersListSearch, sortFilter, "name"));
  }, [farmersListSearch, sortFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setFarmersList(farmersListSort);
    let farmersId = farmersListSort.map((item) => item.id);
    dispatch(setFarmersIdToExport(farmersId));
  }, [farmersListSort, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(checkBoxUnselectAll());
      const farmerId = Object.values(isSuccess && farmersList).map((item: any) => item.id);
      isSuccess && dispatch(addFarmerId(farmerId));
    }
  }, [isSuccess, farmersList]);

  return (
    <>
      {farmersList.length > 0 ? (
        <BodyWrapper>
          {farmersList.map((user: farmerDetail) => (
            <FarmersDetailsRow {...{ user }} key={user.id} />
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>
              <Loader />
            </td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;
