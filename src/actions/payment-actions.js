import AsyncStorage from '@react-native-community/async-storage'

import {
	addCard,
	removeCard,
	saveAddress as saveAddressRequest,
	deleteAddress as deleteAddressRequest
} from '../scripts/requests'

export const SET_PAYMENT_TYPE = 'SET_PAYMENT_TYPE'
export const SAVE_CARD = 'SAVE_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const SAVE_ADDRESS = 'SAVE_ADDRESS'
export const DELETE_ADDRESS = 'DELETE_ADDRESS'
export const SET_SELECTED_CARD = 'SET_SELECTED_CARD'
export const SET_SELECTED_ADDRESS = 'SET_SELECTED_ADDRESS'

export const setPaymentType = (paymentType) => (dispatch) => {
	dispatch({
		type: SET_PAYMENT_TYPE,
		payload: {
			paymentType
		}
	})
}

export const saveCard = (card, cb) => (dispatch) => {
	addCard({ card }).then(({ status, data }) => {
		if (status === 200) {
			dispatch({
				type: SAVE_CARD,
				payload: {
					card: data
				}
			})

			cb()
		}
	})
}

export const deleteCard = (cardToken) => (dispatch) => {
	removeCard({ cardToken }).then(({ status }) => {
		if (status === 200) {
			dispatch({
				type: DELETE_CARD,
				payload: {
					cardToken,
				}
			})
		}
	})
}

export const saveAddress = (address, details) => {
	const body = {
		openAddress: address,
		addressTitle: details.addressTitle
	}

	return (dispatch) => {
		saveAddressRequest(body).then(({ status, data }) => {
			if (status === 200) {
				AsyncStorage.setItem('user', JSON.stringify(data)).then(() => {
					dispatch({
						type: SAVE_ADDRESS,
						payload: {
							addresses: data.addresses
						}
					})
				})
			}
		})
	}
}

export const deleteAddress = (addressId) => (dispatch) => {
	deleteAddressRequest(addressId).then(({ status, data }) => {
		if (status === 200) {
			AsyncStorage.setItem('user', JSON.stringify(data)).then(() => {
				dispatch({
					type: DELETE_ADDRESS,
					payload: {
						addresses: data.addresses
					}
				})
			})
		}
	})
}

export const setSelectedCard = (selectedCard, cb) => (dispatch) => {
	dispatch({
		type: SET_SELECTED_CARD,
		payload: {
			selectedCard
		}
	})

	cb()
}

export const setSelectedAddress = (selectedAddress, cb) => (dispatch) => {
	dispatch({
		type: SET_SELECTED_ADDRESS,
		payload: {
			selectedAddress
		}
	})

	cb()
}
