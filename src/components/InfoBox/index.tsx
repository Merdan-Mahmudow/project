import React from 'react'
import { Link } from 'react-router-dom'
import EmptyCart from '../../svg/EmptyCart'

type InfoBoxProps = {
  title: string,
  description: string,
  buttonTitle: string,
  icon?: string,
  img?: string,
  alt: string,
}

export const InfoBox: React.FC<InfoBoxProps> = (
  {
    title = 'Корзина пустая',
    description = 'Вероятней всего, вы не заказывали ещё пиццу.Для того, чтобы заказать пиццу, перейди на главную страницу.',
    buttonTitle = 'Вернуться назад',
    icon = '',
    img = '',
    alt = 'Empty cart'
  }
) => {

  return (
    <div className='content'>
      <div className='container container--cart'>
        <div className='cart cart--empty'>
          <h2>{title}</h2>
          <p>{description}</p>
          {icon ?
            <p className='cart--icon'>{icon}</p> :
            img ? <img src={img} alt={alt} /> :
              <EmptyCart />
          }
          <Link to={`/`}>
            <button className='button button--black'>
              <span>{buttonTitle}</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}