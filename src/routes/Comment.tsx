import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import BackArrowSvg from '../svg/BackArrowSvg'
import comment from '../assets/images/list_items.svg'

interface ButtonProps {
    disabled: boolean;
    style: React.CSSProperties;
    children: 'Send';
  }
//   bg-stone-400 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]
const Button: React.FC<ButtonProps> = ({ disabled, style, children }) => {
    return (
      <button disabled={disabled} style={style}>
        {children}
      </button>
    );
  };
 
export default function Comment(){
    const [text, setText] = useState<string>('');
    
    const buttonStyle = {
      backgroundColor: text.length === 0 ? 'gray' : 'blue',
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: text.length === 0 ? 'not-allowed' : 'pointer',
    }
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
        console.log(text)
      }
    return (
       <div className="h-[80vh] bg-[#F1F1F1] pt-3 px-3 flex flex-col gap-2">
            <div className="w-full flex justify-center">
                <textarea name="text" id="text" placeholder="Ваш комментарий к заказу ..." className="px-2 border-2 border-[#9F9F9F] rounded-[20px] font-roboto font-bold py-2 bg-[#F1F1F1]" onChange={handleTextChange} rows={5} cols={40}/>
            </div>
            <div className="w-full flex justify-end">
                <button className="bg-stone-400 px-8 py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]" disabled={text.length === 0} style={buttonStyle}>ОТПРАВИТЬ</button>
            </div>
            <Link to={`/cart`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 bg-green-500 w-auto'>
                  <BackArrowSvg /><span className='text-sm'>Вернуться назад</span>
            </Link>
       </div>
    )
}

function CartComment(){
  return(
    <div className='flex justify-between px-2 py-4 items-center bg-[#F1F1F1] border-b-2 border-stone-800'>
             <div className='flex items-center gap-4 ml-2'>
                <img src={comment} alt="" />
                <div className='flex flex-col gap-1'>
                   <h2 className='font-term text-md leading-4'>комментарии к заказу</h2>
                   <p></p>
                </div>
             </div>
             <Link to='/comment' className='uppercase text-[#4D4D4D] border-2 rounded-[5px] border-[#4D4D4D] text-[8px] px-4 py-1 font-bold'>Написать</Link>
          </div>
  )
}
