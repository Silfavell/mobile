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

export const setPaymentType = (paymentType) => {
	return (dispatch) => {
		dispatch({
			type: SET_PAYMENT_TYPE,
			payload: {
				paymentType
			}
		})
	}
}

export const saveCard = (card, cb) => {
	return async (dispatch) => {
		const { status, data } = await addCard({ card })

		if (status === 200) {
			dispatch({
				type: SAVE_CARD,
				payload: {
					card: data
				}
			})
			cb()
		}
	}
}

export const deleteCard = (cardToken) => {
	return async (dispatch) => {
		const { status } = await removeCard({ cardToken })

		if (status === 200) {
			dispatch({
				type: DELETE_CARD,
				payload: {
					cardToken,
				}
			})
		}
	}
}

export const saveAddress = (address, details) => {
	return async (dispatch) => {
		const body = {
			openAddress: address,
			addressTitle: details.addressTitle
		}
		const { status, data } = await saveAddressRequest(body)

		if (status === 200) {
			await AsyncStorage.setItem('user', JSON.stringify(data))
			dispatch({
				type: SAVE_ADDRESS,
				payload: {
					addresses: data.addresses
				}
			})
		}
	}
}

export const deleteAddress = (addressId) => {
	return async (dispatch) => {
		const { status, data } = await deleteAddressRequest(addressId)

		if (status === 200) {
			await AsyncStorage.setItem('user', JSON.stringify(data))
			dispatch({
				type: DELETE_ADDRESS,
				payload: {
					addresses: data.addresses
				}
			})
		}
	}
}

export const setSelectedCard = (selectedCard, cb) => {
	return (dispatch) => {
		dispatch({
			type: SET_SELECTED_CARD,
			payload: {
				selectedCard
			}
		})

		cb()
	}
}

export const setSelectedAddress = (selectedAddress, cb) => {
	return (dispatch) => {
		dispatch({
			type: SET_SELECTED_ADDRESS,
			payload: {
				selectedAddress
			}
		})

		cb()
	}
}
