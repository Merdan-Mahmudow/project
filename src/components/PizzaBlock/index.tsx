import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addItem } from '../../redux/cart/slice'
import { addItemFav } from '../../redux/favorite/favSlice'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItemById } from '../../redux/cart/selectors'
import { CartItem } from '../../redux/cart/types'
import heart_img from '../../assets/images/heart_img.svg'
import heart_active from '../../assets/images/heart.png'
import { FavItem } from '../../redux/favorite/types_fav'
type PizzaBlockProps = {
  id: string,
  image: string,
  foodName: string,
  price: number,
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
  description = '',
}, {initialCount = 0}) => {
  const dispatch = useDispatch()
  const cartItem = useSelector(selectCartItemById(id))

  const addedCount = cartItem ? cartItem.count : 0

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
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  };
  
  const setStorageValue = (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
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
  }
  const [isLiked, setIsLiked] = useState<boolean>(() =>
    getStorageValue(`likeButton_${id}`, false)
  );
  
  const handleClick = () => {
    setIsLiked(!isLiked);
    setStorageValue(`likeButton_${id}`, !isLiked);
  }
  const [count, setCount] = useState(initialCount);
  const [isCounter, setIsCounter] = useState(false);

  const handleAddToCart = () => {
    setCount(count + 1)
    setIsCounter(true)
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

  const handleDecrement = () => {
    setCount(count - 1);
    if (count === 1) {
      setIsCounter(false);
    }
  };
  return (
    <div className='rounded-2xl bg-white pb-2 h-50'>
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
        <div className='flex h-50 items-end'>
            <div className='flex w-full justify-between items-center h-full'>
               {isCounter ? (
              <div>
                <button onClick={handleDecrement}>-</button>
                <span>{count}</span>
                <button onClick={handleAddToCart}><span onClick={onClickAdd}>+</span></button>
              </div>
              // {addedCount > 0 && <i className='text-[10px] font-next font-bold bg-black text-white px-[5px] py-[2px] rounded-full ml-2'>{addedCount}</i>}
               ) : (
                <div>
                    <button
                      onClick={handleAddToCart}
                      // button button--outline button--add flex justify-between items-center
                      className='border-2 border-[#ABABAB] w-fit px-5 py-2 rounded-md landing-1 uppercase font-next text-[10px] font-bold'>
                      {/* <PlusSvg /> */}
                      Добавить
                    </button>
                </div>
               )}
                <button onClick={onClickAddFav}>
                  <img src={isLiked ? heart_active : heart_img} alt="" onClick={handleClick} className='w-7 h-7' />
                </button>
            </div>
        </div>

      </div>
    </div>
  )
}