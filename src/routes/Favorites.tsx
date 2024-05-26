import { Link } from 'react-router-dom'
import { FavoriteItem } from '../components/FavoriteItem'
import { useSelector} from 'react-redux'
import { selectFav } from '../redux/favorite/selectorsFav'
import arrow_back from '../assets/images/Arrow 5.svg'
import EmptyFav from './EmptyFav'
export default function Favorites(){
    const { items } = useSelector(selectFav)
    return (
        <div className=''>
        {items.length > 0 ? (
          <div className='container container--cart'>
            <div className='cart'>
            <div className="flex w-full  bg-red-600 px-3 py-5">
                <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
                    <img src={arrow_back} alt="" className='h-5 absolute' />
                </Link>
                <h1 className='text-white font-term text-2xl w-full text-center tracking-[6px] leading-5'>ИЗБРАННОЕ</h1>
            </div>
              <div className='content__items'>
                {items.map((item: any) =>
                  <FavoriteItem key={item.id} {...item} />)
                }
              </div>
            </div>
          </div>
        )
          :
          <EmptyFav/>
          
        }
        
      </div>
    )
}