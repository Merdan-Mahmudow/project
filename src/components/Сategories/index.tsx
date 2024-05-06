import React from 'react'

type CategoryItem = {
  id: number
  name: string
}

export const categoriesList: CategoryItem[] = [
  { id: 0, name: 'Популярное' },
  { id: 1, name: 'Не острое' },
  { id: 2, name: 'Острое' },
  { id: 3, name: 'Десерты' },
  { id: 4, name: 'Напитки' },
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