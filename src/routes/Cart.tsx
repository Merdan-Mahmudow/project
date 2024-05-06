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
      dispatch(clearItems())
    }
  }

  return (
    <div className='content'>
      {items.length > 0 ? (
        <div className='container container--cart'>
          <div className='cart'>
            <div className='cart__top'>
              <h2 className='content__title'><CartPageSvg />Корзина</h2>
              <div onClick={onClickClear} className='cart__clear'><BasketSvg /><span>Очистить корзину</span></div>
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