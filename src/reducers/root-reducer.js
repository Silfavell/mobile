import { combineReducers } from 'redux'

import cartReducer from './cart-reducer'
import paymentReducer from './payment-reducer'
import sourceReducer from './source-reducer'
import filterReducer from './filter-reducer'
import mapReducer from './map-reducer'
import networkReducer from './network-reducer'
import globalReducer from './global-reducer'

export default combineReducers({
    cartReducer,
    paymentReducer,
    sourceReducer,
    filterReducer,
    mapReducer,
    networkReducer,
    globalReducer,
})
