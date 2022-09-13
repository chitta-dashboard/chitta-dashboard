import React from 'react';
import { Typography } from '@mui/material';
import { S } from './dashboard.styled';

const Dashboard = () => {
    return (
      <S.DashBoaderContainer>
        <Typography variant="h6">App dashboard</Typography>
      </S.DashBoaderContainer>
    );
};

export default Dashboard;