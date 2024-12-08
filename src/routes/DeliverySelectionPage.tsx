import React from "react"
import cutlery_2 from '../assets/images/cutlery.svg'
import bus_2 from '../assets/images/bus.svg'
import { Link } from 'react-router-dom'
import { useState } from "react"
import arrow_back from '../assets/images/Arrow 5.svg'
import pencil from '../assets/images/Pencil.svg'
const DeliverySelectionPage = () => {


    const [selectedOption, setSelectedOption] = useState<string>("")
    
    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedOption(event.target.value)
      localStorage.setItem("selectedOption", event.target.value)
    }
    return (
        <div className="w-full h-[70vh] bg-[#F1F1F1] pt-0 px-0 flex flex-col gap-2">
            <div className="flex w-full  bg-red-600 px-3 py-5">
                <Link to={`/cart`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
                    <img src={arrow_back} alt="" className='h-5 absolute' />
                </Link>
                <h1 className='text-white font-term text-2xl w-full text-center tracking-[6px] leading-5'>ДОСТАВКА</h1>
            </div>
            <div className="px-5 flex flex-col gap-2">
                <div className="flex border-2 border-[#9C9C9C] justify-between px-3 py-3 items-center rounded-lg">
                    <div className="flex gap-2 items-center">
                        <img src={cutlery_2} alt="" className="w-12 h-12" />
                        <div className="flex flex-col w-[50vw] gap-1">
                            <h2 className="text-2xl font-term leading-[17px] relative bottom-2">на вынос</h2>
                            <p className="leading-3 text-[12px] relative top-1"> г.Южно-Сахалинск, улица Мира 231/9</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="radio"
                            value="НА ВЫНОС"
                            checked={selectedOption === 'НА ВЫНОС'}
                            onChange={handleOptionChange}
                        />
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        </div>
                    </label>
                </div>
                <div className="flex border-2 border-[#9C9C9C] justify-between px-3 py-3 items-center rounded-lg">
                    <div className="flex gap-2 items-center">
                        <img src={bus_2} alt="" className="w-12 h-12" />
                        <div className="flex flex-col w-[45vw] gap-3">
                            <h2 className="text-2xl font-term leading-[17px] relative top-1">ДОСТАВКА</h2>
                            <p className="leading-5 text-[7px] mt-1 relative"><span className={selectedOption === 'ДОСТАВКА' ? 'font-bold text-red-600': 'text-[#F1F1F1]'}>ПОКА НЕ ДОСТУПНО В ВАШЕМ РЕГИОНЕ</span></p>
                        </div>
                    </div>
                    <img src={pencil} className="text-white text-[4px] w-[7vw] mr-3 rounded-[5px]" alt="" />
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="radio"
                            value="ДОСТАВКА"
                            checked={selectedOption === 'ДОСТАВКА'}
                            onChange={handleOptionChange}
                        />
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        {/* peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-12 h-12  shadow-md peer-checked:bg-rose-400  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-10 after:w-10 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✖️'] after:-rotate-180 peer-checked:after:rotate-0 */}
                        </div>
                    </label>
                </div>
                <div className="w-full flex justify-end mt-2">
                    <button className={selectedOption === '' ? 'bg-stone-400 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]': 'bg-red-600 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]'} disabled={selectedOption === ''}>
                        <Link to='/cart'>ВЫБРАТЬ</Link>
                        </button>
                </div>
            </div>
        </div>
    )
}

export default DeliverySelectionPage