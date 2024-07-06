import { useState, useEffect, useContext } from 'react'
// import { addItem } from '../redux/cart/slice'
import { GlobalLoader } from '../components/GlobalLoader'
import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../svg/PlusSvg'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { addItem } from '../redux/cart/slice'
// import { addItemFav } from '../redux/favorite/favSlice'
import { selectCartItemById } from '../redux/cart/selectors'
import { CartItem } from '../redux/cart/types'
import { FavItem } from '../redux/favorite/types_fav'
import heart_img from '../assets/images/heart_img.svg'
import heart_active from '../assets/images/heart.png'
import { Link } from 'react-router-dom'
import arrow_back from '../assets/images/Arrow 5.svg'
import { FavoriteContext } from './Favorites'
import $ from 'jquery'
import { CartItem as CartItemType } from '../redux/cart/types'
import qs, { ParsedQs } from 'qs'
import { addItem, minusItem, removeItem} from '../redux/cart/slice'
import { HiPlusSm } from "react-icons/hi"
import { HiMinusSm } from "react-icons/hi"

const typeNames = ['тонкое', 'традиционное']

export type PizzaBlockProps = {
  id: string,
  image: string,
  foodName: string,
  description: string,
  price: number,
  count: number,
}


export const Detail = () => {
  // const likeItems = JSON.parse(localStorage.getItem('likeItems') || '[]')
  const params = useParams()
  const navigate = useNavigate()
  const {likeItems, setLikeItems} = useContext(FavoriteContext)
  // const cartItem = useSelector(selectCartItemById(params.id as string))
  const [activeType, setactiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pizza, setPizza] = useState<PizzaBlockProps>({
    "id": '0',
    "image": '',
    "foodName": '',
    "description": '',
    "price": 0,
    "count": 0,
  })
  const dispatch = useDispatch()
  // const cartItem = useSelector(selectCartItemById(id))
  const onClickSize = (i: number) => setActiveSize(i)
  const onClickType = (i: number) => setactiveType(i)
  const cartItem = useSelector(selectCartItemById(pizza.id))
  var [isCounter, setIsCounter] = useState(localStorage.getItem('isCounter') === 'true')
  const counter = cartItem ? cartItem.isCounter: false
  const addedCount = cartItem ? cartItem.count : 0

  const getStorageValue = (key: string, defaultValue: any): any => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  }
  const setStorageValue = (key: string, value: any): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };
  const [isLiked, setIsLiked] = useState<boolean>()
  // getStorageValue(`likeButton_${id}`, false)
  // );
  const checkbutton: any = () => {
    return likeItems.find((item: any) => item.id === pizza.id) ? heart_active : heart_img
  }

  const handleClick = () => {
    setIsLiked(!isLiked);
    // setStorageValue(`likeButton_${id}`, !isLiked);
  };
  const onClickAdd = () => {
    const item = {
      id: pizza.id,
      foodName: pizza.foodName,
      description: pizza.description,
      price: pizza.price,
      image: pizza.image,
      count: pizza.count,
      isCounter: true
    }
    dispatch(addItem(item))
  }
  // const PizzaBlock: React.FC<PizzaBlockProps> = ({
  //   id = '0',
  //   image = '',
  //   foodName = '',
  //   price = 0,
  //   description = '',
  // }) => {
  // const onClickAdd = () => {
  //   const item: CartItem = {
  //     id,
  //     foodName,
  //     price,
  //     image,
  //     count: 0,
  //     description,
  //   }
  //   dispatch(addItem(item))
  // }

  const onClickAddFav = () => {
    const item_fav: FavItem = {
      id: pizza.id,
      foodName: pizza.foodName,
      description: pizza.description,
      price: pizza.price,
      image: pizza.image,
      count: pizza.count,
      isCounter: true
    }
    dispatch(addItem(item_fav))
  }
  const onClickFav = () => {
    axios.patch(`https://backend.skyrodev.ru/user/${params.user}/fav?favourite_item=${pizza.id}`).then(res => {
      setLikeItems(res.data)
      localStorage.setItem('likeItems', JSON.stringify(res.data))
    })
    
    
  }
  const onClickRemove = () => {
    if (window.confirm('Вы точно хотите удалить товар?')) {
      dispatch(removeItem(pizza.id))
    }
  }
  const handleAddToCart = () => {
    const item: CartItem = {
      id: pizza.id,
      foodName: pizza.foodName,
      description: pizza.description,
      price: pizza.price,
      image: pizza.image,
      count: pizza.count,
      isCounter: true
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
        id:pizza.id,
      } as CartItemType),
    )
  }

  const onClickMinus = () => {
    if (addedCount === 1){
      onClickRemove()
      setIsCounter(false)
    } 
    if (addedCount > 1) dispatch(minusItem(pizza.id))
  }
  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://backend.skyrodev.ru/food/${params.id}`)
        setPizza(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        alert('Ошибка при получении товара!')
        navigate('/')
      }
    }
    fetchPizza()
    $(`.like_${pizza.id}`).attr('src', checkbutton)
  }, [])
  // const onClickAddFav = () => {
  //   const item_fav: FavItem = {
  //     id,
  //     foodName,
  //     price,
  //     image,
  //     count: 0,
  //     description,
  //   }
  //   dispatch(addItemFav(item_fav))
  // }

  // if (loading) return <GlobalLoader smalMode={false} />

  return (
      <div className='content'>
        <div className="flex w-full  bg-red-600 px-3 py-5">
          <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
            <img src={arrow_back} alt="" className='h-5 absolute' />
          </Link>
          <h1 className='text-white font-term text-2xl w-full text-center tracking-[6px] leading-5'>МЕНЮ</h1>
        </div>
        <div className='h-[75vh]'>
          <div className='pizza-block-wrapper px-5 py-5'>
            <div className='pizza-detail-block bg-white h-auto rounded-xl pb-3'>
              <div className='flex w-full justify-center'>
                <img
                  className='w-full rounded-t-xl h-[35vh]'
                  src={pizza.image}
                  alt='Food'
                />
              </div>
              <div className='pizza-detail-info'>
                <h4 className='font-term uppercase text-4xl pl-3 pt-2'>{pizza.foodName}</h4>
                <div className='font-roboto text-l text-[14px] pl-3 text-[#5F5F5F] w-[70vw]'>{pizza.description}</div>
                <h4 className='font-term uppercase text-4xl pl-3 tracking-[5px] text-[#474747] pt-2'>{pizza.price}P</h4>
                <div className='flex justify-between px-3 py-3 items-center'>
                  <div className='flex w-full justify-between items-center h-full'>
                  <div className='flex justify-between'>
                    {addedCount > 0 ? (
                      <div className='gap-2'>
                        <button onClick={onClickMinus} className='border-2 border-black rounded-full px-1 py-1'><HiMinusSm /></button>
                        <span className='font-bold font-next mx-2'>{addedCount}</span>
                        <button onClick={onClickPlus} className='border-2 border-black rounded-full px-1 py-1'><HiPlusSm /></button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={handleAddToCart}
                          className='border-2 border-[#ABABAB] px-[18vw] py-2 rounded-md landing-1 uppercase font-next text-[15px] font-bold text-center'>
                          Добавить

                        </button>
                      </div>
                    )}
                    </div>
                    <button onClick={onClickFav}>
                    <img alt="" src= {checkbutton()} onClick={()=>{
                    $(`.like_${pizza.id}`).attr('src', checkbutton())
                  }} className={`like_${pizza.id} w-[10vw]`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}