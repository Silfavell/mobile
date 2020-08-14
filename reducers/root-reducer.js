import { combineReducers } from 'redux'

import reducer1 from './reducer1'
import reducer2 from './reducer2'
import reducer4 from './reducer4'
import filterReducer from './filter-reducer'
import mapReducer from './map-reducer'
import networkReducer from './network-reducer'
import globalReducer from './global-reducer'

export default combineReducers({
	reducer1,
	reducer2,
	reducer4,
	filterReducer,
	mapReducer,
	networkReducer,
	globalReducer
})
