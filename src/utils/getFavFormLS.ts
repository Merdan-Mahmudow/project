import axios from "axios"
import { FavItem } from "../redux/favorite/types_fav"
import { calcTotalCount } from "./calcTotalCountFav"
import { calcTotalPrice } from "./calcTotalPriceFav"
import qs from "qs"

let data:any = []
async function getData() {
  const params = qs.parse(window.location.search.substring(1))
  await axios.post(`https://backend.skyrodev.ru/user/setstate?nickname=${params.user}`)
  await axios.get(`https://backend.skyrodev.ru/user/${params.user}/fav`).then(e => {
    e.data.forEach((item:any) =>{
      data.push(item)
      console.log(item)
    })
  })
  console.log(data)
}

export const getFavFromLS = () => {
  getData()
  const items = data
  const totalPrice = calcTotalPrice(items)
  const totalCount = calcTotalCount(items)
  return {
    items: items as FavItem[],
    totalPrice,
    totalCount,
  }
}