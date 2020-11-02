import {
    SET_REGION,
    SET_ADDRESS,
    SET_REGION_BY_PLACE,
    SET_CURRENT_REGION,
} from '../actions/map-actions'

const INITIAL_STATE = {
    region: {},
    address: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case SET_REGION:
    case SET_ADDRESS:
    case SET_REGION_BY_PLACE:
    case SET_CURRENT_REGION:
        return { ...state, ...action.payload }

    default:
        return state
    }
}
