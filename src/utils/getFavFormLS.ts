import { FavItem } from "../redux/favorite/types_fav"
import { calcTotalCount } from "./calcTotalCountFav"
import { calcTotalPrice } from "./calcTotalPriceFav"

export const getFavFromLS = () => {
  const data = localStorage.getItem('fav')
  const items = data ? JSON.parse(data) : []
  const totalPrice = calcTotalPrice(items)
  const totalCount = calcTotalCount(items)
  return {
    items: items as FavItem[],
    totalPrice,
    totalCount,
  }
}