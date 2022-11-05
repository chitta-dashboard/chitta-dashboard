import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINTS, handleDataByPage, searchWord, sortObj } from "../../../../utils/constants";
import { addFarmerDetails, farmerDetail, addFarmerId, setPageCount, checkBoxUnselectAll,setFarmersIdToExport } from "../../../../utils/store/slice/farmerDetails";
import Loader from "../../../loader";
import { useFetch } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";

const Body = () => {
  // const { farmersDetailsById: farmersDetailsById, searchFilter, sortFilter, groupFilter } = useFarmerDetailsContext();
  const { searchFilter, sortFilter, groupFilter, currentPage } = useSelector((state: any) => state.farmerDetails);
  const dispatch = useDispatch();
  const { formatChangeSuccess: isSuccess, result }: any = useFetch(ENDPOINTS.farmerDetails);
  const { data: farmersDetailsById } = result;
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>([]);
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>([]);
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>([]);
  const [farmersList, setFarmersList] = useState<farmerDetail[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess && farmersList.length > 0) {
      setIsLoading(true);
    }
  }, [farmersList, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setFarmersListGroup(
        groupFilter === "all"
          ? Object.values(farmersDetailsById as farmerDetail[])
          : Object.values(farmersDetailsById as farmerDetail[]).filter((list) => list.group === groupFilter),
      );
    }
  }, [groupFilter, isSuccess, currentPage]);
  //, farmersDetailsById, isSuccess, currentPage

  useEffect(() => {
    // isSuccess && setFarmersListSearch(farmersListGroup.filter((farmer) => searchWord(farmer.name, searchFilter)));
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
      {isLoading ? (
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
                <td>No Farmers Details..</td>
              </tr>
            </S.EmptyMsg>
          )}
        </>
      ) : (
        <tbody>
          <tr>
            <td>
              <Loader />
            </td>
          </tr>
        </tbody>
      )}
    </>
  );
};

export default Body;
