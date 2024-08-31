import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from 'react-router-dom'
import arrow_back from '../assets/images/Arrow 5.svg'
import comment from '../assets/images/ч.svg'
import { useDispatch } from "react-redux";
import $ from 'jquery'
import { commentState } from "../redux/comment/slice";
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
    const [text, setText] = useState('');
    const dispatch = useDispatch()
    const textArea = useRef(null)
    
    const buttonStyle = {
      backgroundColor: text.length === 0 ? '#BCBCBC' : '#FF3131',
      color: 'white',
      padding: '10px 30px',
      border: 'none',
      borderRadius: '5px',
      cursor: text.length === 0 ? 'not-allowed' : 'pointer',
    }
    const handleTextChange: React.ComponentProps<"textarea">["onChange"] = (event) => {
        setText(event?.target.value)
      }
      useEffect(() => {
        console.log(text)
        dispatch(commentState(text))
      }, [text])
    
      function handleCommentSubmit(): any  {
        localStorage.setItem('orderComment', comment)        
      }
    return (
       <div className="h-[80vh] bg-[#F1F1F1] pt-0 px-0 flex flex-col gap-2">
          <div className="flex w-full  bg-red-600 px-3 py-3">
            <Link to={`/cart`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
              <img src={arrow_back} alt="" className='h-5 absolute' />
            </Link>
            <h1 className='text-white font-term text-xl w-full text-center tracking-[6px] leading-5'>КОММЕНТАРИЙ <br></br>К ЗАКАЗУ</h1>
          </div>
            <div className="px-4 py-2">
                  <div className="w-full flex justify-center">
                      <textarea name="text" id="text" placeholder="Ваш комментарий к заказу ..." className="px-5 border-2 border-[#9F9F9F] rounded-[20px] font-roboto font-bold py-2 bg-[#F1F1F1] text-lg" value={text} onChange={handleTextChange} rows={4} cols={40}/>
                  </div>
                  <div className="w-full flex justify-end mt-4">
                      <button className="bg-[#BCBCBC] px- 10py-2 rounded-[8px] text-white font-roboto font-bold text-[12px]" onClick={handleCommentSubmit} disabled={text.length === 0} style={buttonStyle}>
                        <Link to='/cart'>
                          ОТПРАВИТЬ
                      </Link>
                      </button>
                  </div>
            </div>
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
