import React, { Suspense } from 'react'
import { createHashRouter } from 'react-router-dom'
import { Root } from './Root'
import { Catalog } from './Catalog'
//import { Detail } from './Detail'
//import { Cart } from './Cart'
// import { Orders } from './Orders'
// import { NotFound } from './NotFound'
// import { ErrorPage } from './ErrorPage'
import { GlobalLoader } from '../components/GlobalLoader'

//const Cart: React.FC = React.lazy(() => import('./Cart'))

const Cart: React.FC = React.lazy(() => import(/*webpackChunkName: "Cart"*/'./Cart'))
const Detail: React.FC = React.lazy(() => import(/*webpackChunkName: "Detail"*/'./Detail'))
const Orders: React.FC = React.lazy(() => import(/*webpackChunkName: "Orders"*/'./Orders'))
const NotFound: React.FC = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./NotFound'))
const ErrorPage: React.FC = React.lazy(() => import(/*webpackChunkName: "ErrorPage"*/'./ErrorPage'))

export const router = createHashRouter([
  {
    path: '',
    element: <Suspense fallback={<GlobalLoader />}><Root /></Suspense>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: '/',
        element: <Catalog />,
      },
      {
        path: 'pizza/:id',
        element: <Detail />,
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
    ],
  },
]) 