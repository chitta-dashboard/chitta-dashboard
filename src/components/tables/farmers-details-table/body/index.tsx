import { useState, useEffect, FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINTS, handleDataByPage, searchWord, sortObj } from "../../../../utils/constants";
import { addFarmerDetails, farmerDetail, addFarmerId, setPageCount } from "../../../../utils/store/slice/farmerDetails";
import Loader from "../../../loader";
import { useFetch } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";

type BodyPropsType = {
  page: number;
};

const Body: FC<BodyPropsType> = ({ page }) => {
  // const { farmersDetailsById: farmersDetailsById, searchFilter, sortFilter, groupFilter } = useFarmerDetailsContext();
  const { searchFilter, sortFilter, groupFilter } = useSelector((state: any) => state.farmerDetails);
  const dispatch = useDispatch();
  const { formatChangeSuccess: isSuccess, result }: any = useFetch(ENDPOINTS.farmerDetails);
  const { data: farmersDetailsById } = result;
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>(isSuccess ? Object.values(farmersDetailsById) : []);
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>(isSuccess ? Object.values(farmersDetailsById) : []);
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>(isSuccess ? Object.values(farmersDetailsById) : []);
  const [farmersList, setFarmersList] = useState<farmerDetail[]>(isSuccess ? Object.values(handleDataByPage(farmersDetailsById, page)) : []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const farmerId = Object.values(isSuccess && farmersDetailsById).map((item: any) => item.id);
      isSuccess && dispatch(addFarmerId(farmerId));
    }
  }, [isSuccess, farmersDetailsById]);

  useEffect(() => {
    if (isSuccess && farmersList.length > 0) {
      setIsLoading(true);
    }
  }, [farmersList, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setFarmersListGroup(
        groupFilter === "all"
          ? Object.values(handleDataByPage(farmersDetailsById, page) as farmerDetail[])
          : Object.values(handleDataByPage(farmersDetailsById, page) as farmerDetail[]).filter((list) => list.group === groupFilter),
      );
    }
  }, [groupFilter, farmersDetailsById, isSuccess, page]);

  useEffect(() => {
    // isSuccess && setFarmersListSearch(farmersListGroup.filter((farmer) => searchWord(farmer.name, searchFilter)));
    let result = isSuccess && Object.values(farmersDetailsById as farmerDetail[]).filter((farmer) => searchWord(farmer.name, searchFilter));
    isSuccess && setFarmersListSearch(result.splice((page - 1) * 25, 25));
    dispatch(setPageCount(Math.ceil(result.length / 25)+1));
  }, [searchFilter, farmersListGroup, isSuccess]);

  useEffect(() => {
    isSuccess && setFarmersListSort(sortObj<farmerDetail>(farmersListSearch, sortFilter, "name"));
  }, [farmersListSearch, sortFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setFarmersList(farmersListSort);
  }, [farmersListSort, isSuccess]);

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
