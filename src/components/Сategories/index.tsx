import React from 'react'

type CategoryItem = {
  id: number
  name: string
}

export const categoriesList: CategoryItem[] = [
  { id: 0, name: 'Все' },
  { id: 1, name: 'Мясные' },
  { id: 2, name: 'Вегетарианские' },
  { id: 3, name: 'Гриль' },
  { id: 4, name: 'Острые' },
  { id: 5, name: 'Закрытые' },
]

type СategoriesProps = {
  value: CategoryItem
  onChangeCategory: (idx: CategoryItem) => void
}

export const Сategories: React.FC<СategoriesProps> = React.memo(({
  value,
  onChangeCategory
}) => {

  return (
    <div className='categories'>
      <ul>
        {categoriesList.map((obj) => (
          <li
            key={obj.id}
            onClick={() => onChangeCategory(obj)}
            className={
              value.id === obj.id ?
                'active' :
                ''
            }>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  )
})