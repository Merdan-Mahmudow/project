import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { selectCart } from '../../redux/cart/selectors'
import LogoPizzaSvg from '../../assets/images/logo.svg'
import HeartButton from '../../assets/images/heart.svg'
import Kimchistop from '../../assets/images/Frame 427321805.svg'
export const Header: React.FC = () => {
  const { pathname } = useLocation()
  const { items, totalPrice} = useSelector(selectCart)
  const isMounted = useRef(false)

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)
      localStorage.setItem('cart', json)
    }
    isMounted.current = true
  }, [items])

  return (
    <header className='p-3 bg-white rounded-t-[40px]'>
      <div className='flex justify-around'>
        {/* <Link to={'/'} > */}
          <div className='flex justify-between gap-10'>
            <img  src={LogoPizzaSvg} alt="" />
            <div>
              <img src={Kimchistop} alt="" />
            </div>
            <Link to={'/favorites'}>
              <img className='w-15 relative left-2' src={HeartButton} alt="" />
            </Link>
            
          </div>
        {/* </Link> */}
        
      </div>
      {pathname !== 'cart' &&
          (<div className='fixed bottom-0 bg-blue-600 w-full left-0 py-5 rounded-t-2xl z-10'>
            <Link to={'cart'} className='flex items-center justify-center text-white uppercase font-next'>В корзине
              <button className='pl-5'>
                <span className=' text-white'>{totalPrice} ₽</span>
                <div className=''></div>
              </button>
            </Link>
          </div>)
        }
    </header>
  )
}