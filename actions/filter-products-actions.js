import axios from 'axios'
import { SERVER_URL } from '../utils/global'

export const MAKE_FILTER = 'MAKE_FILTER'
export const CLEAR_FILTER = 'CLEAR_FILTER'

export const makeFilter = (
    {
        categoryId = '',
        sortType = '',
        brands = ''
    },
    {
        filterCategory,
        selectedBrand,
        selectedSort
    },
    callback) => (dispatch) => {
        const url = `${SERVER_URL}/products-filter-with-categories?categoryId=${categoryId}&brands=${brands}&sortType=${sortType}`

        axios.get(url).then(({ status, data }) => {
            if (status === 200) {
                dispatch({
                    type: MAKE_FILTER,
                    payload: {
                        filteredProducts: data || [],
                        filterCategory,
                        selectedBrand,
                        selectedSort
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
            filteredProducts: [],
            filterCategory: -1,
            selectedBrand: -1,
            selectedSort: -1
        }
    })

    callback()
}