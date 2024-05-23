import React from "react";
import { Link } from 'react-router-dom'
import BackArrowSvg from '../svg/BackArrowSvg'
import arrow_back from '../assets/images/Arrow 5.svg'
export default function Payment(){
    return (
       <div className="h-[80vh] bg-[#F1F1F1] flex flex-col gap-2">
            <div className="flex w-full  bg-red-600 px-3 py-3">
                <Link to={`/cart`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
                    <img src={arrow_back} alt="" className='h-5 absolute' />
                </Link>
                <h1 className='text-white font-term text-xl w-full text-center tracking-[6px] leading-5'>ВЫБЕРИТЕ <br></br>СПОСОБ ОПЛАТЫ</h1>
            </div>
            <div className="w-full flex justify-center flex-col gap-5 px-5 py-5">
                <button className="w-full border-[1px] border-[#9C9C9C] py-3 rounded-[15px]">Юкасса</button>
                <button className="w-full border-[1px] border-[#9C9C9C] py-3 rounded-[15px]">Юкасса</button>
                <button className="w-full border-[1px] border-[#9C9C9C] py-3 rounded-[15px]">Юкасса</button>
            </div>
       </div>
    )
}