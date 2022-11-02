import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { searchWord, sortObj } from "../../../../utils/constants";
import { addFarmerDetails, farmerDetail } from "../../../../utils/store/slice/farmerDetails";
import BodyWrapper from "../../../custom-tables/body";
import FarmersDetailsRow from "./row";
import S from "./body.styled";
import Loader from "../../../loader";

const fetchFarmerDetails = async () => {
  let farmerData = await axios.get("http://localhost:5001/farmerDetails");
  let updatedData: any = {};
  let values = Object.values(farmerData.data);
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
    farmersDetailsById,
    isFarmerDetailsDataSet: isFarmerData,
    searchFilter,
    sortFilter,
    groupFilter,
  } = useSelector((state: any) => state.farmerDetails);
  const dispatch = useDispatch();
  const [farmersListGroup, setFarmersListGroup] = useState<farmerDetail[]>(Object.values(farmersDetailsById));
  const [farmersListSearch, setFarmersListSearch] = useState<farmerDetail[]>(Object.values(farmersDetailsById));
  const [farmersListSort, setFarmersListSort] = useState<farmerDetail[]>(Object.values(farmersDetailsById));
  const [farmersList, setFarmersList] = useState<farmerDetail[]>(Object.values(farmersDetailsById));

  const { isSuccess } = useQuery(["farmerDetails"], fetchFarmerDetails, {
    onSuccess: (data) => {
      dispatch(addFarmerDetails(data));
    },
  });

  useEffect(() => {
    setFarmersListGroup(
      groupFilter === "all"
        ? Object.values(farmersDetailsById as farmerDetail[])
        : Object.values(farmersDetailsById as farmerDetail[]).filter((list) => list.group === groupFilter),
    );
  }, [groupFilter, farmersDetailsById]);

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
