import { AsyncStorage } from 'react-native'
import axios from 'axios'

import { SERVER_URL } from '../utils/global'
import { SET_NEED_UPDATE_POPUP_STATE } from './global-actions'

import pckg from '../package.json'

export const SET_INITIAL_DATAS = 'SET_INITIAL_DATAS'
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_FAVORITE_PRODUCTS = 'UPDATE_FAVORITE_PRODUCTS'

const getDatas = (token) => {
	const url = `${SERVER_URL}/mobile-initializer`

	if (token) {
		return axios.get(url, { headers: { Authorization: token } }).then(({ data }) => data)
	}

	return axios.get(url).then(({ data }) => data)
}

const getVersion = () => {
	const url = `${SERVER_URL}/version`

	return axios.get(url).then(({ data }) => data)
}

export const updateProfile = (body, cb) => (dispatch) => {
	const url = `${SERVER_URL}/user/profile`

	axios.put(url, body)
		.then(({ data, status }) => {
			if (status === 200) {
				AsyncStorage.setItem('user', JSON.stringify(data)).then(() => {
					dispatch({
						type: SET_USER,
						payload: {
							user: data
						}
					})

					cb()
				})
			}
		})
}

export const setInitialDatas = () => (dispatch) => {
	// AsyncStorage.removeItem('cart')

	getVersion().then((version) => {
		if (version === pckg.version) {
			AsyncStorage.multiGet(['token', 'user', 'cart']).then((vals) => {
				if (vals[0][1]) {
					return getDatas(vals[0][1]).then((datas) => {
						dispatch({
							type: SET_INITIAL_DATAS,
							payload: {
								...datas,
								token: vals[0][1],
								user: JSON.parse(vals[1][1]),
								cards: datas.cards.cardDetails
							}
						})
					})
				}

				return getDatas().then((datas) => {
					dispatch({
						type: SET_INITIAL_DATAS,
						payload: datas
					})
				})
			})
		} else {
			dispatch({
				type: SET_NEED_UPDATE_POPUP_STATE,
				payload: {
					needUpdatePopupState: true
				}
			})
		}
	})
}

export const login = (body, cb) => (dispatch) => {
	const url = `${SERVER_URL}/login`

	axios.post(url, body).then(({ status, data }) => {
		if (status === 200) {
			AsyncStorage.multiSet([['token', data.token], ['user', JSON.stringify(data.user)]]).then(() => {
				dispatch({
					type: SET_USER,
					payload: {
						user: data.user,
						token: data.token
					}
				})

				cb()
			})
		}
	})
}

export const register = (body, cb) => (dispatch) => {
	const url = `${SERVER_URL}/register`

	axios.post(url, body).then(({ status, data }) => {
		if (status === 200) {
			AsyncStorage.multiSet([['token', data.token], ['user', JSON.stringify(data.user)]]).then(() => {
				dispatch({
					type: SET_USER,
					payload: {
						user: data.user,
						token: data.token
					}
				})

				cb()
			})
		}
	})
}

export const logout = () => (dispatch) => {
	AsyncStorage.multiRemove(['token', 'user']).then(() => {
		dispatch({
			type: LOGOUT,
			payload: {
				// categories: [],
				// products: [],
				user: {},
				token: null
			}
		})
	})
}

export const addToFavoriteProducts = (productId, messagePopupRef) => (dispatch) => {
	axios.post(`${SERVER_URL}/user/favorite-product`, { _id: productId }).then(({ status, data }) => {
		if (status === 200) {
			AsyncStorage.getItem('user').then((user) => {
				AsyncStorage.setItem('user', JSON.stringify({ ...JSON.parse(user), favoriteProducts: data })).then(() => {
					dispatch({
						type: UPDATE_FAVORITE_PRODUCTS,
						payload: {
							favoriteProducts: data
						}
					})
				})
			})

			if (messagePopupRef) {
				messagePopupRef.showMessage({ message: 'Ürün favorilerinize eklendi.' })
			}
		}
	})
}

export const removeFromFavoriteProdutcs = (productId, messagePopupRef) => (dispatch) => {
	axios.delete(`${SERVER_URL}/user/favorite-product/${productId}`).then(({ status, data }) => {
		if (status === 200) {
			AsyncStorage.getItem('user').then((user) => {
				AsyncStorage.setItem('user', JSON.stringify({ ...JSON.parse(user), favoriteProducts: data })).then(() => {
					dispatch({
						type: UPDATE_FAVORITE_PRODUCTS,
						payload: {
							favoriteProducts: data
						}
					})
				})
			})

			if (messagePopupRef) {
				messagePopupRef.showMessage({ message: 'Ürün favorilerinizden çıkarıldı.' })
			}
		}
	})
}
