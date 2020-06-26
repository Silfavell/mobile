import { SET_SELECTED_CATEGORY } from '../actions/actions3'

const INITIAL_STATE = {
	selectedCategory: 0
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_SELECTED_CATEGORY: return { ...state, selectedCategory: action.payload.selectedCategory }

		default: return state
	}
}
