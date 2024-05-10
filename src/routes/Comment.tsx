import React from "react";

export default function Comment(){
    return (
       <div className="h-[80vh] bg-[#F1F1F1] pt-3 px-3 flex flex-col gap-2">
            <div className="w-full flex justify-center">
                <textarea name="text" id="text" placeholder="Ваш комментарий к заказу ..." rows={4} cols={40} className="px-2 border-2 border-[#9F9F9F] rounded-[20px] font-roboto font-bold py-2 bg-[#F1F1F1]"></textarea>
            </div>
            <div className="w-full flex justify-end">
                <button className="bg-stone-400 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]">ОТПРАВИТЬ</button>
            </div>
       </div>
    )
}