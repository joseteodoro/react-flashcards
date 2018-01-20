import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import middlewares from './middlewares'
import reducers from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore (previousState) {
  return createStore(
    reducers,
    previousState,
    applyMiddleware(
      loggerMiddleware,
      thunkMiddleware,
      middlewares
    )
  )
}
