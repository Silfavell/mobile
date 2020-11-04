/* eslint-disable no-param-reassign */
import {
    DECREASE_PRODUCT_QUANTITY,
    INCREASE_PRODUCT_QUANTITY,
    MAKE_ORDER,
    CLEAR_CART,
    SET_PRODUCT_QUANTITY
} from '../actions/cart-actions'
import { SET_INITIAL_DATAS } from '../actions/source-actions'

const INITIAL_STATE = {
    cart: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_INITIAL_DATAS:
            return { cart: { ...action.payload.cart } }

        case MAKE_ORDER:
        case CLEAR_CART:
            return { cart: {} }

        case DECREASE_PRODUCT_QUANTITY: {
            state.cart[action.payload._id].quantity = action.payload.quantity ?? state.cart[action.payload._id].quantity - 1
            if (state.cart[action.payload._id].quantity <= 0) {
                delete state.cart[action.payload._id]
            }

            return { cart: { ...state.cart } }
        }

        case INCREASE_PRODUCT_QUANTITY: {
            if (state.cart[action.payload._id]) {
                state.cart[action.payload._id].quantity = action.payload.quantity ?? state.cart[action.payload._id].quantity + 1

                return { cart: { ...state.cart } }
            }

            return {
                cart: {
                    ...state.cart,
                    [action.payload._id]: {
                        ...action.payload,
                        quantity: 1
                    }
                }
            }
        }

        case SET_PRODUCT_QUANTITY: {
            state.cart[action.payload._id] = action.payload

            if (action.payload.quantity <= 0) {
                delete state.cart[action.payload._id]
            }

            return { cart: { ...state.cart } }
        }

        default:
            return state
    }
}
