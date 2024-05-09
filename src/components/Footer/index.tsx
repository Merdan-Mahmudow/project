import React from 'react'
import styles from './Footer.module.scss'
import wabisabi from '../../assets/images/wabisabi.svg'

export const Footer: React.FC = () => {
  return (
    <footer className='px-2 pt-3 pb-4 bg-green-600 rounded-b-[40px]'>
       <div className='flex flex-col items-center gap-1'>
          <img src={wabisabi} alt="" className=''/>
          <p className='text-white text-[8px] font-bold text-center'>Сделано в WABISABI. Сервис приема заказов.</p>
       </div>
    </footer>
  )
}