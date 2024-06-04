import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem, minusItem, removeItem } from '../../redux/cart/slice'
// import { removeItem } from '../../redux/favorite/favSlice'
import { CartItem as CartItemType } from '../../redux/cart/types'
import { RxCross2 } from "react-icons/rx";
import { CartItem } from '../../redux/cart/types'
import { selectCartItemById } from '../../redux/cart/selectors'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { removeItemFav } from '../../redux/favorite/favSlice'
import { FavoriteContext } from '../../routes/Favorites'
import axios from 'axios'
import qs from 'qs'
import { GlobalContext } from '../../routes/router'
import { HiPlusSm } from "react-icons/hi"
import { HiMinusSm } from "react-icons/hi"

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
  const {likeItems, setLikeItems} = useContext(FavoriteContext)
  const cartItem2 = useSelector(selectCartItemById(id))
  const [isCounter, setIsCounter] = useState(localStorage.getItem('isCounter') === 'true')
  const addedCount2 = cartItem2 ? cartItem2.count: 0
  const params = useContext(GlobalContext);

  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItemType),
    )
  }
  const [selectedOptionFav, setSelectedOption] = useState<string>("")

  const onClickMinus = () => {
    if (addedCount === 1){
      onClickRemove()
      setIsCounter(false)
    } 
    if (addedCount > 1) dispatch(minusItem(id))
  }
  const onClickRemoveFav = () => {
    axios.patch(`https://backend.skyrodev.ru/user/${params.user}/fav?favourite_item=${id}`).then(res => {
      setLikeItems(res.data)
      console.log(likeItems)
    })
  }
  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить товар?')) {
      dispatch(removeItem(id))
    }
  }
  const handleAddToCart = () => {
    const item: CartItem = {
      id,
      foodName,
      price,
      image,
      count: 0,
      description,
      isCounter
    }
    dispatch(addItem(item))
    setIsCounter(true)
    localStorage.setItem('count', addedCount.toString())
    localStorage.setItem('isCounter', (isCounter === true).toString())
    console.log(isCounter)
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
          {addedCount > 0 ? (
              <div className='flex gap-2 w-10 justify-between items-center 13mini:mt-2'>
                <button onClick={onClickMinus} className='border-2 border-black rounded-full px-1 py-1 leading-3 text-center flex items-center'><HiMinusSm/></button>
                <span className='font-bold font-next'>{addedCount}</span>
                <button onClick={onClickPlus} className='border-2 border-black rounded-full px-1 py-1 leading-3 text-center flex items-center'><HiPlusSm/></button>
              </div>
               ) : (
                <div>
                    <button
                      onClick={handleAddToCart}
                      className='border-2 border-[#ABABAB] w-[30vw] py-1 rounded-md landing-1 uppercase font-next text-[10px] font-bold text-center 12pro:w-[28vw] 13mini:mt-2'>
                      Добавить
                      {/* {addedCount > 0 && <i className='text-[10px] font-next font-bold bg-black text-white px-[5px] py-[2px] rounded-full ml-2'>{addedCount}</i>} */}
                    </button>
                </div>
               )}
        </div>
        <div className='flex flex-col w-[90px] self-center items-center gap-1'>
          <div className='text-right'>
            <b className='text-xl font-term color w-[80px] text-right text-stone-600'>{price}P</b>
          </div>
          <div onClick={onClickRemoveFav} className='border-2 border-stone-600 rounded-full px-1 py-1'>
            <div className=''><RxCross2 /></div>
          </div>
        </div>
      </div>
  )
}