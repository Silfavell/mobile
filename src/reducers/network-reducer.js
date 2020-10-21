import { SET_NETWORK_STATUS } from '../actions/network-actions'

const INITIAL_STATE = {
	networkStatus: true
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_NETWORK_STATUS: return { ...state, ...action.payload }

		default: return state
	}
}
