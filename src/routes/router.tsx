import React, { Suspense } from 'react'
import { createHashRouter } from 'react-router-dom'
import { Root } from './Root'
import { Catalog } from './Catalog'
// import { Detail } from './Detail'
// import { Cart } from './Cart'
// import { Orders } from './Orders'
// import { NotFound } from './NotFound'
// import { ErrorPage } from './ErrorPage'
// import { Delivery } from './Delvery'
import { DeliveryType } from './Delivery_Type'
import DeliverySelectionPage from './DeliverySelectionPage';
import { GlobalLoader } from '../components/GlobalLoader'
// import { Cart } from './Cart';
import { useState } from 'react'

const handleDeliverySelection = (deliveryWay: string) => {
  const url = new URL(`${window.location.origin}/?deliveryType=${deliveryWay}`);
  window.history.pushState({ path: url.toString() }, '', url);
};

// const [selectedDeliveryName, setSelectedDeliveryName] = useState<string>('');

// const handleSelect = (deliveryType: DeliveryType) => {
//   const selectedOption = deliveryOptions.find((option) => option.type === deliveryType);
//   if (selectedOption) {
//     setSelectedDeliveryName(selectedOption.name);
//   }
// };
//const Cart: React.FC = React.lazy(() => import('./Cart'))

const Cart: React.FC = React.lazy(() => import(/*webpackChunkName: "Cart"*/'./Cart'))
const Detail: React.FC = React.lazy(() => import(/*webpackChunkName: "Detail"*/'./Detail'))
const Orders: React.FC = React.lazy(() => import(/*webpackChunkName: "Orders"*/'./Orders'))
const NotFound: React.FC = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./NotFound'))
const ErrorPage: React.FC = React.lazy(() => import(/*webpackChunkName: "ErrorPage"*/'./ErrorPage'))
// const DeliverySelectionPage: React.FC = React.lazy(() => import(/*webpackChunkName: "DeliverySelectionPage"*/'./DeliverySelectionPage'))
const Comment: React.FC = React.lazy(() => import(/*webpackChunkName: "Delivery"*/'./Comment'))
const Payment: React.FC = React.lazy(() => import(/*webpackChunkName: "Delivery"*/'./Payment'))
const Favorites: React.FC = React.lazy(() => import(/*webpackChunkName: "Delivery"*/'./Favorites'))
export const router = createHashRouter([
  {
    path: '/',
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
        path: 'delivery',
        element: <DeliverySelectionPage onSelect={handleDeliverySelection}/>
      },
      {
        path: 'orders',
        element: <Orders />,
      },
      {
        path: 'cart',
        element: <Cart/>,
      },
      {
        path: 'comment',
        element: <Comment/>
      },
      {
        path: 'payment',
        element: <Payment/>
      },
      {
        path: 'favorites',
        element: <Favorites/>
      },
    ],
  },
]) 