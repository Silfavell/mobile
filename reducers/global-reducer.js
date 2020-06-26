import {
	CLEAR_CART_POPUP_STATE,
	SET_CONNECTION_POPUP_STATE,
	NEED_TO_LOGIN_POPUP_STATE,
	SET_ROOT_NAVIGATION,
	SET_MESSAGE_POPUP_REF
} from '../actions/global-actions'

const INITIAL_STATE = {
	connectionPopupState: false,
	needToLoginPopupState: false,
	clearCartPopupState: false,
	messagePopupRef: null
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_MESSAGE_POPUP_REF:
		case SET_ROOT_NAVIGATION:
		case CLEAR_CART_POPUP_STATE:
		case SET_CONNECTION_POPUP_STATE:
		case NEED_TO_LOGIN_POPUP_STATE: return { ...state, ...action.payload }
		default: return state
	}
}
