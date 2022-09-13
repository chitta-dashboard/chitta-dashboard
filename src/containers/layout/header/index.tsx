import React, { FC } from 'react';
import { Typography } from '@mui/material';
import { S } from "./header.styled";

const Header: FC = () => {
  return (
    <S.HeaderContainer>
      <Typography variant="h5"> App Header</Typography>
    </S.HeaderContainer>
  );
};

export default Header;