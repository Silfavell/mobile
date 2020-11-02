import { makeCustomRequest } from '../scripts/requests'

export const MAKE_FILTER = 'MAKE_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export const makeFilter = (
    { categoryId, subCategoryId, sortType = 0, minPrice, maxPrice, brandsAsString },
    { filterCategory, selectedBrands, selectedSort },
    callback,
) => {
    return async (dispatch) => {
        let url = `/products-filter-mobile?categoryId=${categoryId}&subCategoryId=${subCategoryId}&sortType=${sortType}${brandsAsString}`
        if (minPrice && maxPrice) {
            url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`
        }

        const { status, data } = await makeCustomRequest('GET', url)

        if (status === 200) {
            dispatch({
                type: MAKE_FILTER,
                payload: {
                    filter: data, // TODO hiç bir produst eşlemeyebilir hataya neden olur.
                    filterCategory,
                    categoryId,
                    subCategoryId,
                    selectedBrands,
                    selectedSort,
                    selectedMinPrice: minPrice,
                    selectedMaxPrice: maxPrice,
                },
            })
            callback()
        }
    }
}

export const clearFilter = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_FILTER,
            payload: {
                filter: null,
                filterCategory: -1,
                categorId: null,
                subCategoryId: null,
                selectedBrands: [],
                selectedSort: -1,
                selectedMinPrice: null,
                selectedMaxPrice: null,
            },
        })
    }
}
