import React from 'react'
import { Link } from 'react-router-dom'
import { InfoBox } from '../components/InfoBox'
import { CartItem } from '../components/CartItem'
import { FavoriteItem } from '../components/FavoriteItem'
import CartPageSvg from '../svg/CartPageSvg'
import BasketSvg from '../svg/BasketSvg'
import BackArrowSvg from '../svg/BackArrowSvg'
import { useSelector, useDispatch } from 'react-redux'
import { clearItems } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'
import { HiPlusSm } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";
import cutlery from '../assets/images/cutlery_2.svg';
import bus from '../assets/images/bus.svg'
import money from '../assets/images/money_hand.svg'
import comment from '../assets/images/list_items.svg'
import promo from '../assets/images/promocode.svg'
import { selectFav } from '../redux/favorite/selectorsFav'
import arrow_back from '../assets/images/Arrow 5.svg'

export default function Favorites(){
    const dispatch = useDispatch()
    const { items_fav } = useSelector(selectFav)
    const onClickClear = () => {
      if (window.confirm('Очистить корзину?')) {
        dispatch(clearItems())
      }
    }
    return (
        <div className=''>
        {items_fav.length > 0 ? (
          <div className='container container--cart'>
            <div className='cart'>
            <div className="flex w-full  bg-red-600 px-3 py-5">
                <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
                    <img src={arrow_back} alt="" className='h-5 absolute' />
                </Link>
                <h1 className='text-white font-term text-2xl w-full text-center tracking-[6px] leading-5'>ИЗБРАННОЕ</h1>
            </div>
              <div className='content__items'>
                {items_fav.map((item: any) =>
                  <FavoriteItem key={item.id} {...item} />)
                }
              </div>
            </div>
          </div>
        )
          :
          <InfoBox
            title='Корзина пустая'
            description='Вероятней всего, вы не заказывали ещё пиццу.  Для того, чтобы заказать пиццу, перейди на главную страницу.'
            buttonTitle='Вернуться назад'
            alt='Корзина пустая'
          />
        }
      </div>
    )
}