import React, { useEffect } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Layout from 'components/Layout'

import { useDispatch } from 'react-redux';
import { appStartCheck } from './redux/slices/appSlice';
import useAppSelector from './hooks/useAppSelector';
import useSnackbarRedux from './hooks/useSnackbarRedux';
import { selectAuthState } from './redux/slices/authSlice';

const useElementBuilder = (
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
  options?: {
    isProtected: boolean
  },
) => {
  const { isAuthenticated } = useAppSelector(selectAuthState)
  const location = useLocation()

  if (options?.isProtected && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return (
    <React.Suspense fallback={<>...</>}>
      <Component />
    </React.Suspense>
  )
}

const Home = React.lazy(() => import('app/pages/home'))
const Table = React.lazy(() => import('features/table-example/pages/table'))
const TableDetail = React.lazy(() => import('features/table-example/pages/table-detail'))
const Todos = React.lazy(() => import('features/todo/pages/todo-list'))
const TodoDetail = React.lazy(() => import('features/todo/pages/todo-detail'))

const RootRoutes = () => {
  useSnackbarRedux()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(appStartCheck())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={useElementBuilder(Home)} />
        <Route path="table" element={useElementBuilder(Table, { isProtected: true })} />
        <Route path="table/:rowId" element={useElementBuilder(TableDetail, { isProtected: true })} />
        <Route path="todo" element={useElementBuilder(Todos, { isProtected: true })} />
        <Route path="todo/:todoId" element={useElementBuilder(TodoDetail, { isProtected: true })} />
        <Route path="*" element={<>No page</>} />
      </Route>
    </Routes>
  )
}

export default RootRoutes