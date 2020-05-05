import axios from 'axios'
import { SERVER_URL } from '../utils/global'

export const CLEAR_CART = 'CLEAR_CART'
export const DECREASE_PRODUCT_QUANTITY = 'DECREASE_PRODUCT_QUANTITY'
export const INCREASE_PRODUCT_QUANTITY = 'INCREASE_PRODUCT_QUANTITY'
export const MAKE_ORDER = 'MAKE_ORDER'

export const clearCart = (token) => (dispatch) => {
	if (token) {
		const url = `${SERVER_URL}/user/cart`

		axios.delete(url).then(({ status }) => {
			if (status === 200) {
				dispatch({
					type: CLEAR_CART,
				})
			}
		})
	} else {
		dispatch({
			type: CLEAR_CART,
		})
	}
}

export const makeOrder = (selectedCard, selectedAddress, cb) => (dispatch) => {
	const body = { card: selectedCard, address: selectedAddress }
	const url = `${SERVER_URL}/user/order`

	axios.post(url, body).then(({ status }) => {
		if (status === 200) {
			cb()
			dispatch({
				type: MAKE_ORDER,
			})
		}
	}).catch(() => {
		dispatch({
			type: 'DO_NOT_HANDLE'
		})
	})
}

export const decreaseProductQuantity = (productId) => (dispatch) => {
	const url = `${SERVER_URL}/product/${productId}`

	axios.delete(url).then(({ data, status }) => {
		if (status === 200) {
			dispatch({
				type: DECREASE_PRODUCT_QUANTITY,
				payload: data
			})
		}
	})
}

export const increaseProductQuantity = (productId) => (dispatch) => {
	const url = `${SERVER_URL}/product/${productId}`

	axios.get(url).then(({ data, status }) => {
		if (status === 200) {
			dispatch({
				type: INCREASE_PRODUCT_QUANTITY,
				payload: data
			})
		}
	})
}
