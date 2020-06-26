import { SET_INITIAL_DATAS, SET_USER, LOGOUT, UPDATE_FAVORITE_PRODUCTS } from '../actions/actions4'

const INITIAL_STATE = {
	categories: [],
	products: [],
	user: {},
	token: null,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_INITIAL_DATAS:
		case SET_USER:
		case LOGOUT: return { ...state, ...action.payload }
		case UPDATE_FAVORITE_PRODUCTS: {
			return {
				...state,
				user: {
					...state.user,
					favoriteProducts: action.payload.favoriteProducts
				}
			}
		}
		default: return state
	}
}
