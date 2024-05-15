import React from "react"
import cutlery_2 from '../assets/images/cutlery.svg'
import bus_2 from '../assets/images/bus.svg'
import { Link } from 'react-router-dom'
import BackArrowSvg from '../svg/BackArrowSvg'
import { useState } from "react"
import { deliveryOptions } from "./Delivery_Type"
import { DeliveryType } from "./Delivery_Type"

// interface Props {
//     onSelect: (deliveryWay: DeliveryType[]) => void;
// }
const DeliverySelectionPage = (onSelect: any) => {
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(event.target.value);
    };

    const [selectedDeliveryType, setSelectedDeliveryType] = useState<DeliveryType | null>(null);

    const handleCheckboxChange = (deliveryWay: DeliveryType) => {
        setSelectedDeliveryType(deliveryWay);
        onSelect(deliveryWay);
    };

    const buttonStyle = {
        backgroundColor: selectedOption === '' ? 'gray' : 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: selectedOption === '' ? 'not-allowed' : 'pointer',
    };
    return (
        <div className="w-full h-[80vh] bg-[#F1F1F1] pt-2 px-3 flex flex-col gap-2">
            {/* //     <div className="flex border-2 border-[#9C9C9C] justify-between px-2 py-2 items-center rounded-lg">
        //         <div className="flex gap-2 items-center">
        //               <img src={cutlery_2} alt="" className="w-7 h-7" />
        //               <div className="flex flex-col w-[50vw]">
        //                   <h2 className="text-1xl font-term leading-[17px]">на вынос</h2>
        //                   <p className="leading-3 text-[6px]"><span className="font-bold">Навынос :</span> г.Южно-Сахалинск, улица Мира 231/9</p>
        //                   <p className="leading-3 text-[6px]"><span className="font-bold">Принимаем заказы :</span> ежедневно с 10:00 до 21:30</p>
        //               </div>
        //         </div>
        //         <label className="relative inline-flex items-center cursor-pointer">
        //             <input
        //                 className="sr-only peer"
        //                 type="radio"
        //                 value="option1"
                        // checked={selectedOption === 'option1'}
                        // onChange={handleOptionChange}
        //                 checked={selectedDeliveryType === option.type}
        //                 onChange={() => handleCheckboxChange(option.type)}
        //             />
        //             <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
        //             </div>
        //         </label>
        //     </div> */}
            {deliveryOptions.map((option) => (
                <div className="flex border-2 border-[#9C9C9C] justify-between px-2 py-2 items-center rounded-lg" key={option.id}>
                    <div className="flex gap-2 items-center">
                        <img src={bus_2} alt="" className="w-7 h-7" />
                        <div className="flex flex-col w-[45vw]">
                            <h2 className="text-1xl font-term leading-[17px]">{option.name}</h2>
                            <p className="leading-3 text-[6px]"><span className="font-bold">Навынос :</span> г.Южно-Сахалинск, улица Мира 231/9</p>
                            <p className="leading-3 text-[6px]"><span className="font-bold">Принимаем заказы :</span> ежедневно с 10:00 до 21:30</p>
                        </div>
                    </div>
                    <button className="text-white bg-stone-400 text-[4px] w-[15vw] py-[5px] mr-3 rounded-[5px]">ДОБАВИТЬ АДРЕС</button>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            className="sr-only peer"
                            type="radio"
                            value="option2"
                            checked={selectedDeliveryType === option.type}
                            onChange={() => handleCheckboxChange(option.type)}
                        //  checked={selectedOption === 'option2'}
                        //  onChange={handleOptionChange}
                        />
                        <div className="peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-500 w-10 h-10  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️'] after:rounded-full after:absolute after:outline-none after:h-8 after:w-8 after:bg-gray-50 after:top-1 after:left-1 after:flex after:justify-center after:items-center  peer-hover:after:scale-75 peer-checked:after:content-['✔️'] after:-rotate-180 peer-checked:after:rotate-0">
                        </div>
                    </label>
                </div>
            ))}
            <div className="w-full flex justify-end">
                <button className="bg-stone-400 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]" style={buttonStyle} disabled={selectedOption === ''}>ВЫБРАТЬ</button>
            </div>
            <Link to={`/cart`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 bg-green-500 w-auto'>
                <BackArrowSvg /><span className='text-sm'>Вернуться назад</span>
            </Link>
        </div>
    )
}

export default DeliverySelectionPage;