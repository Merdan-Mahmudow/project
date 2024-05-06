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
  return (
    <div>
      
    </div>
  )
})