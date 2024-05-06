export type Pizza = {
  id: string;
  foodName: string;
  price: number;
  image: string;
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  COMPLITED = 'completed',
  ERROR = 'error',
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
}

export interface PizzaSliceState {
  items: Pizza[]
  status: Status
}