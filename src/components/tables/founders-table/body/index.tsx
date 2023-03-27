import { useState, useEffect } from "react";
import { Founders, useFounderContext } from "../../../../utils/context/founders";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { useFetch } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import FoundersRow from "./row";
import S from "./body.styled";

const Body = () => {
  //constants
  const { formatChangeSuccess: isSuccess, result } = useFetch(ENDPOINTS.founders);
  const { data: foundersData } = result;

  //state values
  const { searchFilter, sortFilter } = useFounderContext();
  const [founderSearch, setFounderSearch] = useState<Founders[]>(isSuccess ? Object.values(foundersData) : []);
  const [founderSort, setFounderSort] = useState<Founders[]>(isSuccess ? Object.values(foundersData) : []);
  const [founder, setFounder] = useState<Founders[]>(isSuccess ? Object.values(foundersData) : []);

  useEffect(() => {
    isSuccess && setFounderSearch(Object.values(foundersData as Founders[]).filter((list) => searchWord(list.name, searchFilter)));
  }, [isSuccess, foundersData, searchFilter]);

  useEffect(() => {
    setFounderSort(sortObj<Founders>(founderSearch, sortFilter, "name"));
  }, [founderSearch, sortFilter]);

  useEffect(() => {
    setFounder(founderSort);
  }, [founderSort]);

  return (
    <>
      {founder.length > 0 ? (
        <BodyWrapper>
          {founder.map((user) => (
            <FoundersRow {...{ user }} key={user.id} />
          ))}
        </BodyWrapper>
      ) : (
        <S.EmptyMsg>
          <tr>
            <td>No Founders..</td>
          </tr>
        </S.EmptyMsg>
      )}
    </>
  );
};

export default Body;
