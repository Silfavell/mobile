import { MAKE_ORDER } from '../actions/cart-actions'
import {
    SAVE_CARD,
    DELETE_CARD,
    DELETE_ADDRESS,
    SAVE_ADDRESS,
    SET_SELECTED_ADDRESS,
    SET_SELECTED_CARD,
    SET_PAYMENT_TYPE
} from '../actions/payment-actions'
import { SET_INITIAL_DATAS, LOGOUT, SET_USER } from '../actions/source-actions'

const INITIAL_STATE = {
    paymentType: 0,
    cards: [],
    addresses: [],
    selectedCard: null,
    selectedAddress: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MAKE_ORDER:
            return { ...state, selectedCard: null, selectedAddress: null }

        case LOGOUT:
            return { ...state, addresses: [] }

        case SET_USER:
        case SET_INITIAL_DATAS:
            return {
                ...state,
                addresses: action.payload?.user?.addresses ?? [],
                cards: action.payload?.cards ?? []
            }

        case SAVE_CARD: {
            state.cards.push(action.payload.card)

            return { ...state, cards: [...state.cards] }
        }

        case DELETE_CARD: {
            state.cards.splice(
                state.cards.indexOf(
                    state.cards.find((card) => card.cardToken === action.payload.cardToken)
                ),
                1
            )

            return { ...state, cards: [...state.cards], selectedCard: null }
        }

        case DELETE_ADDRESS:
            return { ...state, ...action.payload, selectedAddress: null }

        case SAVE_ADDRESS:
        case SET_SELECTED_ADDRESS:
        case SET_SELECTED_CARD:
        case SET_PAYMENT_TYPE:
            return { ...state, ...action.payload }

        default:
            return state
    }
}
