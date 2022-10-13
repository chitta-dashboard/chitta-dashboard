import React, { useState, useEffect } from "react";
import { mdDetail, useMdDetailsContext } from "../../../../utils/context/mdDetails";
import { searchWord, sortObj } from "../../../../utils/constants";
import BodyWrapper from "../../../custom-tables/body";
import MdDetailsRow from "./row";
import S from "./body.styled";
//

const Body = () => {
  const { mdDetailsById: listData, searchFilter, sortFilter } = useMdDetailsContext();
  const [mdListSearch, setMdListSearch] = useState<mdDetail[]>(Object.values(listData));
  const [mdListSort, setMdListSort] = useState<mdDetail[]>(Object.values(listData));
  const [mdList, setMdList] = useState<mdDetail[]>(Object.values(listData));

  useEffect(() => {
    setMdListSearch(Object.values(listData).filter((md) => searchWord(md.name, searchFilter)));
  }, [listData, searchFilter]);

  useEffect(() => {
    setMdListSort(sortObj<mdDetail>(mdListSearch, sortFilter, "name"));
  }, [mdListSearch, sortFilter]);

  useEffect(() => {
    setMdList(mdListSort);
  }, [mdListSort]);

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
