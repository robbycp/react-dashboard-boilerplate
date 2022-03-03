import React from 'react'
import styled from '@emotion/styled';

import logo from 'assets/img/logo.svg';

import './page-home-style.css'
import { Typography } from '@mui/material';

const LayoutHome = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

const PageHomeView = () => {
  return (
    <LayoutHome>
      <img src={logo} className="App-logo" alt="logo" />
      <Typography variant="h6">Welcome to {process.env.REACT_APP_WEBSITE_NAME}</Typography>
    </LayoutHome>
  )
}

export default PageHomeView