import AsyncStorage from '@react-native-community/async-storage'

import pckg from '../../package.json'
import {
    mobileInitializer,
    getVersion as getVersionRequest,
    login as loginRequest,
    signUp,
    addFavorite,
    removeFavorite,
    updateProfile as updateProfileRequest
} from '../scripts/requests'
import { SET_NEED_UPDATE_POPUP_STATE } from './global-actions'

export const SET_INITIAL_DATAS = 'SET_INITIAL_DATAS'
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const UPDATE_FAVORITE_PRODUCTS = 'UPDATE_FAVORITE_PRODUCTS'

export const getDatas = async () => {
    const { data } = await mobileInitializer()

    return data
}

export const getVersion = async () => {
    const { data } = await getVersionRequest()

    return data
}

export const updateProfile = (body, cb) => async (dispatch) => {
    const { status, data } = await updateProfileRequest(body)

    if (status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(data))

        dispatch({
            type: SET_USER,
            payload: {
                user: data
            }
        })
        cb()
    }
}

// eslint-disable-next-line consistent-return
export const setInitialDatas = () => async (dispatch) => {
    // AsyncStorage.removeItem('cart')
    const { data: version } = await getVersionRequest()

    if (version === pckg.version) {
        const [tokenObj, userObj, cartObj] = await AsyncStorage.multiGet(['token', 'user', 'cart'])
        const datas = await getDatas()

        if (tokenObj) {
            return dispatch({
                type: SET_INITIAL_DATAS,
                payload: {
                    ...datas,
                    token: tokenObj[1],
                    user: JSON.parse(userObj[1]),
                    cart: JSON.parse(cartObj[1]),
                    cards: datas.cards?.cardDetails
                }
            })
        }

        return dispatch({
            type: SET_INITIAL_DATAS,
            payload: datas
        })
    }

    dispatch({
        type: SET_NEED_UPDATE_POPUP_STATE,
        payload: {
            needUpdatePopupState: true
        }
    })
}

export const login = (body, cb) => async (dispatch) => {
    const { status, data } = await loginRequest(body)

    if (status === 200) {
        await AsyncStorage.multiSet([
            ['token', data.token],
            ['user', JSON.stringify(data.user)]
        ])

        dispatch({
            type: SET_USER,
            payload: {
                user: data.user,
                token: data.token
            }
        })

        cb()
    }
}

export const register = (body, cb) => async (dispatch) => {
    const { status, data } = await signUp(body)

    if (status === 200) {
        await AsyncStorage.multiSet([
            ['token', data.token],
            ['user', JSON.stringify(data.user)]
        ])

        dispatch({
            type: SET_USER,
            payload: {
                user: data.user,
                token: data.token
            }
        })
        cb()
    }
}

export const logout = () => async (dispatch) => {
    await AsyncStorage.multiRemove(['token', 'user'])

    dispatch({
        type: LOGOUT,
        payload: {
            user: {},
            token: null
        }
    })
}

export const addToFavoriteProducts = (productId, messagePopupRef) => async (dispatch) => {
    const { status, data } = await addFavorite(productId)

    if (status === 200) {
        const user = await AsyncStorage.getItem('user')
        await AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...JSON.parse(user), favoriteProducts: data })
        )

        dispatch({
            type: UPDATE_FAVORITE_PRODUCTS,
            payload: {
                favoriteProducts: data
            }
        })

        if (messagePopupRef) {
            messagePopupRef.showMessage({ message: 'Ürün favorilerinize eklendi.' })
        }
    }
}

export const removeFromFavoriteProdutcs = (productId, messagePopupRef) => async (dispatch) => {
    const { status, data } = await removeFavorite(productId)

    if (status === 200) {
        const user = await AsyncStorage.getItem('user')
        await AsyncStorage.setItem(
            'user',
            JSON.stringify({ ...JSON.parse(user), favoriteProducts: data })
        )

        dispatch({
            type: UPDATE_FAVORITE_PRODUCTS,
            payload: {
                favoriteProducts: data
            }
        })

        if (messagePopupRef) {
            messagePopupRef.showMessage({ message: 'Ürün favorilerinizden çıkarıldı.' })
        }
    }
}
