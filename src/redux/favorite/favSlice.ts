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
      const findItem = state.items_fav.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count = 1
      } else {
        state.items_fav.push({
          ...action.payload,
          count: 0
        })
      }
      state.totalCount = calcTotalCount(state.items_fav)
      state.totalPrice = calcTotalPrice(state.items_fav)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items_fav = state.items_fav.filter(obj => obj.id != action.payload)
      state.totalCount = calcTotalCount(state.items_fav)
      state.totalPrice = calcTotalPrice(state.items_fav)
    },
    clearItems(state) {
      state.items_fav = []
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
})

export const { addItemFav, removeItem, clearItems } = favSlice.actions

export default favSlice.reducer