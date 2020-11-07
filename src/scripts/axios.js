import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import Config from 'react-native-config'

import { SET_CONNECTION_POPUP_STATE } from '../actions/global-actions'

export const instance = axios.create({
    baseURL: Config.SERVER_URL
})

instance.interceptors.request.use(async (options) => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
        options.headers.Authorization = token
    }

    return options
})

export default (store) => {
    instance.interceptors.request.use((config) => {
        if (!store.getState().networkReducer.networkStatus) {
            store.dispatch({
                type: SET_CONNECTION_POPUP_STATE,
                payload: {
                    connectionPopupState: true
                }
            })
        }
        /* else {
            config.cancelToken = new instance.CancelToken((c) => {
                // eslint-disable-next-line no-undef
                cancel = c
            })
        }
        */

        return config
    }, (error) => { // Request Error
        Promise.reject(error)
    })

    instance.interceptors.response.use(
        (response) => response,
        (error) => { // Response Error
            store.getState().globalReducer.messagePopupRef.showMessage({ message: error?.response?.data?.error ?? 'Beklenmedik bir hata oluştu, lütfen daha sonra tekrar deneyiniz' })

            return Promise.reject(error)
        }
    )
}
