import { FavItem } from "../redux/favorite/types_fav"
import { calcTotalCount } from "./calcTotalCount"
import { calcTotalPrice } from "./calcTotalPrice"

export const getFavFromLS = () => {
  const data = localStorage.getItem('fav')
  const items_fav = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items_fav)
  const totalCount = calcTotalCount(items_fav)

  return {
    items_fav: items_fav as FavItem[],
    totalPrice,
    totalCount,
  }
}