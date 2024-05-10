import React from "react"
import cutlery_2 from '../assets/images/cutlery.svg'
import bus_2 from '../assets/images/bus.svg'
export default function Delivery() {
    return (
        <div className="w-full h-[80vh] bg-[#F1F1F1] pt-2 px-3 flex flex-col gap-2">
            <div className="flex border-2 border-[#9C9C9C] justify-between px-2 py-2 items-center rounded-lg">
                <div className="flex gap-2 items-center">
                      <img src={cutlery_2} alt="" className="w-7 h-7" />
                      <div className="flex flex-col w-[50vw]">
                          <h2 className="text-1xl font-term leading-[17px]">на вынос</h2>
                          <p className="leading-3 text-[6px]"><span className="font-bold">Навынос :</span> г.Южно-Сахалинск, улица Мира 231/9</p>
                          <p className="leading-3 text-[6px]"><span className="font-bold">Принимаем заказы :</span> ежедневно с 10:00 до 21:30</p>
                      </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer"/>
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        </div>
                </label>
            </div>
            <div className="flex border-2 border-[#9C9C9C] justify-between px-2 py-2 items-center rounded-lg">
                <div className="flex gap-2 items-center">
                      <img src={bus_2} alt="" className="w-7 h-7" />
                      <div className="flex flex-col w-[45vw]">
                          <h2 className="text-1xl font-term leading-[17px]">Доставка</h2>
                          <p className="leading-3 text-[6px]"><span className="font-bold">Навынос :</span> г.Южно-Сахалинск, улица Мира 231/9</p>
                          <p className="leading-3 text-[6px]"><span className="font-bold">Принимаем заказы :</span> ежедневно с 10:00 до 21:30</p>
                      </div>
                </div>
                <button className="text-white bg-stone-400 text-[4px] w-[15vw] py-[5px] mr-3 rounded-[5px]">ДОБАВИТЬ АДРЕС</button>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer"/>
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        </div>
                </label>
            </div>
            <div className="w-full flex justify-end">
                <button className="bg-stone-400 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]">ВЫБРАТЬ</button>
            </div>
        </div>
    )
}