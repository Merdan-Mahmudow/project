import React, { useRef, useState, useCallback } from 'react'
import SearchSvg from '../../svg/SearchSvg'
import ClearSearchSvg from '../../svg/ClearSearchSvg'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import { setSearchValue } from '../../redux/filter/slice'

export const Search: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const onClickClear = () => {
    dispatch(setSearchValue(''))
    setValue('')
    inputRef.current?.focus()
  }

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str))
    }, 300),
    [],
  )

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
    updateSearchValue(event.target.value)
  }

  return (
    <div className={styles.root}>
      <SearchSvg />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      <ClearSearchSvg
        onClickClear={onClickClear}
      />
    </div>
  )
}