/* eslint-disable */
import axios from 'axios'

import { SET_CONNECTION_POPUP_STATE } from '../actions/global-actions'

export default (store) => {
	// Add a request interceptor
	axios.interceptors.request.use((config) => { // Do something before request is sent
		if (!store.getState().networkReducer.networkStatus) {
			store.dispatch({
				type: SET_CONNECTION_POPUP_STATE,
				payload: {
					connectionPopupState: true
				}
			})
			// throw new Error('Network Error')
		} else {
			config.cancelToken = new axios.CancelToken((c) => {
				cancel = c
			})
		}

		if (store.getState().reducer4.token) {
			config.headers.Authorization = store.getState().reducer4.token
		}

		return config
	}, (error) => // Do something with request error
		Promise.reject(error))

	// Add a response interceptor
	axios.interceptors.response.use((response) => // Do something with response data
		response,
		(error) => { // Do something with response error
			if (error.response) {
				store.getState().globalReducer.messagePopupRef.showMessage({ message: error?.response?.data?.error ?? 'Beklenmedik bir hata oluştu, lütfen daha sonra tekrar deneyiniz' })
				return Promise.reject(error)
			}
		})
}
