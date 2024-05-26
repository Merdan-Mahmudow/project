import { useState, useEffect } from 'react'
// import { addItem } from '../redux/cart/slice'
import { GlobalLoader } from '../components/GlobalLoader'
import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../svg/PlusSvg'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { addItem } from '../redux/cart/slice'
import { addItemFav } from '../redux/favorite/favSlice'
import { selectCartItemById } from '../redux/cart/selectors'
import { CartItem } from '../redux/cart/types'
import { FavItem } from '../redux/favorite/types_fav'
import heart_img from '../assets/images/heart_img.svg'
import heart_active from '../assets/images/heart.png'
import { Link } from 'react-router-dom'
import arrow_back from '../assets/images/Arrow 5.svg'

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
  const params = useParams()
  const navigate = useNavigate()
  // const dispatch = useDispatch()

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
  const addedCount = cartItem ? cartItem.count : 0

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
  const [isLiked, setIsLiked] = useState<boolean>()
    // getStorageValue(`likeButton_${id}`, false)
  // );

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
    }
    dispatch(addItemFav(item_fav))
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
      <div className='h-[70vh]'>
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
              <div className='font-roboto text-l text-[14px] pl-3 text-[#5F5F5F] w-[70vw]'>{pizza.description} Рис, свиной фарш, огурец, морковь, маш-маш, кимчи и жареное яйцо</div>
              <h4 className='font-term uppercase text-4xl pl-3 tracking-[5px] text-[#474747] pt-2'>{pizza.price}P</h4>
              <div className='flex justify-between px-3 py-3 items-center'>
              <div className='flex w-full justify-between items-center h-full'>
                <button
                  onClick={onClickAdd}
                  // button button--outline button--add flex justify-between items-center
                  className={addedCount > 0 ? 'border-2 border-[#ABABAB] w-fit px-[23vw] py-2 rounded-md landing-1 uppercase font-next text-[12px] font-bold bg-red-600': 'border-2 border-[#ABABAB] w-fit px-[23vw] py-2 rounded-md landing-1 uppercase font-next text-[12px] font-bold'}>
                  {/* <PlusSvg /> */}
                  {/* 'border-2 border-[#ABABAB] w-fit px-[23vw] py-2 rounded-md landing-1 uppercase font-next text-[12px] font-bold' */}
                  Добавить
                  {addedCount > 0 && <i className='text-[10px] font-next font-bold bg-black text-white px-[7px] py-[2px] rounded-full ml-2 absolute'>{addedCount}</i>}
                </button>
                <button onClick={onClickAddFav}>
                  <img src={isLiked ? heart_active : heart_img} alt="" onClick={handleClick} className='w-9 h-9' />
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