import { FavItem } from "../redux/favorite/types_fav"

export const calcTotalCount = (items: FavItem[]) => {
  return items.reduce((sum, item) => sum + item.count, 0)
}