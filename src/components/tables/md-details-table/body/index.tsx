import { useState, useEffect } from "react";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { Endpoints, ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import MdDetailsRow from "./row";
import S from "./body.styled";
import { useFetch } from "../../../../utils/hooks/query";

const Body = () => {
  const { result, formatChangeSuccess: isSuccess } = useFetch(ENDPOINTS.mdDetails as Endpoints);
  const { data: mdData } = result;
  const { searchFilter, sortFilter } = useMdDetailsContext();
  const [mdListSearch, setMdListSearch] = useState<mdDetail[]>(isSuccess ? Object.values(mdData) : []);
  const [mdListSort, setMdListSort] = useState<mdDetail[]>(isSuccess ? Object.values(mdData) : []);
  const [mdList, setMdList] = useState<mdDetail[]>(isSuccess ? Object.values(mdData) : []);

  useEffect(() => {
    isSuccess && setMdListSearch(Object.values(mdData as mdDetail[]).filter((md) => searchWord(md.name, searchFilter)));
  }, [mdData, searchFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setMdListSort(sortObj<mdDetail>(mdListSearch, sortFilter, "name"));
  }, [mdListSearch, sortFilter, isSuccess]);

  useEffect(() => {
    isSuccess && setMdList(mdListSort);
  }, [mdListSort, isSuccess]);

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
