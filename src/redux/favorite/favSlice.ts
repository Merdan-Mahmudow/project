import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalCount } from '../../utils/calcTotalCount'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getFavFromLS } from '../../utils/getFavFormLS'
import { FavItem, FavSliceState } from './types_fav'

const initialState: FavSliceState = getFavFromLS()

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addItemFav(state, action: PayloadAction<FavItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count = 1
      } else {
        state.items.push({
          ...action.payload,
          count: 0
        })
      }
      state.totalCount = calcTotalCount(state.items)
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItemFav(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalCount = calcTotalCount(state.items)
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
})

export const { addItemFav, removeItemFav, clearItems } = favSlice.actions

export default favSlice.reducer