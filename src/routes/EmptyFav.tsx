import { Link } from 'react-router-dom'

export default function EmptyFav(){

  return (
    <div className='h-[60vh] bg-white flex flex-col justify-center items-center gap-9'>
         <h1 className="text-[45px] font-term text-center leading-8 tracking-widest">ИЗБРАННЫХ
НЕТ</h1>
         <p className="font-next text-center leading-5 tracking-widest font-[100] text-[13px]">Добавьте что-то В ИЗБРАННОЕ чтобы ТУТ ЧТО-ТО ПОЯВИЛОСЬ</p>
<Link to='/' className="bg-red-600 text-white px-7 py-2 rounded-md uppercase font-next font-bold">На Главную</Link>
    </div>
  )
}