import React from 'react'

import CartProduct from '../../components/CartProduct/CartProduct'
import ShadowContainerHoc from '../../components/ShadowContainerHoc/ShadowContainerHoc'

const CartProductWithHoc = (props) => (
    <CartProduct {...props} />
)

export default ShadowContainerHoc(CartProductWithHoc)
