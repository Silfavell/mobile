import axios from 'axios'
import Config from 'react-native-config'

export const CLEAR_CART = 'CLEAR_CART'
export const DECREASE_PRODUCT_QUANTITY = 'DECREASE_PRODUCT_QUANTITY'
export const INCREASE_PRODUCT_QUANTITY = 'INCREASE_PRODUCT_QUANTITY'
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY'
export const MAKE_ORDER = 'MAKE_ORDER'

export const clearCart = (token) => (dispatch) => {
	if (token) {
		const url = `${Config.SERVER_URL}/user/cart`

		axios.delete(url).then(({ status }) => {
			if (status === 200) {
				dispatch({
					type: CLEAR_CART
				})
			}
		})
	} else {
		dispatch({
			type: CLEAR_CART
		})
	}
}

export const makeOrder = (selectedCard, selectedAddress, cb) => (dispatch) => {
	const body = { card: selectedCard, address: selectedAddress }
	const url = `${Config.SERVER_URL}/user/order`

	axios.post(url, body).then(({ status }) => {
		if (status === 200) {
			dispatch({
				type: MAKE_ORDER
			})

			cb()
		}
	}).catch(() => {
		dispatch({
			type: 'DO_NOT_HANDLE'
		})
	})
}

export const decreaseProductQuantity = (productId, messagePopupRef, quantity = 1) => (dispatch) => {
	const url = `${Config.SERVER_URL}/deduct-product/${productId}`

	axios.put(url, { quantity }).then(({ data, status }) => {
		if (status === 200) {
			dispatch({
				type: DECREASE_PRODUCT_QUANTITY,
				payload: data
			})

			messagePopupRef?.showMessage({ message: 'Ürün sepetinizden çıkarıldı.' })

		}
	})
}

export const increaseProductQuantity = (productId, messagePopupRef, quantity = 1) => (dispatch) => {
	const url = `${Config.SERVER_URL}/add-product/${productId}`

	axios.put(url, { quantity }).then(({ data, status }) => {
		if (status === 200) {
			dispatch({
				type: INCREASE_PRODUCT_QUANTITY,
				payload: data
			})

			messagePopupRef?.showMessage({ message: 'Ürün sepetinize eklendi.' })
		}
	})
}


export const setProductQuantity = (productId, quantity = 1) => (dispatch) => {
	const url = `${Config.SERVER_URL}/set-product/${productId}`

	axios.put(url, { quantity }).then(({ data, status }) => {
		if (status === 200) {
			dispatch({
				type: SET_PRODUCT_QUANTITY,
				payload: {
					...data,
					quantity
				}
			})
		}
	})
}