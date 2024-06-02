// import { Link } from 'react-router-dom'
// import { FavoriteItem } from '../components/FavoriteItem'
// import arrow_back from '../assets/images/Arrow 5.svg'
// import EmptyFav from './EmptyFav'
// import { useEffect, useState } from 'react'
// import axios from 'axios'
// import qs from 'qs'
// export default function Favorites(){
//     const [items, setItems] = useState<any>([])
//     // useEffect(()=>{
//     // }, [items])
//     const params = qs.parse(window.location.search.substring(1))
//     axios.post(`https://backend.skyrodev.ru/user/setstate?nickname=${params.user}`)
//     axios.get(`https://backend.skyrodev.ru/user/${params.user}/fav`).then(e => setItems(e.data))
//     return (
//         <div className=''>
//         {items.length > 0 ? (
//           <div className='container container--cart'>
//             <div className='cart'>
//             <div className="flex w-full  bg-red-600 px-3 py-5">
//                 <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
//                     <img src={arrow_back} alt="" className='h-5 absolute' />
//                 </Link>
//                 <h1 className='text-white font-term text-2xl w-full text-center tracking-[6px] leading-5'>ИЗБРАННОЕ</h1>
//             </div>
//               <div className='content__items'>
//                 {items.map((item: any) =>
//                   <FavoriteItem key={item.id} {...item} />)
//                 }
//               </div>
//             </div>
//           </div>
//         )
//           :
//           <EmptyFav/>
          
//         }
        
//       </div>
//     )
// }
import { Link } from 'react-router-dom';
import { FavoriteItem } from '../components/FavoriteItem';
import arrow_back from '../assets/images/Arrow 5.svg'
import { createContext, useContext, useEffect, useState } from 'react';
import qs from 'qs';
import axios from 'axios';

export const FavoriteContext = createContext<{ items: any; setItems: (items: any) => void }>({items: [], setItems: () => {}})

export default function Favorites() {
  const  [items, setItems]  = useState([]);

  const params = qs.parse(window.location.search.substring(1));

  useEffect(() => {
    axios
      .get(`https://backend.skyrodev.ru/user/${params.user}/fav`)
      .then((e) => setItems(e.data))
      .catch((error) => console.error('Error fetching favorites:', error));
  }, [])
  return (
    <FavoriteContext.Provider value={{ items, setItems }}>
      <div className="">
      {items.length > 0 ? (
        <div className="container container--cart">
          <div className="cart">
            <div className="flex w-full bg-red-600 px-3 py-5">
              <Link
                to="/"
                className="font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto"
              >
                <img src={arrow_back} alt="" className="h-5 absolute" />
              </Link>
              <h1 className="text-white font-term text-2xl w-full text-center tracking-[6px] leading-5">
                ИЗБРАННОЕ
              </h1>
            </div>
            <div className="content__items">
              {items.map((item: any) => (
                <FavoriteItem key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg font-medium">Избранное пусто</p>
          <Link to="/" className="text-blue-500 underline mt-4">
            Вернуться на главную
          </Link>
        </div>
      )}
    </div>
    </FavoriteContext.Provider>
  );

}

