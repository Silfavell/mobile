import { MAKE_FILTER, CLEAR_FILTER } from '../actions/filter-actions'

const INITIAL_STATE = {
    filter: null,
    filterCategory: -1,
    categorId: null,
    subCategoryId: null,
    selectedBrands: [],
    selectedSort: -1,
    selectedMinPrice: null,
    selectedMaxPrice: null,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case MAKE_FILTER:
    case CLEAR_FILTER: {
        return {
            ...state,
            ...action.payload,
        }
    }
    default:
        return state
    }
}
