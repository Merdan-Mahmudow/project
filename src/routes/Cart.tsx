import { Link, redirect } from 'react-router-dom'
import { CartItem } from '../components/CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { useContext, useState } from 'react'
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
import axios from 'axios'
import qs from 'qs'
import React from 'react'
import { GlobalContext } from './router'
import cutlery_2 from '../assets/images/cutlery.svg'
import ukassa from '../assets/images/ukassa.svg'
import sbp from '../assets/images/sbp.svg'
import cash from '../assets/images/cash.svg'

export default function Cart({ initialCount = 1 }) {
  const dispatch = useDispatch()
  const { totalCount, totalPrice, items } = useSelector(selectCart)
  const [userID, setUserID] = React.useState<number>()
  const params = useContext(GlobalContext)
  const onClickPay = () => {
    let user: any = ""


    if (window.confirm(`Вы заказали ${totalCount} пиц на сумму ${totalPrice} ₽`)) {
      const tg = Telegram.WebApp
      const year: any = new Date().getFullYear()
      const month: any = new Date().getMonth() + 1
      const day: any = new Date().getDate()
      console.log(params)
      let sendData: any = {
        "number": Math.floor(Math.random() * 100000),
        "items": items,
        "total": totalPrice,
        "date": `${day}.${month}.${year}`,
        "address": "г. Южно-Сахалинск, ул. Мира 231/9",
        "state": "Отправлен",
        "isDelivery": true ? selectedOption === "ДОСТАВКА" : false,
        "payment": selectedOptionPay,
        "comment": localStorage.getItem("orderComment"),
        "cutlery": localStorage.getItem("spoonCount"),
        "client": 10
      }
      //axios.get(`https://backend.skyrodev.ru/user/${params.user}`).then(e => e.data.id)



      localStorage.setItem('comments', "[]")
      console.log(sendData)
      axios.post(`https://backend.skyrodev.ru/order/?chatID=${params.chatID}`, sendData).then(e => {
        dispatch(clearItems())
        window.location.href = `https://backend.skyrodev.ru/payments/?amount=${totalPrice}&currency=RUB&description=Оплата заказа №${sendData.number}`

      })
      
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
  const saveToLocalStorage = () => {
    localStorage.setItem('spoonCount', count.toString())
  }

  const loadFromLocalStorage = () => {
    const storedCount = localStorage.getItem('spoonCount')
    if (storedCount) {
      setCount(parseInt(storedCount))
    }
  }
  React.useEffect(() => {
    loadFromLocalStorage()
  }, [])

  React.useEffect(() => {
    saveToLocalStorage()
    axios.get(`https://backend.skyrodev.ru/user/${params.user}`).then(e => setUserID(e.data.id))
  }, [count])
  const selectedOption = localStorage.getItem("selectedOption")
  const selectedOptionPay = localStorage.getItem("selectedOptionPay")
  // let img = ""
  // if(selectedOption === "ДОСТАВКА"){
  //   img = "../assets/images/bus.svg"
  // } else{
  //   img = '../assets/images/cutlery_2.svg'
  // }
  return (
    <div className='content'>
      {items.length > 0 ? (
        <div className='container container--cart'>
          <div className='cart'>
            <div className="flex w-full  bg-red-600 px-3 py-3">
              <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
                <img src={arrow_back} alt="" className='h-5 absolute' />
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
                  <button className='border-2 border-stone-800 rounded-full px-[2px] py-[2px]' onClick={handleDecrement}><HiMinusSm /></button>
                  <p className='font-bold font-roboto'>{count}</p>
                  <button className='border-2 border-stone-800 rounded-full px-[2px] py-[2px]' onClick={handleIncrement}><HiPlusSm /></button>
                </div>
              </div>
              <div className='flex justify-between px-2 py-4 items-center bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                <div className='flex items-center gap-4 ml-2'>
                  <img src={selectedOption === "ДОСТАВКА" ? bus : cutlery_2} alt="" />
                  <div className='flex flex-col gap-1'>
                    <h2 className='font-term text-xl leading-3'>{selectedOption || "ДОСТАВКА"}</h2>
                    <p className='font-roboto text-[8px] font-bold'>Адрес:  г.Южно-Сахалинск, улица Мира 231/9</p>
                  </div>
                </div>
                <Link to='/delivery' className='uppercase text-[#4D4D4D] border-2 rounded-[5px] border-[#4D4D4D] text-[8px] px-4 py-1 font-bold'>изменить</Link>
              </div>
              <div className='flex justify-between px-2 py-4 items-center bg-[#F1F1F1] border-b-[1px] border-[#A2A2A2]'>
                <div className='flex items-center gap-4 ml-2'>
                  <img src={selectedOptionPay === "ЮКАССА" ? ukassa : selectedOptionPay === "СБП" ? sbp : cash } alt="" />
                  <div className='flex flex-col gap-1'>
                    <h2 className='font-term text-lg leading-3'>СПОСОБ ОПЛАТЫ</h2>
                    <p className='font-roboto text-[8px] font-bold text-red'>{selectedOptionPay || "КАРТА"}</p>
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
                    <input type="text" placeholder='промокод' className='w-[40vw] border-2 border-[#4D4D4D] rounded-lg font-term pl-2' />
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