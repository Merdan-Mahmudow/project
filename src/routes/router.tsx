import React, { Suspense, createContext } from 'react'
import { createHashRouter, createBrowserRouter, redirect } from 'react-router-dom'
import { Root } from './Root'
import { Catalog } from './Catalog'
import {Detail} from './Detail'
import { useParams } from 'react-router-dom'
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
// import { PizzaBlock } from '../components'
import { PizzaBlockProps } from './Detail'
import qs from 'qs'
import { render } from 'react-dom'
import { FavoriteContext } from './Favorites'


// const [selectedDeliveryName, setSelectedDeliveryName] = useState<string>('');

// const handleSelect = (deliveryType: DeliveryType) => {
//   const selectedOption = deliveryOptions.find((option) => option.type === deliveryType);
//   if (selectedOption) {
//     setSelectedDeliveryName(selectedOption.name);
//   }
// };
//const Cart: React.FC = React.lazy(() => import('./Cart'))

const Cart: React.FC = React.lazy(() => import(/*webpackChunkName: "Cart"*/'./Cart'))
// const Detail: React.FC = React.lazy(() => import(/*webpackChunkName: "Detail"*/'./Detail'))
const Orders: React.FC = React.lazy(() => import(/*webpackChunkName: "Orders"*/'./Orders'))
const NotFound: React.FC = React.lazy(() => import(/*webpackChunkName: "NotFound"*/'./NotFound'))
const ErrorPage: React.FC = React.lazy(() => import(/*webpackChunkName: "ErrorPage"*/'./ErrorPage'))
// const DeliverySelectionPage: React.FC = React.lazy(() => import(/*webpackChunkName: "DeliverySelectionPage"*/'./DeliverySelectionPage'))
const Comment: React.FC = React.lazy(() => import(/*webpackChunkName: "Delivery"*/'./Comment'))
const Payment: React.FC = React.lazy(() => import(/*webpackChunkName: "Delivery"*/'./Payment'))
const Favorites: React.FC = React.lazy(() => import(/*webpackChunkName: "Delivery"*/'./Favorites'))

let tgParams: any = qs.parse(window.location.search.substring(1))
if (!localStorage.getItem('tgParams')){
  localStorage.setItem('tgParams', JSON.stringify(tgParams))
} else if (!tgParams.user) {
  tgParams = JSON.parse(localStorage.getItem('tgParams') as string)
} else if (!JSON.parse(localStorage.getItem('tgParams') as string).user){
  redirect('/not-found')
  localStorage.removeItem('tgParams')
}

export const GlobalContext = createContext(tgParams)
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Suspense fallback={<GlobalLoader />}><Root /></Suspense>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '*',
        element: <GlobalContext.Provider value={tgParams}><NotFound /></GlobalContext.Provider>,
      },
      {
        path: '/',
        element: <GlobalContext.Provider value={tgParams}><Catalog /></GlobalContext.Provider>,
      },
      {
        path: 'pizza/:id',
        element: <GlobalContext.Provider value={tgParams}><Detail /></GlobalContext.Provider>
      },
      {
        path: 'delivery',
        // element: <DeliverySelectionPage onSelect={handleDeliverySelection}/>
        element: <GlobalContext.Provider value={tgParams}><DeliverySelectionPage/></GlobalContext.Provider>
      },
      {
        path: 'orders',
        element: <GlobalContext.Provider value={tgParams}><Orders /></GlobalContext.Provider>,
      },
      {
        path: 'cart',
        element: <GlobalContext.Provider value={tgParams}><Cart/></GlobalContext.Provider>,
      },
      {
        path: 'comment',
        element: <GlobalContext.Provider value={tgParams}><Comment/></GlobalContext.Provider>
      },
      {
        path: 'payment',
        element: <GlobalContext.Provider value={tgParams}><Payment/></GlobalContext.Provider>
      },
      {
        path: 'favorites',
        element: <GlobalContext.Provider value={tgParams}><Favorites/></GlobalContext.Provider>
      },
    ],
  },
]) 