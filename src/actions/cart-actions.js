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

export const clearCart = (token) => {
    return async (dispatch) => {
        if (token) {
            const { status } = await clearCartRequest()

            if (status === 200) {
                dispatch({ type: CLEAR_CART })
            }
        } else {
            await AsyncStorage.removeItem('cart')

            dispatch({ type: CLEAR_CART })
        }
    }
}

export const makeOrder = (selectedCard, selectedAddress, cb) => {
    return async (dispatch) => {
        try {
            const body = { card: selectedCard, address: selectedAddress }
            const { status } = await makeOrderRequest(body)

            if (status === 200) {
                dispatch({ type: MAKE_ORDER })
                cb()
            }
        } catch (error) {
            dispatch({ type: 'DO_NOT_HANDLE' })
        }
    }
}

export const decreaseProductQuantity = (productId, messagePopupRef, quantity = 1) => {
    return async (dispatch) => {
        const { data, status } = await decreaseProductQuantityRequest(productId, quantity)

        if (status === 200) {
            dispatch({
                type: DECREASE_PRODUCT_QUANTITY,
                payload: data,
            })

      messagePopupRef?.showMessage({ message: 'Ürün sepetinizden çıkarıldı.' })
        }
    }
}

export const increaseProductQuantity = (productId, messagePopupRef, quantity = 1) => {
    return async (dispatch) => {
        const { data, status } = await increaseProductQuantityRequest(productId, quantity)

        if (status === 200) {
            dispatch({
                type: INCREASE_PRODUCT_QUANTITY,
                payload: data,
            })

      messagePopupRef?.showMessage({ message: 'Ürün sepetinize eklendi.' })
        }
    }
}

export const setProductQuantity = (productId, quantity = 1) => {
    return async (dispatch) => {
        const { data, status } = await setProductQuantityRequest(productId, quantity)

        if (status === 200) {
            dispatch({
                type: SET_PRODUCT_QUANTITY,
                payload: {
                    ...data,
                    quantity,
                },
            })
        }
    }
}
