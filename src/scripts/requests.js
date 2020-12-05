import { instance } from './axios'

export const makeCustomRequest = ({
    method,
    url,
    data
}) => instance({
    method,
    url,
    data
})

export const getCategories = () => instance.get('/categories/as-map?filter=true')

export const fetchShop = (productIds) => instance.get(`/products/filter-shop?${productIds}&quantity=32`)

export const getCartProducts = () => instance.get('/cart')

export const fetchOfflineCartProducts = () => {
    const url = `/products/filter-shop?${JSON.parse(window.localStorage.getItem('cart')).map((cartProduct) => `productIds=${cartProduct._id}`).join('&')}`

    return instance.get(url)
}

export const increaseProductQuantity = (productId, quantity) => instance.put(`/products/add-quantity/${productId}`, { quantity })

export const decreaseProductQuantity = (productId, quantity) => instance.put(`/products/deduct-quantity/${productId}`, { quantity })

export const setProductQuantity = (productId, quantity) => instance.put(`/products/set-quantity/${productId}`, { quantity })

export const search = (search) => instance.get(`/products/search?name=${search}`)

export const listFavorites = () => instance.get('/products/favorites')

export const addFavorite = (productId) => instance.post('/products/favorites', { _id: productId })

export const removeFavorite = (productId) => instance.delete(`/products/favorites/${productId}`)

export const postTicket = (data) => instance.post('/tickets', data)

export const getProfile = () => instance.get('/user/profile')

export const updateProfile = (data) => instance.put('/user/profile', data)

export const signUp = (data) => instance.post('/auth/register', data)

export const sendActivationCode = (data) => instance.post('/auth/send-activation-code', data)

export const bulkCart = (data) => instance.post('/cart', data)

export const clearCart = () => instance.delete('/cart')

export const getBestSellerProducts = () => instance.get('/products/best-seller')

export const changePassword = (data) => instance.put('/auth/change-password', data)

export const login = (data) => instance.post('/auth/login', data)

export const saveComment = (data) => instance.post('/comments', data)

export const resetPassword = (data) => instance.put('/auth/reset-password', data)

export const likeComment = (likeId) => instance.put(`/comments/like/${likeId}`)

export const unlikeComment = (likeId) => instance.put(`/comment/remove-like/${likeId}`)

export const getProductBySlug = (productSlug, fromSearch) => instance.get(`/products/${productSlug}?fromSearch=${fromSearch}`)

export const getRelatedProductsBySlug = (productSlug) => instance.get(`/products/${productSlug}/related-products`)

export const deleteAddress = (addressId) => instance.delete(`/user/address/${addressId}`)

export const saveAddress = (data) => instance.post('/user/address', data)

export const getOrderById = (orderId) => instance.get(`/orders/${orderId}`)

export const listCards = () => instance.get('/cards')

export const addCard = (data) => instance.post('/cards', data)

export const removeCard = (cardToken) => instance.delete(`/cards/${cardToken}`)

export const makeOrder = (data) => instance.post('/orders', data)

export const getOrders = () => instance.get('/orders')

export const returnItems = (orderId, items) => instance.post(`/orders/return-items/${orderId}`, items)

export const mobileInitializer = () => instance.get('/mobile/initialize')

export const getVersion = () => instance.get('/mobile/version')
