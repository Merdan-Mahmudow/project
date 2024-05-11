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
    <div className='overflow-x-scroll bg-red-600 px-2 py-2'>
      <ul className='w-[500px] relative flex h-full'>
        {categoriesList.map((obj) => (
          <li
            key={obj.id}
            onClick={() => onChangeCategory(obj)}
            className={
              value.id === obj.id ?
                'bg-white px-5 py-2 rounded-[30px] w-fill font-next text-black font-bold uppercase min-w-fit hover:cursor-pointer':
                'bg-transparent px-5 py-2 w-fill rounded-[30px] text-white font-next font-bold uppercase min-w-fit hover:cursor-pointer'
            }>
            {obj.name}
          </li>
        ))}
      </ul>
    </div>
  )
})