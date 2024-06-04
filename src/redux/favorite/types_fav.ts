export type FavItem = {
    id: string
    foodName: string
    price: number
    image: string
    count: number
    description: string
    isCounter: boolean
  }
  
  export interface FavSliceState {
    totalPrice: number
    totalCount: number
    items: FavItem[]
  }