import { useState, useEffect } from "react";
import { Founders, useFounderContext } from "../../../../utils/context/founders";
import { searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import FoundersRow from "./row";
import S from "./body.styled";

const Body = () => {
  const { foundersById: listData, searchFilter, sortFilter } = useFounderContext();
  const [founderSearch, setFounderSearch] = useState<Founders[]>(Object.values(listData));
  const [founderSort, setFounderSort] = useState<Founders[]>(Object.values(listData));
  const [founder, setFounder] = useState<Founders[]>(Object.values(listData));

  useEffect(() => {
    setFounderSearch(Object.values(listData).filter((list) => searchWord(list.name, searchFilter)));
  }, [listData, searchFilter]);

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
