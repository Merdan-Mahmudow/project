import React from 'react'
import { Link } from 'react-router-dom'
import { InfoBox } from '../components/InfoBox'
import { CartItem } from '../components/CartItem'
import CartPageSvg from '../svg/CartPageSvg'
import BasketSvg from '../svg/BasketSvg'
import BackArrowSvg from '../svg/BackArrowSvg'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { clearItems } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'
import { HiPlusSm } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";
import cutlery from '../assets/images/cutlery_2.svg';
import bus from '../assets/images/bus.svg'
import money from '../assets/images/money_hand.svg'
import comment from '../assets/images/list_items.svg'
import promo from '../assets/images/promocode.svg'
import { DeliveryType } from './Delivery_Type'
import DeliverySelectionPage from './DeliverySelectionPage'
import arrow_back from '../assets/images/Arrow 5.svg'

export default function Error(){

  return (
    <div className='h-[60vh] bg-white flex flex-col justify-center items-center gap-9'>
         <h1 className="text-[50px] font-term text-center leading-8 tracking-widest">ОШИБКА <br></br>404</h1>
         <p className="font-next text-center leading-5 tracking-widest font-[100] text-[13px]">К сожалению не удалось ОТКРЫТЬ СТРАНИЦУ.<br></br>
ПОПРОБУЙТЕ повторить попытку позже.</p>
<Link to='/' className="bg-red-600 text-white px-7 py-2 rounded-md uppercase font-next font-bold">На Главную</Link>
    </div>
  )
}