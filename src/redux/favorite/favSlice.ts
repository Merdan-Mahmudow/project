import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalCount } from '../../utils/calcTotalCount'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getFavFromLS } from '../../utils/getFavFormLS'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { FavItem, FavSliceState } from '../favorite/types_fav'
import { CartItem, CartSliceState } from '../cart/types'

const initialState: FavSliceState = getFavFromLS()

export const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addItemFav(state, action_fav: PayloadAction<FavItem>) {
      const findItem = state.items.find(obj => obj.id === action_fav.payload.id)
      if (findItem) {
        findItem.count = 1
      } else {
        state.items.push({
          ...action_fav.payload,
          count: 1
        })
        console.log(state.items)
        localStorage.setItem('cart', JSON.stringify(favSlice))
        // console.log(localStorage.getItem('fav'))
      }
      // state.totalCount = calcTotalCount(state.items)
      // state.totalPrice = calcTotalPrice(state.items)
    },
    removeItemFav(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      // state.totalCount = calcTotalCount(state.items)
      // state.totalPrice = calcTotalPrice(state.items)
    },
  },
})

export const { addItemFav, removeItemFav} = favSlice.actions

export default favSlice.reducer