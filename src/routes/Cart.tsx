import { Link } from 'react-router-dom'
import { InfoBox } from '../components/InfoBox'
import { CartItem } from '../components/CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { clearItems } from '../redux/cart/slice'
import { selectCart } from '../redux/cart/selectors'
import { HiPlusSm } from "react-icons/hi"
import { HiMinusSm } from "react-icons/hi"
import cutlery from '../assets/images/cutlery_2.svg'
import bus from '../assets/images/bus.svg'
import money from '../assets/images/money_hand.svg'
import comment from '../assets/images/list_items.svg'
import promo from '../assets/images/promocode.svg'
import arrow_back from '../assets/images/Arrow 5.svg'
import EmptyCart from './EmptyCart'

export default function Cart({ initialCount = 1}){
  const dispatch = useDispatch()
  const { totalCount, totalPrice, items } = useSelector(selectCart)

  const onClickPay = () => {
    if (window.confirm(`Вы заказали ${totalCount} пиц на сумму ${totalPrice} ₽`)) {
      const tg = Telegram.WebApp
      // console.log(tg.initDataUnsafe.chat?.id)
      tg.sendData(JSON.stringify(items))
      dispatch(clearItems())
    }
  }
  const [count, setCount] = useState(initialCount)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }
  const selectedOption = localStorage.getItem("selectedOption")
  return (
    <div className='content'>
      {items.length > 0 ? (
        <div className='container container--cart'>
          <div className='cart'>
            <div className="flex w-full  bg-red-600 px-3 py-3">
              <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
                <img src={arrow_back} alt="" className='h-5 absolute'/>
              </Link>
               <h1 className='text-white font-term text-2xl w-full text-center tracking-widest'>Мой заказ</h1>
            </div>
            <div className='content__items'>
              {items.map((item: any) =>
                <CartItem key={item.id} {...item} />)
              }
            </div>
            <div className='cart__bottom'>
              <div className='flex w-full justify-between px-2 py-2 bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                <span className='uppercase font-term text-2xl'> Итого: </span>
                <p className='uppercase font-term text-2xl'>{totalPrice} P</p>
              </div>
              <div className='bg-[#F1F1F1] px-2 py-2 border-b-[1px] border-[#A2A2A2]'>
                 <p className='text-[10px] font-roboto font-bold'>Призаказе от 2000р Батат фри с пармезаном всего за 120р Для получения скидки добавьте блюдо в заказ самостоятельно его можно найти в разделе Закуски</p>
              </div>
              <div className='flex justify-between px-2 py-2 items-center bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                 <div className='flex items-center gap-2'>
                    <img src={cutlery} alt="" />
                    <div className='flex flex-col gap-1'>
                       <h2 className='font-term text-xl leading-3'>ПРИБОРЫ</h2>
                       <p className='font-roboto text-[10]'>бесплатно</p>
                    </div>
                 </div>
                 <div className='flex gap-2'>
                   <button className='border-2 border-stone-800 rounded-full px-[2px] py-[2px]' onClick={handleDecrement}><HiMinusSm/></button>
                   <p className='font-bold font-roboto'>{count}</p>
                   <button className='border-2 border-stone-800 rounded-full px-[2px] py-[2px]' onClick={handleIncrement}><HiPlusSm /></button>
                 </div>
              </div>
              <div className='flex justify-between px-2 py-4 items-center bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                 <div className='flex items-center gap-4 ml-2'>
                    <img src={bus} alt="" />
                    <div className='flex flex-col gap-1'>
                       <h2 className='font-term text-xl leading-3'>{selectedOption || "ДОСТАВКА"}</h2>
                       <p className='font-roboto text-[8px] font-bold'>Адрес:  г.Южно-Сахалинск, улица Мира 231/9</p>
                    </div>
                 </div>
                 <Link to='/delivery' className='uppercase text-[#4D4D4D] border-2 rounded-[5px] border-[#4D4D4D] text-[8px] px-4 py-1 font-bold'>изменить</Link>
              </div>
              <div className='flex justify-between px-2 py-4 items-center bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                 <div className='flex items-center gap-4 ml-2'>
                    <img src={money} alt="" />
                    <div className='flex flex-col gap-1'>
                       <h2 className='font-term text-lg leading-3'>СПОСОБ ОПЛАТЫ</h2>
                       <p className='font-roboto text-[8px] font-bold text-red'>Выберите способ оплаты </p>
                    </div>
                 </div>
                 <Link to='/payment' className='uppercase text-[#4D4D4D] border-2 rounded-[5px] border-[#4D4D4D] text-[8px] px-4 py-1 font-bold'>изменить</Link>
              </div>
              <div className='flex justify-between px-2 py-4 items-center bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                 <div className='flex items-center gap-4 ml-2'>
                    <img src={comment} alt="" />
                    <div className='flex flex-col gap-1'>
                       <h2 className='font-term text-md leading-4'>комментарии к заказу</h2>
                    </div>
                 </div>
                 <Link to='/comment' className='uppercase text-[#4D4D4D] border-2 rounded-[5px] border-[#4D4D4D] text-[8px] px-4 py-1 font-bold'>Написать</Link>
              </div>
              <div className='flex justify-between px-2 py-4 items-center bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                 <div className='flex items-center gap-4 ml-2'>
                    <img src={promo} alt="" />
                    <div className='flex flex-col gap-1'>
                      <input type="text" placeholder='промокод' className='w-[40vw] border-2 border-[#4D4D4D] rounded-lg font-term pl-2'/>
                    </div>
                 </div>
                 <Link to='/promo' className='uppercase text-[#4D4D4D] border-2 rounded-[5px] border-[#4D4D4D] text-[8px] px-4 py-1 font-bold'>применить</Link>
              </div>
              <div className='flex justify-between'>
                <button onClick={onClickPay} className='fixed bottom-0 bg-blue-600 w-full left-0 py-5 rounded-t-2xl z-10'>
                  <span className='uppercase font-bold font-term text-white text-xl tracking-widest'>Оплатить сейчас</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )
        :
        <EmptyCart />
      }
    </div>
  )
}