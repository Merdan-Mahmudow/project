import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category, FilterSliceState, Sort, SortPropertyEnum } from './types'

const initialState: FilterSliceState = {
  searchValue: '',
  category: {
    id: 0,
    name: 'Все',
  },
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<Category>) {
      state.category = action.payload
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage)
        state.category = action.payload.category
        state.sort = action.payload.sort
      } else {
        state.currentPage = 1;
        state.category = {
          id: 0,
          name: 'Все',
        }
        state.sort = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING_DESC,
        }
      }
    },
  },
})

export const { setCategory, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer