import { FC, useEffect, ChangeEvent } from "react";
import { IconGreen } from "../../dashboard/dashboard-cards/common-styles/commonStyles.styled";
import S from "./dashboardSearch.styled";

interface CustomProps {
  searchHandler?: (searchText: string) => void;
  setSearchKeyWord?: (value: string) => void;
}

let debounceTimer: undefined | NodeJS.Timeout;
function debounce(cb: () => void) {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(cb, 500); // .5s is the debounce time.
}

const SearchBar: FC<CustomProps> = ({ searchHandler, setSearchKeyWord }) => {
  useEffect(
    () => () => {
      searchHandler && searchHandler("");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <S.SearchBarPaper>
      <IconGreen>search</IconGreen>
      <S.SearchBar
        placeholder="  Search..."
        onChange={(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) =>
          debounce(function () {
            setSearchKeyWord
              ? setSearchKeyWord((e.target as HTMLInputElement).value)
              : searchHandler && searchHandler((e.target as HTMLInputElement).value);
          })
        }
      />
    </S.SearchBarPaper>
  );
};
export default SearchBar;
