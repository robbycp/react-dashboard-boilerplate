import React from 'react'
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';

import logo from 'assets/img/logo.svg';
import { AuthState } from 'app/redux/slices/authSlice';

import './page-home-style.css'

const LayoutHome = styled('div')(() => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledTitleHome = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}))
interface PageHomeViewProps {
  dataAuth: Pick<AuthState, 'status' | 'isAuthenticated'>
  handleSignin: () => void
}

const PageHomeView = ({
  dataAuth,
  handleSignin
}: PageHomeViewProps) => {
  return (
    <LayoutHome>
      <img src={logo} className="App-logo" alt="logo" />
      <StyledTitleHome variant="h6">Welcome to {process.env.REACT_APP_WEBSITE_NAME}</StyledTitleHome>
      {!dataAuth.isAuthenticated && (
        <Button onClick={handleSignin} variant="outlined" startIcon={<GoogleIcon />}>
          Signin with Google
        </Button>
      )}
    </LayoutHome>
  )
}

export default PageHomeView