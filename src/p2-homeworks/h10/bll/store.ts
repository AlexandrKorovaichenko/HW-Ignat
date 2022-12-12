import { combineReducers, legacy_createStore as createStore} from 'redux'
import {loadingReducer} from './loadingReducer'

const reducers = combineReducers({
    loadingReducer: loadingReducer,
})

const store = createStore(reducers)

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
