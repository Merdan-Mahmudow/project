import React from 'react'
import { useRouteError } from 'react-router-dom'
import { InfoBox } from '../components/InfoBox'

type Ierror = {
  statusText: string
  message: string
}
type errorType = ReturnType<typeof useRouteError>

export default function ErrorPage() {
  const error: errorType = useRouteError()
  let errorMessage = error as errorType as Ierror

  return <InfoBox
    title='Извините, произошла непредвиденная ошибка.'
    description={errorMessage.statusText || errorMessage.message}
    buttonTitle='Вернуться назад'
    icon='😕'
    alt='Упс!'
  />
}