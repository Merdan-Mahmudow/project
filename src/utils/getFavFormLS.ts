import axios from "axios"
import { FavItem } from "../redux/favorite/types_fav"
import { calcTotalCount } from "./calcTotalCountFav"
import { calcTotalPrice } from "./calcTotalPriceFav"
import qs from "qs"
import { GlobalContext } from "../routes/router"
import { useContext } from "react"

let data: FavItem[] = []
async function getData() {
  const ls: any = localStorage.getItem('tgParams')
  const params: any = JSON.parse(ls)
  await axios.post(`https://api.kimchistop.ru/user/setstate?nickname=${params.user}`)
  await axios.get(`https://api.kimchistop.ru/user/${params.user}/fav`).then(e => {
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