import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCartItemById } from '../../redux/cart/selectors'
import { CartItem } from '../../redux/cart/types'
import heart_img from '../../assets/images/heart_img.svg'
import heart_active from '../../assets/images/heart.png'
import { FavItem } from '../../redux/favorite/types_fav'
import { addItem, minusItem, removeItem} from '../../redux/cart/slice'
import { CartItem as CartItemType } from '../../redux/cart/types'
import { HiPlusSm } from "react-icons/hi"
import { HiMinusSm } from "react-icons/hi"
import { removeItemFav } from '../../redux/favorite/favSlice'
import { addItemFav } from '../../redux/favorite/favSlice'
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery'
import { FavoriteContext } from '../../routes/Favorites'

type PizzaBlockProps = {
  id: string,
  image: string,
  foodName: string,
  price: number,
  count: number,
  description: string,
  imageSrc: string,
  likeImageSrc: string,
  maxLength?: number;
}
export const PizzaBlock: React.FC<PizzaBlockProps> = ({
  id = '0',
  image = '',
  foodName = '',
  price = 0,
  count = 0,
  description = '',
  maxLength = 9,
}) => {
  const like = useRef(null)
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const cartItem = useSelector(selectCartItemById(id))
  const params = qs.parse(window.location.search.substring(1));
  var [isCounter, setIsCounter] = useState(localStorage.getItem('isCounter') === 'true')
  const addedCount = cartItem ? cartItem.count: 0
  const counter = cartItem ? cartItem.isCounter: false
  const onClickAdd = () => {
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
  }

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
  }
  const [isLiked, setIsLiked] = useState<boolean>(() =>
    getStorageValue(`likeButton_${id}`, false)
  )
  const onClickRemoveFav = () => {
    if (window.confirm('Вы точно хотите удалить товар из избранного?')) {
      dispatch(removeItemFav(id))
      setIsLiked(false)
      setStorageValue(`likeButton_${id}`, !isLiked)
    }
  }
  const onClickFav = () => {
    axios.patch(`https://backend.skyrodev.ru/user/${params.user}/fav?favourite_item=${id}`).then(res => {
      setItems(res.data)
      console.log(items)
    })
    
    
  }
  const handleClick = () => {
    setIsLiked(!isLiked)
    setStorageValue(`likeButton_${id}`, !isLiked)
  }
  const selectedOptionFav = localStorage.getItem("selectedOptionFav")
  const onClickAddFav = () => {
    const item_fav: FavItem = {
      id,
      foodName,
      price,
      image,
      count: 0,
      description,
      isCounter
    }
    dispatch(addItemFav(item_fav))
    // handleClick()
    setIsLiked(!isLiked)
    if (!isLiked) {
      setIsLiked(true)
      // setStorageValue(`likeButton_${id}`, !isLiked)
    }
    else if(isLiked){
      setIsLiked(false)
      // setStorageValue(`likeButton_${id}`, isLiked)
      onClickRemoveFav()
    }
    // handleClick()
  }
  

  const handleAddToCart = () => {
    const item: CartItem = {
      id,
      foodName,
      price,
      image,
      count: addedCount,
      description,
      isCounter
    }
    dispatch(addItem(item))
    // setIsCounter(true)
    if(addedCount > 0){
      isCounter = true
      localStorage.setItem('isCounter', (isCounter === true).toString())
    }
    else{
      isCounter = false
      localStorage.setItem('isCounter', (isCounter === false).toString())
    }
    // isCounter = true
    // if(count > 0){
    //   localStorage.setItem('count', addedCount.toString())
    //   localStorage.setItem('isCounter', (isCounter === true).toString())
    // }
    // else{
    //   localStorage.setItem('count', addedCount.toString())
    //   localStorage.setItem('isCounter', (isCounter === false).toString())
    // }
    console.log(isCounter)
  }
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
  const checkbutton: any = () => {
    return items.find((item: any) => item === id) ? heart_active : heart_img
  }

  React.useEffect(() => {
    axios
      .get(`https://backend.skyrodev.ru/user/${params.user}/fav`)
      .then((e) => {
        let arr:any = []
        e.data.forEach((item: any) => {
            arr.push(item.id)
        })
        console.log(arr)
        setItems(arr)
      })
      .catch((error) => console.error('Error fetching favorites:', error))

      $(`.like_${id}`).attr('src', checkbutton)
      // localStorage.setItem('count', addedCount.toString())
      // localStorage.setItem('isCounter', isCounter.toString())
      console.log(localStorage.getItem('isCounter'))
  }, [])
  const [isTruncated, setIsTruncated] = useState(true)

  const truncatedText = description.split(' ').slice(0, maxLength).join(' ')
  return (
    <FavoriteContext.Provider value={{ items, setItems }}>
    <div className='rounded-2xl bg-white pb-3 h-50'>
      <Link key={id} to={`/pizza/${id}`}>
          <img
            className='w-full h-[120px] rounded-t-2xl'
            src={image}
            alt='Pizza'
          />
        </Link>
      <div className='flex flex-col justify-between px-2 gap-1'>
        <div className='h-[8vh] mt-1 12pro:h-[7vh] flex flex-col gap-1'>
          <h4 className='text-xl font-term leading-4 tracking-widest'>{foodName}</h4>
          {isTruncated ? (
            <span className='text-[6pt] 13mini:text-[5pt] leading-tight relative'>
              {truncatedText}
              {description.length > maxLength * 9 && "..."}
            </span>
          ) : (
            <span className='text-[6pt] leading-tight relative'>
              {description}
            </span>
          )}
          <div className='font-term text-grey text-lg text-[#474747] tracking-widest leading-3'>{price}P</div>
        </div>
        <div className='flex h-50 items-end'>
            <div className='flex w-full justify-between items-center '>
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
                <button onClick={onClickFav}>
                  <img alt="" ref={like} src= {checkbutton()} onClick={()=>{
                    $(`.like_${id}`).attr('src', checkbutton())
                  }} className={`like_${id} w-6 h-6`} />
                </button>
            </div>
        </div>
      </div>
    </div></FavoriteContext.Provider>
  )
}