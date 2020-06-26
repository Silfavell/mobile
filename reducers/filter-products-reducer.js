const INITIAL_STATE = {
    filteredProducts: [],
    filterCategory: -1,
    filterPage: -1
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
