import { combineReducers } from 'redux'

import reducer1 from './reducer1'
import reducer2 from './reducer2'
import reducer3 from './reducer3'
import reducer4 from './reducer4'
import filterProductsReducer from './filter-products-reducer'
import mapReducer from './map-reducer'
import networkReducer from './network-reducer'
import globalReducer from './global-reducer'

export default combineReducers({
	reducer1,
	reducer2,
	reducer3,
	reducer4,
	filterProductsReducer,
	mapReducer,
	networkReducer,
	globalReducer
})
