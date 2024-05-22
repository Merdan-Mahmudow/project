import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItemFav } from '../../redux/favorite/favSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItemById } from '../../redux/cart/selectors'
import { CartItem } from '../../redux/cart/types'
import heart_img from '../../assets/images/heart_img.svg'
import heart_active from '../../assets/images/heart.png'
import { FavItem } from '../../redux/favorite/types_fav'
import { addItem, minusItem, removeItem} from '../../redux/cart/slice'
import { removeItemFav } from '../../redux/favorite/favSlice'
import { CartItem as CartItemType } from '../../redux/cart/types'
import { HiPlusSm } from "react-icons/hi"
import { HiMinusSm } from "react-icons/hi"
type PizzaBlockProps = {
  id: string,
  image: string,
  foodName: string,
  price: number,
  count: number,
  description: string,
  imageSrc: string;
  likeImageSrc: string;
}
interface Props {
  initialCount: number;
}
export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id = '0',
  image = '',
  foodName = '',
  price = 0,
  count = 0,
  description = '',
}, {initialCount = count}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const [isCounter, setIsCounter] = useState(localStorage.getItem('isCounter') === 'true')
  const addedCount = cartItem ? cartItem.count: 0
  // const [count, setCount] = useState(count);
  // const [activeType, setactiveType] = useState<number>(0)
  // const [activeSize, setActiveSize] = useState<number>(0)
  // const onClickSize = (i: number) => {
  //   setActiveSize(i)
  // }

  // const onClickType = (i: number) => {
  //   setactiveType(i)
  // }
  const getStorageValue = (key: string, defaultValue: any): any => {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : defaultValue
    } catch (error) {
      console.error(error)
      return defaultValue
    }
  };
  
  const setStorageValue = (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(error)
    }
  };
  const onClickAdd = () => {
    // setIsCounter(true)
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

  const [isLiked, setIsLiked] = useState<boolean>(() =>
    getStorageValue(`likeButton_${id}`, false)
  )
  const onClickRemoveFav = () => {
    if (window.confirm('Вы точно хотите удалить товар из избранного?')) {
      dispatch(removeItemFav(id))
      setIsLiked(false)
    }
  }
  // const handleClick = () => {
  //   setIsLiked(!isLiked)
  //   setStorageValue(`likeButton_${id}`, !isLiked)
  // }
  const selectedOptionFav = localStorage.getItem("selectedOptionFav")
  const onClickAddFav = () => {
    const item_fav: FavItem = {
      id,
      foodName,
      price,
      image,
      count: 0,
      description,
    }
    dispatch(addItemFav(item_fav))
    // handleClick()
    setIsLiked(!isLiked)
    if (!isLiked) {
      setIsLiked(true)
      setStorageValue(`likeButton_${id}`, !isLiked)
    }
    else if(isLiked && selectedOptionFav === 'Removed'){
      setIsLiked(false)
      setStorageValue(`likeButton_${id}`, isLiked)
      onClickRemoveFav()
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
    }
    dispatch(addItem(item))
    setIsCounter(true)
  }
  // if(addedCount > 0){
  //   setIsCounter(true)
  // }

  // const handleDecrement = () => {
  //   setCount(count - 1);
  //   if (count === 1) {
  //     setIsCounter(false);
  //   }
  // };
  // const dispatch = useDispatch()
  const onClickPlus = () => {
    dispatch(
      addItem({
        id,
      } as CartItemType),
    )
  }

  const onClickMinus = () => {
    if (addedCount === 1){
      onClickRemove()
      setIsCounter(false)
    } 
    if (addedCount > 1) dispatch(minusItem(id))
  }

  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить товар?')) {
      dispatch(removeItem(id))
    }
  }
  React.useEffect(() => {
    localStorage.setItem('count', addedCount.toString())
    localStorage.setItem('isCounter', setIsCounter.toString())
  }, [addedCount, isCounter])
  return (
    <div className='rounded-2xl bg-white pb-3 h-50'>
      <Link key={id} to={`/pizza/${id}`}>
          <img
            className='w-full h-[120px] rounded-t-2xl'
            src={image}
            alt='Pizza'
          />
        </Link>
      <div className='flex flex-col justify-between px-2 gap-1'>
        <div className='h-[8vh] mt-2 12pro:h-[10vh]'>
          <h4 className='text-lg font-term leading-4'>{foodName}</h4>
          <p className='text-[6pt] leading-tight top-1 relative'>{description}</p>
          <div className='font-term text-grey'>{price}P</div>
        </div>
        <div className='flex h-50 items-end'>
            <div className='flex w-full justify-between items-center '>
               {isCounter ? (
              <div className='flex gap-2 w-10 justify-between items-center'>
                <button onClick={onClickMinus} className='border-2 border-black rounded-full px-1 py-1 leading-3 text-center flex items-center'><HiMinusSm/></button>
                <span className='font-bold font-next'>{addedCount}</span>
                <button onClick={onClickPlus} className='border-2 border-black rounded-full px-1 py-1 leading-3 text-center flex items-center'><HiPlusSm/></button>
              </div>
               ) : (
                <div>
                    <button
                      onClick={handleAddToCart}
                      className='border-2 border-[#ABABAB] w-[30vw] py-1 rounded-md landing-1 uppercase font-next text-[10px] font-bold text-center 12pro:w-[28vw]'>
                      Добавить
                      {/* {addedCount > 0 && <i className='text-[10px] font-next font-bold bg-black text-white px-[5px] py-[2px] rounded-full ml-2'>{addedCount}</i>} */}
                    </button>
                </div>
               )}
                <button onClick={onClickAddFav}>
                  <img src={isLiked ? heart_active : heart_img} alt=""  className='w-7 h-7' />
                </button>
            </div>
        </div>

      </div>
    </div>
  )
}