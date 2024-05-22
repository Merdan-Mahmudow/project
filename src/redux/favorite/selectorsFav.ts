import { RootState } from '../store'

export const selectFav = (state: RootState) => state.favSlice
export const selectFavItemById = (id: string) => (state: RootState) => state.favSlice.items.find(obj => obj.id === id)