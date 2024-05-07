import React, { useRef, useEffect, useLayoutEffect } from 'react'
import qs from 'qs'
import { useSelector } from 'react-redux'
import { categoriesList, Сategories, sortList, SortPopup, PizzaBlock, Skeleton, Search, Pagination, InfoBox } from '../components'
import { setCategory, setCurrentPage, setFilters } from '../redux/filter/slice'
import { SearchPizzaParams } from '../redux/pizza/types'
import { useAppDispatch } from '../redux/store'
import { selectFilter } from '../redux/filter/selectors'
import { Category } from '../redux/filter/types'
import { fetchPizzas } from '../redux/pizza/asyncActions'
import { selectPizzaData } from '../redux/pizza/selectors'
import { useNavigate } from 'react-router-dom'

export const Catalog: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isMounted = useRef(false)

  const { category, sort, currentPage, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const onChangeCategory = React.useCallback((idx: Category) => {
    dispatch(setCategory(idx))
  }, [])

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
        sortProperty: sort.sortProperty,
        currentPage: Number(currentPage),
      }

      const queryString = qs.stringify(params, { skipNulls: true })
      console.log('queryString', queryString)
      console.log('currentPage', currentPage)
      console.log('category', category)
      navigate(`/?${queryString}`);
    }
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
      const sortObj = sortList.find((obj) => obj.sortProperty === params.sortBy)
      const categoryObj = categoriesList.find((obj) => obj.id === Number(params.category))

      console.log('window', qs.parse(window.location.search.substring(1)).search)
      console.log('params', params)
      console.log('sortObj', sortObj)
      console.log('categoryObj', categoryObj)

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
  }, [category.id, sort.sortProperty, searchValue, currentPage])

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
  }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />)
  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />)

  return (
    <div className='content'>
      <div className='text-center mb-2'>
        <h2 className='text-3xl uppercase font-term py-3 text-white bg-headerNav bg-no-repeat bg-cover'>Меню</h2>
        <div className="warning text-center">
          <h1 className="font-term kor_love pt-2">ВНИМЕНИЕ ЛЮБИТЕЛЯМ КОРЕЙСКОЙ ЕДЫ!</h1>
          <p className='mt-2 font-sans text-sm font-medium'>Адрес навынос: г. Южно-Сахалинск, ул. Мира 231/9</p>
          <p className='pb-2 font-sans text-sm font-medium'>Принимаем заказы: ежедневно с 10:00 до 21:30</p>
        </div>
      </div>
      <div className='container'>
        {status === 'error' ? (
          <InfoBox
            title='Произошла ошибка'
            description='К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.'
            buttonTitle='Вернуться назад'
            icon='😕'
            alt='Произошла ошибка'
          />
        ) : (
          <>
            <div className='content__top'>
              <Сategories value={category} onChangeCategory={onChangeCategory} />
            </div>
            <div className='info__wrapper'>
            </div>
            <div className='grid grid-cols-2 gap-3 overflow-hidden overflow-y-scroll px-2 pt-4'>
              {status === 'loading' ? skeletons : pizzas}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
