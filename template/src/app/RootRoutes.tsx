import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from 'components/Layout'

const getElement = (Component: React.LazyExoticComponent<React.ComponentType<any>>) => {
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
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={getElement(Home)} />
        <Route path="table" element={getElement(Table)} />
        <Route path="table/:rowId" element={getElement(TableDetail)} />
        <Route path="*" element={<>No page</>} />
      </Route>
    </Routes>
  )
}

export default RootRoutes