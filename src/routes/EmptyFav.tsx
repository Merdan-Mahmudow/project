import { Link } from 'react-router-dom'
import arrow_back from '../assets/images/Arrow 5.svg'
export default function EmptyFav(){

  return (
    <>
      <div className="flex w-full  bg-red-600 px-3 py-5">
        <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
          <img src={arrow_back} alt="" className='h-5 absolute' />
        </Link>
        <h1 className='text-white font-term text-2xl w-full text-center tracking-[6px] leading-5'>ИЗБРАННОЕ</h1>
      </div>
      <div className='h-[60vh] bg-white flex flex-col justify-center items-center gap-9'>
        <h1 className="text-[40px] font-term text-center leading-8 tracking-widest relative top-[50px]">ИЗБРАННЫХ
          НЕТ</h1>
        <p className="font-next text-center leading-5 tracking-widest font-[100] text-sm relative top-[70px]">Добавьте что-то В ИЗБРАННОЕ чтобы ТУТ ЧТО-ТО ПОЯВИЛОСЬ</p>
        <Link to='/' className="bg-red-600 text-white px-7 py-2 rounded-md uppercase font-next font-bold">На Главную</Link>
      </div>
    </>
  )
}