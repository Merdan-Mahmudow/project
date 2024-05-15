import React from "react";
import { Link } from 'react-router-dom'
import BackArrowSvg from '../svg/BackArrowSvg'

export default function Payment(){
    return (
       <div className="h-[80vh] bg-[#F1F1F1] pt-3 px-3 flex flex-col gap-2">
            <div className="w-full flex justify-center flex-col gap-5">
                <button className="w-full border-[1px] border-[#9C9C9C] py-2 rounded-[15px]">Юкасса</button>
                <button className="w-full border-[1px] border-[#9C9C9C] py-2 rounded-[15px]">Юкасса</button>
                <button className="w-full border-[1px] border-[#9C9C9C] py-2 rounded-[15px]">Юкасса</button>
            </div>
            <Link to={`/cart`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 bg-green-500 w-auto'>
                  <BackArrowSvg /><span className='text-sm'>Вернуться назад</span>
            </Link>
       </div>
    )
}