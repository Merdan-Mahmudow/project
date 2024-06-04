export type CartItem = {
  id: string
  foodName: string
  price: number
  image: string
  count: number
  description: string
}

export interface CartSliceState {
  totalPrice: number
  totalCount: number
  items: CartItem[]
}