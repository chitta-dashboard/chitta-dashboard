import { useState, useEffect } from "react";
import { Founders, useFounderContext } from "../../../../utils/context/founders";
import { ENDPOINTS, searchWord, sortObj } from "../../../../utils/constants";
import { useFetch } from "../../../../utils/hooks/query";
import BodyWrapper from "../../../custom-tables/body";
import FoundersRow from "./row";
import S from "./body.styled";

const Body = () => {
  //constants
  const {
    formatChangeSuccess: isFoundersSuccess,
    result: { data: foundersData },
  } = useFetch(ENDPOINTS.founders);

  //state values
  const { searchFilter, sortFilter } = useFounderContext();
  const [founderSearch, setFounderSearch] = useState<Founders[]>(isFoundersSuccess ? Object.values(foundersData) : []);
  const [founderSort, setFounderSort] = useState<Founders[]>(isFoundersSuccess ? Object.values(foundersData) : []);
  const [founder, setFounder] = useState<Founders[]>(isFoundersSuccess ? Object.values(foundersData) : []);

  useEffect(() => {
    isFoundersSuccess && setFounderSearch(Object.values(foundersData as Founders[]).filter((list) => searchWord(list.name, searchFilter)));
  }, [isFoundersSuccess, foundersData, searchFilter]);

  useEffect(() => {
    setFounderSort(sortObj<Founders>(founderSearch, sortFilter, "name"));
  }, [founderSearch, sortFilter]);

  useEffect(() => {
    setFounder(founderSort);
  }, [founderSort]);

  return (
    <>
      {Boolean(founder.length) ? (
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
