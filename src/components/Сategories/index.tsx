import React from 'react'
import '../../scss/components/_categories.scss'

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
    <div className='overflow-x-scroll bg-red-600 px-4 py-4'>
      <ul className='w-[500px] relative flex h-full'>
        {categoriesList.map((obj) => (
          <li
            key={obj.id}
            onClick={() => onChangeCategory(obj)}
            className={
              value.id === obj.id ?
                'active px-5 py-2 rounded-[30px] w-fill font-next tracking-[3px] text-white font-bold uppercase min-w-fit hover:cursor-pointer text-[15px]':
                'bg-transparent px-5 py-2 w-fill rounded-[30px] tracking-[3px] text-white font-next font-bold uppercase min-w-fit hover:cursor-pointer text-[15px]'
            }>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  )
})