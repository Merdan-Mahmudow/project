import React from 'react'
import { Link } from 'react-router-dom'
import MinusCartSvg from '../../svg/MinusCartSvg'
import PlusCartSvg from '../../svg/PlusCartSvg'
import RemoveCartSvg from '../../svg/RemoveCartSvg'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../redux/cart/slice'
import { CartItem as CartItemType } from '../../redux/cart/types'
import { HiPlusSm } from "react-icons/hi";
import { HiMinusSm } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";

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
    <div className='flex justify-between bg-[#F1F1F1] border-b-2 border-stone-700 py-2 px-2 gap-2'>

      <div className='flex justify-center items-center'>
        <Link key={id} to={`/pizza/${id}`}>
          <img
            className='w-[100px] h-[90px] rounded-[20px]'
            src={image}
            alt='Pizza'
          />
        </Link>
      </div>
      <div className='w-[165px]'>
        <Link key={id} to={`/pizza/${id}`} className='gap-2 flex flex-col'>
          <h3 className='font-term text-2xl leading-4'>{foodName}</h3>
          <p className='font-next text-[6px] leading-2'>{description}</p>
        </Link>
        <div className='flex items-center gap-2 mt-2'>
            <button
              disabled={count === 0}
              onClick={onClickMinus}
              className='px-[2px] py-[2px] border-2 border-stone-600 rounded-full text-center'>
              {/* <MinusCartSvg /> */}
              <HiMinusSm />
            </button>
            <b>{count}</b>
            <button
              onClick={onClickPlus}
              className='px-[2px] py-[2px] border-2 border-stone-600 rounded-full text-center'>
              {/* <PlusCartSvg /> */}
              <HiPlusSm />
            </button>
          </div>
      </div>
      <div className='flex flex-col w-[90px] self-center items-center gap-1'>
        <div className='text-right'>
          <b className='text-xl font-term color w-[80px] text-right text-stone-600'>{price * count} P</b>
        </div>
        <div onClick={onClickRemove} className='border-2 border-stone-600 rounded-full px-1 py-1'>
          <div className=''><RxCross2/></div>
        </div>
      </div>
    </div>
  )
}