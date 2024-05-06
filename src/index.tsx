import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { store } from './redux/store'
import { Provider } from 'react-redux'
const rootElem = document.getElementById('root')
if (rootElem) {
  const root = ReactDOM.createRoot(rootElem)
  root.render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}