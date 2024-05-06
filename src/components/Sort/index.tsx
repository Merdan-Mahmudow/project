import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSort } from '../../redux/filter/slice'
import { Sort as SortType, SortPropertyEnum } from '../../redux/filter/types'
import SortArrowSvg from '../../svg/SortArrowSvg'

type SortItem = {
  name: string
  sortProperty: SortPropertyEnum
}

type PopupClick = MouseEvent & {
  path: Node[]
}

type SortPopupProps = {
  value: SortType
}

export const sortList: SortItem[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
]

export const SortPopup: React.FC<SortPopupProps> = React.memo(({ value }) => {
  const dispatch = useDispatch()
  //const sort = useSelector(selectSort)
  const sortRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)

  const onClickListItem = (obj: SortItem) => {
    dispatch(setSort(obj))
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick

      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setOpen(false)
      }
    }
    document.body.addEventListener('click', handleClickOutside)
    return () => {
      document.body.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div ref={sortRef} className='sort' onClick={() => setOpen(!open)}>
      <div className='sort__label'>
        <div className={`arrowLabelBox ${open ? 'active' : ''}`}><SortArrowSvg /></div>
        <b>Сортировка по:</b>
        <span>{value.name}</span>
      </div>
      {open &&
        <div className='sort__popup'>
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
})