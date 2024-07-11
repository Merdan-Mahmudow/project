import React, { useRef, useEffect, useLayoutEffect, useState, useContext } from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'
import { categoriesList, Сategories, sortList, SortPopup, PizzaBlock, Skeleton, Search, Pagination, InfoBox } from '../components'
import { setCategory, setCurrentPage, setFilters } from '../redux/filter/slice'
import { SearchPizzaParams } from '../redux/pizza/types'
import { store, useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { Category } from '../redux/filter/types'
import { fetchPizzas } from '../redux/pizza/asyncActions'
import { selectPizzaData } from '../redux/pizza/selectors'
import { redirect, useNavigate } from 'react-router-dom'
import Cart from './Cart'
import Error from './Error'
import { Link } from 'react-router-dom'
import arrow_back from '../assets/images/Arrow 5.svg'
import { GlobalContext } from './router'
import { userState } from '../redux/user/slice'
import { FavoriteContext } from './Favorites'
import axios from 'axios'

export const Catalog: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isMounted = useRef(false)
  const userParams = useContext(GlobalContext)
  const [likeItems, setLikeItems] = useState([])


  const { category, sort, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = React.useCallback((idx: Category) => {
    dispatch(setCategory(idx))
  }, [dispatch])

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page))
  }

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '')
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc'
    const categoryId = category.id > 0 ? String(category.id) : ''
    const search = searchValue

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category: categoryId,
        search,
        currentPage: String(currentPage),
      }),
    )
    window.scrollTo(0, 0)
  }

  // Если изменили параметры и был первый рендер
  useLayoutEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: category.id > 0 ? category.id : null,
        currentPage: currentPage,
      }

      const queryString = qs.stringify(params, { skipNulls: true }) 
      navigate(`#/?${queryString}`);
    }
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
      const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy)
      const categoryObj = categoriesList.find((obj) => obj.id === Number(params.category))
      dispatch(
        setFilters({
          searchValue: params.search,
          category: categoryObj || categoriesList[0],
          currentPage: Number(params.currentPage),
          sort: sortObj || sortList[0],
        }),
      )
    }
    getPizzas()
  }, [category.id, currentPage])

  // Парсим параметры при первом рендере
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
      const category = categoriesList.find((obj) => obj.id === Number(params.category))

      dispatch(
        setFilters({
          searchValue: params.search,
          category: category || categoriesList[0],
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      )
    }
    isMounted.current = true
    axios
      .get(`https://api.kimchistop.ru/user/${userParams.user}/fav`)
      .then((e) => {
        let arr:any = []
        e.data.forEach((item: any) => {
            arr.push(item)
        })
        setLikeItems(arr)
        localStorage.setItem('likeItems', JSON.stringify(arr))
      })
      .catch((error) => console.error('Error fetching favorites:', error))
  }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <FavoriteContext.Provider value={{likeItems, setLikeItems}}>
      <div>
        {status === 'error' ? (
      <div>
        <div>
          <div className="flex w-full  bg-red-600 px-3 py-5">
            <Link to={`/`} className='font-bold flex justify-between gap-1 items-center px-[10px] py-1 w-auto'>
              <img src={arrow_back} alt="" className='h-5 absolute' />
            </Link>
            <h1 className='text-white font-term text-2xl w-full text-center tracking-[5px] leading-5'>ОШИБКА</h1>
          </div>
          <div>
            <div className='container'>
              <Error />
            </div>
          </div>
        </div>
      </div>
        ) : (
        <div>
          <div>
            <div className="w-full  bg-headerNav bg-cover flex justify-center items-center">
              <h1 className='text-white font-term text-2xl w-full text-center tracking-[5px] leading-5 px-5 py-5'>МЕНЮ</h1>
            </div>
            <div className="warning text-center px-2 py-[0px] bg-white">
              <h1 className="font-term kor_love text-[12px] pt-[5px]">ВНИМЕНИЕ ЛЮБИТЕЛЯМ КОРЕЙСКОЙ ЕДЫ!</h1>
              <p className='mt-2 font-sans font-medium text-[11.5px]  top-[-3px] relative'>Адрес навынос: г. Южно-Сахалинск, ул. Мира 231/9</p>
              <p className='font-sans font-medium text-[11.5px] top-[-5px] relative'>Принимаем заказы: ежедневно с 10:00 до 21:30</p>
            </div>
            <div className='container'>
              <div className='content__top'>
                <Сategories value={category} onChangeCategory={onChangeCategory} />
              </div>
              <div className='info__wrapper'>
              </div>
              <div className='grid grid-cols-2 gap-3 overflow-hidden overflow-y-scroll px-2 py-4'>
                {status === 'loading' ? skeletons : pizzas}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </FavoriteContext.Provider>

  )
}
