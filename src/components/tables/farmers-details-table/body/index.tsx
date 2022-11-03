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

const fetchFarmerDetails = async () => {
  let farmerData = await axios.get("http://localhost:5001/farmerDetails");
  let updatedData: any = {};
  let values = Object.values(farmerData.data);
  let i = 0;
  while (i < 50) {
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

  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>(isSuccess ? Object.values(farmersDetailsById) : []);
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>(isSuccess ? Object.values(farmersDetailsById) : []);
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>(isSuccess ? Object.values(farmersDetailsById) : []);
  const [farmersList, setFarmersList] = useState<farmerDetail[]>(isSuccess ? Object.values(farmersDetailsById) : []);

  // const { isSuccess } = useQuery(["farmerDetails"], fetchFarmerDetails, {
  //   onSuccess: (data) => {
  //     dispatch(addFarmerDetails(data));
  //   },
  //   cacheTime:Infinity
  // });

  useEffect(() => {
    if (isSuccess) {
      setFarmersListGroup(
        groupFilter === "all"
          ? Object.values(farmersDetailsById as farmerDetail[])
          : Object.values(farmersDetailsById as farmerDetail[]).filter((list) => list.group === groupFilter),
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
      {isSuccess ? (
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
