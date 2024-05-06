import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { selectCart } from '../../redux/cart/selectors'
import CartSvg from '../../svg/CartSvg'
import LogoPizzaSvg from '../../svg/LogoPizzaSvg'

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
    <header className='header'>
      <div className='container'>
        <Link to={'/'}>
          <div className='header__logo'>
            <LogoPizzaSvg width={38} />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        {pathname !== '/cart' &&
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
        }
      </div>
    </header>
  )
}