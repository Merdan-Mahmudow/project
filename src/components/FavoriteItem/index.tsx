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
import { CartItem } from '../../redux/cart/types'
import { selectCartItemById } from '../../redux/cart/selectors'
import { useSelector } from 'react-redux'
type FavoriteItemProps = {
  id: string,
  image: string,
  foodName: string,
  price: number,
  count: number,
  description: string
}

export const FavoriteItem: React.FC<FavoriteItemProps> = ({
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
  const cartItem = useSelector(selectCartItemById(id))
  const addedCount = cartItem ? cartItem.count : 0
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
            <button
              onClick={onClickAdd}
              // button button--outline button--add flex justify-between items-center
              className='border-2 border-[#ABABAB] w-fit px-5 py-2 rounded-md landing-1 uppercase font-next text-[10px] font-bold'>
              {/* <PlusSvg /> */}
              Добавить
              {addedCount > 0 && <i className='text-[10px] font-next font-bold bg-black text-white px-[5px] py-[2px] rounded-full ml-2'>{addedCount}</i>}
            </button>
      </div>
      <div className='flex flex-col w-[90px] self-center items-center gap-1'>
        <div className='text-right'>
          <b className='text-xl font-term color w-[80px] text-right text-stone-600'>{price * count} P</b>
        </div>
        <div className='flex items-center gap-2'>
            <button
              disabled={count === 0}
              onClick={onClickMinus}
              className='px-[2px] py-[2px] border-2 border-stone-600 rounded-full text-center'>
              {/* <MinusCartSvg /> */}
              <HiPlusSm />
            </button>
            <b>{count}</b>
            <button
              onClick={onClickPlus}
              className='px-[2px] py-[2px] border-2 border-stone-600 rounded-full text-center'>
              {/* <PlusCartSvg /> */}
              <HiMinusSm />
            </button>
          </div>
      </div>
    </div>
  )
}