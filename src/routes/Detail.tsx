import { useState, useEffect } from 'react'
import { addItem } from '../redux/cart/slice'
import { GlobalLoader } from '../components/GlobalLoader'
import { useSelector, useDispatch } from 'react-redux'
import PlusSvg from '../svg/PlusSvg'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { selectCartItemById } from '../redux/cart/selectors'

const typeNames = ['тонкое', 'традиционное']

type PizzaItem = {
  id: string,
  image: string,
  foodName: string,
  description: string,
  price: number,
  count: number,
}

export default function Detail() {
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItem = useSelector(selectCartItemById(params.id as string))
  const addedCount = cartItem ? cartItem.count : 0

  const [activeType, setactiveType] = useState(0)
  const [activeSize, setActiveSize] = useState(0)
  const [loading, setLoading] = useState(true)
  const [pizza, setPizza] = useState<PizzaItem>({
    "id": '0',
    "image": '',
    "foodName": '',
    "description": '',
    "price": 0,
    "count": 0,
  })

  const onClickSize = (i: number) => setActiveSize(i)
  const onClickType = (i: number) => setactiveType(i)
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

  if (loading) return <GlobalLoader smalMode={false} />

  return (
    <div className='content'>
      <div className='container'>

        <div className='pizza-block-wrapper'>
          <div className='pizza-detail-block'>
            <div className='flex w-full justify-center'>
              <img
                className='w-full'
                src={pizza.image}
                alt='Food'
              />
            </div>
            <div className='pizza-detail-info'>
              <h4 className='font-term uppercase text-4xl pl-3'>{pizza.foodName}</h4>
              <div className='font-next text-l pl-3 uppercase font-bold text-white'>{pizza.description}</div>
              
              <div className='flex justify-between px-3 py-4 items-center'>
                <div className='font-term text-3xl'>{pizza.price}P</div>
                <button
                  onClick={onClickAdd}
                  className='border-2 border-[#ABABAB] px-0 py-[5px] w-[100px] rounded-md flex justify-center items-center'>
                  <PlusSvg />
                  <span>Добавить</span>
                  {addedCount > 0 && <i>{addedCount}</i>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}