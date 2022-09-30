import { FC, useEffect } from "react";
import { IconGreen } from "../../dashboard/dashboard-cards/common-styles/commonStyles.styled";
import S from "./dashboardSearch.styled";

interface CustomProps {
  searchHandler?: (searchText: string) => void;
}

const SearchBar: FC<CustomProps> = ({ searchHandler }) => {
  useEffect(
    () => () => {
      searchHandler && searchHandler("");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      <S.SearchBarPaper>
        <IconGreen>search</IconGreen>
        <S.SearchBar
          placeholder="  Search..."
          onChange={(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
            searchHandler && searchHandler((e.target as HTMLInputElement).value);
          }}
        />
      </S.SearchBarPaper>
    </>
  );
};
export default SearchBar;
