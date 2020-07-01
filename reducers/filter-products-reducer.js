const INITIAL_STATE = {
    filteredProducts: [],
    filterCategory: -1,
    selectedBrand: -1,
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
