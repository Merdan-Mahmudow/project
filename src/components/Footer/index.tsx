import React from 'react'
import styles from './Footer.module.scss'
import wabisabi from '../../assets/images/wabisabi.svg'

export const Footer: React.FC = () => {
  return (
    <footer className='px-2 py-6 bg-[#5ABC70] rounded-b-[40px]'>
       <div className='flex flex-col items-center gap-3'>
          <img src={wabisabi} alt="" className='w-[28vw]'/>
          <p className='text-white text-[11.2px] font-bold text-center tracking-widest  font-roboto'>Сделано в WABISABI. Сервис приема заказов.</p>
       </div>
    </footer>
  )
}