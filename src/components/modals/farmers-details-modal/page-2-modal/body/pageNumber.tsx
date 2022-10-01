import { Box } from "@mui/material";

import page2 from "../../../../../assets/images/page-2.svg";

import S from "./page2Modal.styled";

const PageNumber2 = () => {
  return (
    <>
      <Box>
        <S.PageNumber alt="page number 2" src={page2} />
      </Box>
    </>
  );
};

export default PageNumber2;
