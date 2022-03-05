import React from 'react'
import { authSigninGoogle, selectAuthState } from 'app/redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'

import PageHomeView from './page-home-view'

const PageHomeContainer = () => {
  const dispatch = useDispatch()
  const dataAuth = useSelector(selectAuthState)
  const handleSignin = () => {
    dispatch(authSigninGoogle())
  }
  const propsView = {
    dataAuth,
    handleSignin,
  }
  return (
    <PageHomeView {...propsView} />
  )
}

export default PageHomeContainer