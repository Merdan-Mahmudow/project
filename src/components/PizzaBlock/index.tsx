import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/cart/slice'

import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../../svg/PlusSvg'
import { selectCartItemById } from '../../redux/cart/selectors'
import { CartItem } from '../../redux/cart/types'

const typeNames = ['тонкое', 'традиционное']

type PizzaBlockProps = {
  id: string,
  image: string,
  foodName: string,
  price: number,
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id = '0',
  image = '',
  foodName = '',
  price = 0,
}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const addedCount = cartItem ? cartItem.count : 0

  const [activeType, setactiveType] = useState<number>(0)
  const [activeSize, setActiveSize] = useState<number>(0)
  const onClickSize = (i: number) => {
    setActiveSize(i)
  }

  const onClickType = (i: number) => {
    setactiveType(i)
  }

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      foodName,
      price,
      image,
      count: 0,
    }
    dispatch(addItem(item))
  }

  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
        <Link key={id} to={`/pizza/${id}`}>
          <img
            className='pizza-block__image'
            src={image}
            alt='Pizza'
          />
          <h4 className='pizza-block__title'>{foodName}</h4>
        </Link>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button
            onClick={onClickAdd}
            className='button button--outline button--add'>
            <PlusSvg />
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  )
}