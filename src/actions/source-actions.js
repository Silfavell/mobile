import AsyncStorage from '@react-native-community/async-storage'

import { SET_NEED_UPDATE_POPUP_STATE } from './global-actions'
import {
	mobileInitializer,
	getVersion as getVersionRequest,
	login as loginRequest,
	signUp,
	addFavorite,
	removeFavorite
} from '../scripts/requests'
import pckg from '../../package.json'

export const SET_INITIAL_DATAS = 'SET_INITIAL_DATAS'
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const UPDATE_FAVORITE_PRODUCTS = 'UPDATE_FAVORITE_PRODUCTS'

export const getDatas = () => {
	return mobileInitializer().then(({ data }) => data)
}

export const getVersion = () => {
	return getVersionRequest().then(({ data }) => data)
}

export const updateProfile = (body, cb) => (dispatch) => {
	updateProfile(body).then(({ data, status }) => {
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
	getVersionRequest().then(({ data: version }) => {
		if (version === pckg.version) {
			AsyncStorage.multiGet(['token', 'user', 'cart']).then((vals) => {
				const [tokenObj, userObj, cartObj] = vals

				if (tokenObj) {
					return getDatas().then((datas) => {
						dispatch({
							type: SET_INITIAL_DATAS,
							payload: {
								...datas,
								token: tokenObj[1],
								user: JSON.parse(userObj[1]),
								cart: JSON.parse(cartObj[1]),
								cards: datas.cards?.cardDetails
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
	loginRequest(body).then(({ status, data }) => {
		if (status === 200) {
			AsyncStorage.multiSet([
				['token', data.token],
				['user', JSON.stringify(data.user)]
			]).then(() => {
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
	signUp(body).then(({ status, data }) => {
		if (status === 200) {
			AsyncStorage.multiSet([
				['token', data.token],
				['user', JSON.stringify(data.user)]
			]).then(() => {
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
				user: {},
				token: null
			}
		})
	})
}

export const addToFavoriteProducts = (productId, messagePopupRef) => (dispatch) => {
	addFavorite(productId).then(({ status, data }) => {
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
	removeFavorite(productId).then(({ status, data }) => {
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
