import { Box } from "@mui/material";

import page1 from "../../../../../assets/images/page-1.svg";

import S from "./page1Modal.styled";

const PageNumber1 = () => {
  return (
    <>
      <Box>
        <S.PageNumber alt="page number 1" src={page1} />
      </Box>
    </>
  );
};

export default PageNumber1;
