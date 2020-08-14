const INITIAL_STATE = {
    filter: null,
    filterCategory: -1,
    categorId: null,
    subCategoryId: null,
    selectedBrands: [],
    selectedSort: -1,
    selectedMinPrice: null,
    selectedMaxPrice: null
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
