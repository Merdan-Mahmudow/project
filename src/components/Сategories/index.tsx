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
  { id: 1, name: 'Говядина' },
  { id: 2, name: 'Морепродукты' },
  { id: 3, name: 'Без мяса' },
  { id: 4, name: 'Свинина острая' },
  { id: 5, name: 'Свинина неострая' },
  { id: 6, name: 'Супы' },
  { id: 7, name: 'Сосиски' },
  { id: 8, name: 'Фри' },
  { id: 9, name: 'Курица' },
  { id: 10, name: 'Добавки' },
  { id: 11, name: 'Соусы' },
  { id: 12, name: 'Бар' },
  { id: 13, name: 'Холодильник' },
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