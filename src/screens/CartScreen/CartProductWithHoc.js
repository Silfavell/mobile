import React from 'react'

import CartProduct from '../../components/CartProduct'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'

const CartProductWithHoc = (props) => (
    <CartProduct {...props} />
)

export default ShadowContainerHoc(CartProductWithHoc)
