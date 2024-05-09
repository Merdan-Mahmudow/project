import React from 'react'
import { Link } from 'react-router-dom'
import MinusCartSvg from '../../svg/MinusCartSvg'
import PlusCartSvg from '../../svg/PlusCartSvg'
import RemoveCartSvg from '../../svg/RemoveCartSvg'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../redux/cart/slice'
import { CartItem as CartItemType } from '../../redux/cart/types'

type CartItemProps = {
  id: string,
  image: string,
  foodName: string,
  price: number,
  count: number,
  description: string
}

export const CartItem: React.FC<CartItemProps> = ({
  id = '0',
  image = '',
  foodName = '',
  price = 0,
  count = 0,
  description = ''
}) => {
  const dispatch = useDispatch()

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItemType),
    )
  }

  const onClickMinus = () => {
    if (count === 1) onClickRemove()
    if (count > 1) dispatch(minusItem(id))
  }

  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить товар?')) {
      dispatch(removeItem(id))
    }
  }

  return (
    <div className='cart__item'>

      <div className='cart__item-img'>
        <Link key={id} to={`/pizza/${id}`}>
          <img
            className='pizza-block__image'
            src={image}
            alt='Pizza'
          />
        </Link>
      </div>
      <div className='cart__item-info'>
        <Link key={id} to={`/pizza/${id}`}>
          <h3>{foodName}</h3>
          <p>{description}</p>
        </Link>
      </div>

      <div className='cart__item-count'>
        <button
          disabled={count === 0}
          onClick={onClickMinus}
          className='button button--outline button--circle cart__item-count-minus'>
          <MinusCartSvg />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className='button button--outline button--circle cart__item-count-plus'>
          <PlusCartSvg />
        </button>
      </div>
      <div className='cart__item-price'>
        <b>{price * count} ₽</b>
      </div>
      <div onClick={onClickRemove} className='cart__item-remove'>
        <div className='button button--outline button--circle'><RemoveCartSvg /></div>
      </div>
    </div>
  )
}