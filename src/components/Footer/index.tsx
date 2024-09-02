import React from 'react'
import styles from './Footer.module.scss'
import wabisabi from '../../assets/images/wabisabi.svg'

export const Footer: React.FC = () => {
  return (
    <footer className='px-2 py-6 bg-[#5ABC70] rounded-b-[40px]'>
       <div className='flex flex-col items-center gap-3'>
          <img src={wabisabi} alt="" className='w-[28vw]'/>
          <p className='text-white text-[11.2px] font-bold text-center tracking-widest  font-roboto'>Сделано в WABISABI. Сервис приема заказов.</p>
          <p className='text-white text-[11.2px] font-bold text-center tracking-widest  font-roboto'>ИНН: 650115385034</p>
          <p className='text-white text-[11.2px] font-bold text-center tracking-widest  font-roboto'>ОГРН: 323650000016972</p>
          <p className='text-white text-[11.2px] font-bold text-center tracking-widest  font-roboto'>Тел: +79146414351</p>
          <p className='text-white text-[11.2px] font-bold text-center tracking-widest  font-roboto'>Эл. почта: Dydniklena@icloud.com</p>
       </div>
    </footer>
  )
}