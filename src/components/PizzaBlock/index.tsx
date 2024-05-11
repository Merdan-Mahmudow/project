import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/cart/slice'

import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../../svg/PlusSvg'
import { selectCartItemById } from '../../redux/cart/selectors'
import { CartItem } from '../../redux/cart/types'

type PizzaBlockProps = {
  id: string,
  image: string,
  foodName: string,
  price: number,
  description: string,
}

export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id = '0',
  image = '',
  foodName = '',
  price = 0,
  description = '',
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
      description,
    }
    dispatch(addItem(item))
  }

  return (
    <div className='rounded-2xl bg-white pb-2'>
      <Link key={id} to={`/pizza/${id}`}>
          <img
            className='w-full h-[120px] rounded-t-2xl'
            src={image}
            alt='Pizza'
          />
        </Link>
      <div className='flex flex-col justify-between px-2 gap-1'>
        
        <h4 className='text-lg font-term leading-4'>{foodName}</h4>
        <p className='text-[6pt] leading-tight top-1 relative'>{description}</p>
        <div className='font-term text-grey'>{price}P</div>
        <button
          onClick={onClickAdd}
          // button button--outline button--add flex justify-between items-center
          className='border-2 border-[#ABABAB] w-fit px-5 py-2 rounded-md landing-1 uppercase font-next text-[10px] font-bold'>
          {/* <PlusSvg /> */}
          Добавить
          {addedCount > 0 && <i className='text-[10px] font-next font-bold bg-black text-white px-[5px] py-[2px] rounded-full ml-2'>{addedCount}</i>}
        </button>

      </div>
    </div>
  )
}