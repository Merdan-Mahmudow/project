import { Link } from 'react-router-dom'
import arrow_back from '../assets/images/Arrow 5.svg'
import ukassa from '../assets/images/ukassa.svg'
import sbp from '../assets/images/sbp.svg'
import cash from '../assets/images/cash.svg'
import { useState } from 'react'

export default function Payment(){
    const [selectedOptionPay, setSelectedOptionPay] = useState<string>("")

    const handleOptionChangePay = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOptionPay(event.target.value)
      localStorage.setItem("selectedOptionPay", event.target.value)
    }
    return (
       <div className="h-[70vh] bg-[#F1F1F1] flex flex-col gap-2">
            <div className="flex w-full  bg-red-600 px-3 py-3">
                <Link to={`/cart`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
                    <img src={arrow_back} alt="" className='h-5 absolute' />
                </Link>
                <h1 className='text-white font-term text-lg w-full text-center tracking-[6px] leading-5'>ВЫБЕРИТЕ <br></br>СПОСОБ ОПЛАТЫ</h1>
            </div>
            <div className="w-full flex justify-center flex-col gap-5 px-3 py-5">
            <div className="flex border-2 border-[#9C9C9C] justify-between px-3 py-1 items-center rounded-[30px]">
                    <div className="flex gap-2 items-center">
                        <img src={ukassa} alt="" className="w-12 h-12" />
                        <div className="flex flex-col w-[50vw] gap-1">
                            <h2 className="text-2xl font-term leading-[17px] relative">ЮКАССА</h2>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="radio"
                            value="ЮКАССА"
                            checked={selectedOptionPay === 'ЮКАССА'}
                            onChange={handleOptionChangePay}
                        />
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        </div>
                    </label>
                </div>
                <div className="flex border-2 border-[#9C9C9C] justify-between px-3 py-1 items-center rounded-[30px]">
                    <div className="flex gap-2 items-center">
                        <img src={sbp} alt="" className="w-12 h-12" />
                        <div className="flex flex-col w-[45vw] gap-3">
                            <h2 className="text-2xl font-term leading-[17px] relative">СБП</h2>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="radio"
                            value="СБП"
                            checked={selectedOptionPay === 'СБП'}
                            onChange={handleOptionChangePay}
                        />
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        {/* peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-rose-400  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✖️'] after:-rotate-180 peer-checked:after:rotate-0 */}
                        </div>
                    </label>
                </div>
                <div className="flex border-2 border-[#9C9C9C] justify-between px-3 py-1 items-center rounded-[30px]">
                    <div className="flex gap-2 items-center">
                        <img src={cash} alt="" className="w-12 h-12" />
                        <div className="flex flex-col w-[45vw] gap-3">
                            <h2 className="text-xl font-term leading-[17px] relative">ОПЛАта карта</h2>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="radio"
                            value="КАРТА"
                            checked={selectedOptionPay === 'КАРТА'}
                            onChange={handleOptionChangePay}
                        />
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        {/* peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-rose-400  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✖️'] after:-rotate-180 peer-checked:after:rotate-0 */}
                        </div>
                    </label>
                </div>
                <div className="w-full flex justify-end mt-2">
                    <button className={selectedOptionPay === '' ? 'bg-stone-400 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]': 'bg-red-600 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]'} disabled={selectedOptionPay === ''}>
                        <Link to='/cart'>ВЫБРАТЬ</Link>
                        </button>
                </div>
            </div>
       </div>
    )
}