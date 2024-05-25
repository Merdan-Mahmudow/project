import { FavItem } from "../redux/favorite/types_fav"

export const calcTotalCount = (items_fav: FavItem[]) => {
  return items_fav.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}