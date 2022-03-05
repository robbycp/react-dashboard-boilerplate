import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Layout from 'components/Layout'

import { useAuthFirebase } from './lib/firebase-auth';
import { useDispatch } from 'react-redux';
import { authUserSet } from './redux/authSlice';

const useElementBuilder = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
  options?: {
    isProtected: boolean
  },
  value?: {
    isAuth: boolean
  }
) => {
  const location = useLocation()
  if (options?.isProtected && !value?.isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <React.Suspense fallback={<>...</>}>
      <Component />
    </React.Suspense>
  )
}

const Home = React.lazy(() => import('pages/home'))
const Table = React.lazy(() => import('pages/table'))
const TableDetail = React.lazy(() => import('pages/table-detail'))

const RootRoutes = () => {
  const dispatch = useDispatch()
  const { isAuth, dataUser } = useAuthFirebase()

  useEffect(() => {
    dispatch(authUserSet({
      user: dataUser,
      isAuth,
    }))
  }, [isAuth, dataUser, dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={useElementBuilder(Home)} />
        <Route path="table" element={useElementBuilder(Table, { isProtected: true }, { isAuth })} />
        <Route path="table/:rowId" element={useElementBuilder(TableDetail, { isProtected: true }, { isAuth })} />
        <Route path="*" element={<>No page</>} />
      </Route>
    </Routes>
  )
}

export default RootRoutes