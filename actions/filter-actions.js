import axios from 'axios'
import { SERVER_URL } from '../utils/global'

export const MAKE_FILTER = 'MAKE_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export const makeFilter = (
    {
        categoryId,
        subCategoryId,
        sortType = 0,
        minPrice,
        maxPrice,
        brandsAsString
    },
    {
        filterCategory,
        selectedBrands,
        selectedSort
    },
    callback) => (dispatch) => {
        let url = `${SERVER_URL}/products-filter-mobile?categoryId=${categoryId}&subCategoryId=${subCategoryId}&sortType=${sortType}${brandsAsString}`
        if (minPrice && maxPrice) {
            url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`
        }

        axios.get(url).then(({ status, data }) => {
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
                        selectedMaxPrice: maxPrice
                    }
                })

                callback()
            }
        })
    }

export const clearFilter = (callback) => (dispatch) => {
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
            selectedMaxPrice: null
        }
    })

    callback()
}