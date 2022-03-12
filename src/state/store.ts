import { applyMiddleware, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import reducers from './reducers'
import { rootSaga } from "./sagas"

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = typeof window === 'object' && (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] ?
    (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
        serialize: {
            options: {
                map: true,
            }
        }
    }) : compose

const store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store