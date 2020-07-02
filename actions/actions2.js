import axios from 'axios'
import { SERVER_URL } from '../utils/global'

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
	const url = `${SERVER_URL}/user/payment-card`

	axios.post(url, { card })
		.then(({ status, data }) => {
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
	const url = `${SERVER_URL}/user/payment-card`

	axios.put(url, { cardToken })
		.then(({ status }) => {
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
		addressTitle: details.addressTitle,
		buildingNo: details.buildingNo,
		floor: details.floor,
		aptNo: details.aptNo,
		directions: details.directions
	}

	return (dispatch) => {
		const url = `${SERVER_URL}/user/address`

		axios.post(url, body)
			.then(({ status, data }) => {
				if (status === 200) {
					// AsyncStorage.setItem('user', JSON.stringify(data)) // User serverda güncellenince, güncellenenen tüm user'ı geri dönüyor.
					dispatch({
						type: SAVE_ADDRESS,
						payload: {
							addresses: data.addresses
						}
					})
				}
			})
	}
}

export const deleteAddress = (addressId) => (dispatch) => {
	const url = `${SERVER_URL}/user/address/${addressId}`

	axios.delete(url)
		.then(({ status, data }) => {
			if (status === 200) {
				// AsyncStorage.setItem('user', JSON.stringify(data)) // User serverda güncellenince, güncellenenen tüm user'ı geri dönüyor.

				dispatch({
					type: DELETE_ADDRESS,
					payload: {
						addresses: data.addresses
					}
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
