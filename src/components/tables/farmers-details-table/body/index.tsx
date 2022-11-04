import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { addFarmerDetails, farmerDetail } from "../../../../utils/store/slice/farmerDetails";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";
import Loader from "../../../loader";
import { useFetch } from "../../../../utils/hooks/query";

const handleFarmerDetails = (farmerData: any) => {
  let updatedData: any = {};
  let values = Object.values(farmerData);
  let i = 0;
  while (i < 25) {
    updatedData[i + 1] = values[i];
    i++;
  }
  return updatedData;
};

const Body = () => {
  // const { farmersDetailsById: farmersDetailsById, searchFilter, sortFilter, groupFilter } = useFarmerDetailsContext();
  const {
    //farmersDetailsById,
    isFarmerDetailsDataSet: isFarmerData,
    searchFilter,
    sortFilter,
    groupFilter,
  } = useSelector((state: any) => state.farmerDetails);
  const dispatch = useDispatch();
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.farmerDetails);
  const { data: farmersDetailsById } = result;
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>(isSuccess ? Object.values(handleFarmerDetails(farmersDetailsById)) : []);
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>(isSuccess ? Object.values(handleFarmerDetails(farmersDetailsById)) : []);
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>(isSuccess ? Object.values(handleFarmerDetails(farmersDetailsById)) : []);
  const [farmersList, setFarmersList] = useState<farmerDetail[]>(isSuccess ? Object.values(handleFarmerDetails(farmersDetailsById)) : []);
  const [isLoading, setIsLoading] = useState(false);
  // const { isSuccess } = useQuery(["farmerDetails"], handleFarmerDetails, {
  //   onSuccess: (data) => {
  //     dispatch(addFarmerDetails(data));
  //   },
  //   cacheTime:Infinity
  // });

  useEffect(() => {
    if (isSuccess && farmersList.length > 0) {
      setIsLoading(true);
    }
  }, [farmersList, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setFarmersListGroup(
        groupFilter === "all"
          ? Object.values(handleFarmerDetails(farmersDetailsById) as farmerDetail[])
          : Object.values(handleFarmerDetails(farmersDetailsById) as farmerDetail[]).filter((list) => list.group === groupFilter),
      );
    }
  }, [groupFilter, farmersDetailsById, isSuccess]);

  useEffect(() => {
    isSuccess && setFarmersListSearch(farmersListGroup.filter((farmer) => searchWord(farmer.name, searchFilter)));
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
