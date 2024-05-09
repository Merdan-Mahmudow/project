import React from 'react'
import { Link } from 'react-router-dom'
import { InfoBox } from '../components/InfoBox'
import { CartItem } from '../components/CartItem'
import CartPageSvg from '../svg/CartPageSvg'
import BasketSvg from '../svg/BasketSvg'
import BackArrowSvg from '../svg/BackArrowSvg'
import { useSelector, useDispatch } from 'react-redux'
import { clearItems } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'

export default function Cart() {
  const dispatch = useDispatch()
  const { totalCount, totalPrice, items } = useSelector(selectCart)
  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems())
    }
  }

  const onClickPay = () => {
    if (window.confirm(`Вы заказали ${totalCount} пиц на сумму ${totalPrice} ₽`)) {
      const tg = Telegram.WebApp
      console.log(tg.initDataUnsafe.chat?.id)
      tg.sendData(JSON.stringify(items))
      dispatch(clearItems())
    }
  }

  return (
    <div className='content'>
      {items.length > 0 ? (
        <div className='container container--cart'>
          <div className='cart'>
            <div className="flex w-full  bg-red-600 px-2 py-2">
               <h1 className='text-white font-term text-2xl w-full text-center'>Мой заказ</h1>
            </div>
            <div className='flex justify-end'>
              {/* <div onClick={onClickClear} className='cart__clear'><BasketSvg /><span>Очистить корзину</span></div> */}
              <button onClick={onClickClear}
                className="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#fb7185] via-[#e11d48] to-[#be123c] hover:shadow-xl hover:shadow-red-500 hover:scale-105 duration-300 hover:from-[#be123c] hover:to-[#fb7185]"
              >
                <svg viewBox="0 0 15 15" className="w-5 fill-white">
                  <svg
                    className="w-6 h-6"
                    stroke="currentColor"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      stroke-linejoin="round"
                      stroke-linecap="round"
                    ></path>
                  </svg>
                  Button
                </svg>
              </button>
            </div>
            <div className='content__items'>
              {items.map((item: any) =>
                <CartItem key={item.id} {...item} />)
              }
            </div>
            <div className='cart__bottom'>
              <div className='cart__bottom-details'>
                <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
              </div>
              <div className='cart__bottom-buttons'>
                <Link to={`/`} className='button button--outline button--add go-back-btn'>
                  <BackArrowSvg /><span>Вернуться назад</span>
                </Link>
                <button onClick={onClickPay} className='button pay-btn'>
                  <span>Оплатить сейчас</span>
                </button>
              </div>
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