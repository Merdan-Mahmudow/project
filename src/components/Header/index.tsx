import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { selectCart } from '../../redux/cart/selectors'
import CartSvg from '../../svg/CartSvg'
import LogoPizzaSvg from '../../assets/images/logo.svg'
import HeartButton from '../../assets/images/heart.svg'
import Kimchistop from '../../assets/images/kimchistop.svg'

export const Header: React.FC = () => {
  const { pathname } = useLocation()
  const { items, totalPrice, totalCount } = useSelector(selectCart)
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
        <Link to={'/'} >
          <div className='flex justify-between gap-5'>
            <img  src={LogoPizzaSvg} alt="" />
            <div>
              {/* <h1 className='text-2xl uppercase font-bold font-next'>KIMCHI<span className='text-red'>STOP</span></h1> */}
              <img src={Kimchistop} alt="" />
              <p className='text-center font-bold font-next text-sm uppercase'>самая вкусная еда</p>
            </div>
            <img className='w-[40px]' src={HeartButton} alt="" />
          </div>
        </Link>
        {/* {pathname !== '/cart' &&
          (<div className='header__cart'>
            <Link to={'cart'}>
              <button className='button button--cart'>
                <span className='totalPrice'>{totalPrice} ₽</span>
                <div className='button__delimiter'></div>
                <CartSvg />
                <span>{totalCount}</span>
              </button>
            </Link>
          </div>)
        } */}
      </div>
    </header>
  )
}