import { useState, useEffect } from "react";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import MdDetailsRow from "./row";
import S from "./body.styled";
import { useFetch } from "../../../../utils/hooks/query";

const Body = () => {
  const {
    result: { data: mdDetailsById },
    formatChangeSuccess: isSuccess,
  } = useFetch(ENDPOINTS.mdDetails);
  // const {
  //   result: { data: farmerGroupById },
  //   formatChangeSuccess: isFarmerGroupSuccess,
  // } = useFetch(ENDPOINTS.farmerGroup);

  const { searchFilter, sortFilter } = useMdDetailsContext();
  const [mdListSearch, setMdListSearch] = useState<mdDetail[]>(isSuccess ? Object.values(mdDetailsById) : []);
  const [mdListSort, setMdListSort] = useState<mdDetail[]>(isSuccess ? Object.values(mdDetailsById) : []);
  const [mdList, setMdList] = useState<mdDetail[]>(isSuccess ? Object.values(mdDetailsById) : []);

  useEffect(() => {
    isSuccess && setMdListSearch(Object.values(mdDetailsById as mdDetail[]).filter((md) => searchWord(md.name, searchFilter)));
  }, [mdDetailsById, searchFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setMdListSort(sortObj<mdDetail>(mdListSearch, sortFilter, "name"));
  }, [mdListSearch, sortFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setMdList(mdListSort);
  }, [mdListSort, isSuccess]);

  // const removeMemberIndex = Object.values(state.farmersGroupById)
  //   .map((farmersGroup) => farmersGroup.members)
  //   .findIndex((arr) => arr.includes(action.payload));
  // if (removeMemberIndex !== -1) {
  //   const updatedMember = Object.values(state.farmersGroupById)[removeMemberIndex]["members"].filter((member) => member !== action.payload);
  //   return {
  //     ...state,
  //     farmersGroupById: {
  //       ...(Object.values(state.farmersGroupById)[removeMemberIndex].members = updatedMember),
  //     },
  //   };
  // }
  // return { ...state };

  // const removeFarmerFromGroup = ;

  return (
    <>
      {mdList.length > 0 ? (
        <BodyWrapper>
          {mdList.map((user) => (
            <MdDetailsRow {...{ user }} key={user.id} />
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No MD Details..</td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;
