import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import Config from 'react-native-config'

const instance = axios.create({
    baseURL: Config.SERVER_URL
})

instance.interceptors.request.use(async function (options) {
    const token = await AsyncStorage.getItem('token')

    if (token) {
        options.headers['Authorization'] = token
    }

    return options
})

export const makeCustomRequest = ({
    method,
    url,
    data
}) => {
    return instance({
        method,
        url,
        data
    })
}

export const getCategories = () => instance.get('/categories')

export const fetchShop = (productIds) => instance.get(`/filter-shop?${productIds}&quantity=32`)

export const getCartProducts = () => instance.get('/user/cart')

export const fetchOfflineCartProducts = () => {
    const url = `/filter-shop?${JSON.parse(window.localStorage.getItem('cart')).map((cartProduct) => `productIds=${cartProduct._id}`).join('&')}`

    return instance.get(url)
}

export const increaseProductQuantity = (productId, quantity) => instance.put(`/add-product/${productId}`, { quantity })

export const decreaseProductQuantity = (productId, quantity) => instance.put(`/deduct-product/${productId}`, { quantity })

export const setProductQuantity = (productId, quantity) => instance.put(`/set-product/${productId}`, { quantity })

export const search = (search) => instance.get(`/search-product?name=${search}`)

export const listFavorites = (_id) => instance.get('/user/favorite-products', { _id })

export const addFavorite = (_id) => instance.post('/user/favorite-product', { _id })

export const removeFavorite = (_id) => instance.delete(`/user/favorite-product/${_id}`)

export const postTicket = (data) => instance.post('/ticket', data)

export const getProfile = () => instance.get('/user/profile')

export const updateProfile = (data) => instance.put('/user/profile', data)

export const signUp = (data) => instance.post('/register', data)

export const sendActivationCode = (data) => instance.post('/send-activation-code', data)

export const bulkCart = (data) => instance.post('/user/cart', data)

export const clearCart = () => instance.delete('/user/cart')

export const getBestSellerProducts = () => instance.get('/best-seller')

export const changePassword = (data) => instance.put('/user/change-password', data)

export const login = (data) => instance.post('/login', data)

export const saveComment = (data) => instance.post('/user/save-comment', data)

export const resetPassword = (data) => instance.put('/reset-password', data)

export const likeComment = (_id) => instance.put(`/user/like-comment/${_id}`)

export const unlikeComment = (_id) => instance.put(`/user/remove-like-comment/${_id}`)

export const getProductBySlug = (slug, fromSearch) => instance.get(`/product/${slug}?fromSearch=${fromSearch}`)

export const getRelatedProductsBySlug = (slug) => instance.get(`/related-products/${slug}`)

export const deleteAddress = (_id) => instance.delete(`/user/address/${_id}`)

export const saveAddress = (data) => instance.post('/user/address', data)

export const getOrderById = (_id) => instance.get(`/user/order/${_id}`)

export const listCards = () => instance.get('/user/list-cards')

export const addCard = (data) => instance.post('/user/payment-card', data)

export const removeCard = (data) => instance.put('/user/payment-card', data)

export const makeOrder = (data) => instance.post('/user/order', data)

export const getOrders = () => instance.get('/user/orders')

export const returnItems = (orderId, items) => instance.post(`/user/return-items/${orderId}`, items)

export const mobileInitializer = () => instance.get('/mobile-initializer')

export const getVersion = () => instance.get('/version')