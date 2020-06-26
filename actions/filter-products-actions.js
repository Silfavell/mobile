import axios from 'axios'
import { SERVER_URL } from '../utils/global'

export const MAKE_FILTER = 'MAKE_FILTER'

export const makeFilter = ({ categoryId = '', subCategoryId = '', sortType = '', brands = '' }, filterCategory, filterPage, callback) => (dispatch) => {
    axios.get(`${SERVER_URL}/products-filter?categoryId=${categoryId}&subCategoryId=${subCategoryId}&brands=${brands}&sortType=${sortType}`)
        .then(({ status, data }) => {
            if (status === 200) {
                dispatch({
                    type: MAKE_FILTER,
                    payload: {
                        filteredProducts: data || [],
                        filterCategory,
                        filterPage
                    }
                })
                callback()
            }
        })
}