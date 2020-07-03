const INITIAL_STATE = {
    filteredProducts: [],
    filterCategory: -1,
    brands: [],
    selectedSort: -1
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}
