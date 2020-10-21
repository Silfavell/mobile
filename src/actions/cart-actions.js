import AsyncStorage from '@react-native-community/async-storage'

import {
	clearCart as clearCartRequest,
	makeOrder as makeOrderRequest,
	decreaseProductQuantity as decreaseProductQuantityRequest,
	increaseProductQuantity as increaseProductQuantityRequest,
	setProductQuantity as setProductQuantityRequest,
} from '../scripts/requests'

export const CLEAR_CART = 'CLEAR_CART'
export const DECREASE_PRODUCT_QUANTITY = 'DECREASE_PRODUCT_QUANTITY'
export const INCREASE_PRODUCT_QUANTITY = 'INCREASE_PRODUCT_QUANTITY'
export const SET_PRODUCT_QUANTITY = 'SET_PRODUCT_QUANTITY'
export const MAKE_ORDER = 'MAKE_ORDER'

export const clearCart = (token) => (dispatch) => {
	if (token) {
		clearCartRequest().then(({ status }) => {
			if (status === 200) {
				dispatch({
					type: CLEAR_CART
				})
			}
		})
	} else {
		AsyncStorage.removeItem('cart').then(() => {
			dispatch({
				type: CLEAR_CART
			})
		})
	}
}

export const makeOrder = (selectedCard, selectedAddress, cb) => (dispatch) => {
	const body = { card: selectedCard, address: selectedAddress }

	makeOrderRequest(body).then(({ status }) => {
		if (status === 200) {
			dispatch({
				type: MAKE_ORDER
			})

			cb()
		}
	}).catch(() => {
		dispatch({ type: 'DO_NOT_HANDLE' })
	})
}

export const decreaseProductQuantity = (productId, messagePopupRef, quantity = 1) => (dispatch) => {
	decreaseProductQuantityRequest(productId, quantity).then(({ data, status }) => {
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
	increaseProductQuantityRequest(productId, quantity).then(({ data, status }) => {
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
	setProductQuantityRequest(productId, quantity).then(({ data, status }) => {
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