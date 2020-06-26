import { AsyncStorage } from 'react-native'
import axios from 'axios'
import { SERVER_URL } from '../utils/global'

export const SET_INITIAL_DATAS = 'SET_INITIAL_DATAS'
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATE_FAVORITE_PRODUCTS = 'UPDATE_FAVORITE_PRODUCTS'

const getCategories = () => {
	const url = `${SERVER_URL}/categories`

	return axios.get(url).then(({ data }) => data)
}

const getProducts = () => {
	const url = `${SERVER_URL}/products-with-categories`

	return axios.get(url).then(({ data }) => data)
}

const getCart = (token) => {
	const url = `${SERVER_URL}/user/cart`

	return axios.get(url, { headers: { Authorization: token } }).then(({ data }) => data?.cart ?? {})
}

const getPaymentCards = (token) => {
	const url = `${SERVER_URL}/user/list-cards`

	return axios.get(url, { headers: { Authorization: token } }).then(({ data }) => data)
}

export const updateProfile = (body, cb) => (dispatch) => {
	const url = `${SERVER_URL}/user/profile`

	axios.put(url, body)
		.then(({ data, status }) => {
			if (status === 200) {
				dispatch({
					type: SET_USER,
					payload: {
						user: data
					}
				})
				cb()
			}
		})
}

export const setInitialDatas = () => (dispatch) => {
	// AsyncStorage.removeItem('cart')
	AsyncStorage.multiGet(['token', 'user', 'cart']).then((vals) => {
		if (vals[0][1]) {
			return Promise.all([getCategories(), getProducts(), getCart(vals[0][1]), getPaymentCards(vals[0][1])]).then((res) => {
				dispatch({
					type: SET_INITIAL_DATAS,
					payload: {
						categories: res[0],
						products: res[1],
						token: vals[0][1],
						user: JSON.parse(vals[1][1]),
						cart: res[2],
						cards: res[3].cardDetails
					}
				})
			})
		}
		return Promise.all([getCategories(), getProducts()]).then((res) => {
			dispatch({
				type: SET_INITIAL_DATAS,
				payload: {
					categories: res[0],
					products: res[1],
					token: vals[0][1],
					user: JSON.parse(vals[1][1]),
					cart: JSON.parse(vals[2][1])
				}
			})
		})
	})
}

export const login = (body, popupRef, cb) => (dispatch) => {
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

export const addToFavoriteProducts = (productId) => (dispatch) => {
	axios.post(`${SERVER_URL}/user/favorite-product`, { _id: productId }).then(({ status, data }) => {
		if (status === 200) {
			dispatch({
				type: UPDATE_FAVORITE_PRODUCTS,
				payload: {
					favoriteProducts: data
				}
			})
		}
	}).catch((err) => {
		console.log(err)
	})
}

export const removeFromFavoriteProdutcs = (productId) => (dispatch) => {
	axios.delete(`${SERVER_URL}/user/favorite-product/${productId}`).then(({ status, data }) => {
		if (status === 200) {
			dispatch({
				type: UPDATE_FAVORITE_PRODUCTS,
				payload: {
					favoriteProducts: data
				}
			})
		}
	}).catch((err) => {
		console.log(err)
	})
}