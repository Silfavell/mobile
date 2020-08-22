import React from 'react'
import ViewPager from '@react-native-community/viewpager'
import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import CartProduct from './CartProduct'

class OrderCarousel extends React.Component {
    render() {
        return (
            <ViewPager style={styles.paginator} initialPage={0} showPageIndicator>
                {
                    this.props.item.products.map((product, index) => (
                        <CartProduct data={product} previousOrder />
                    ))
                }
            </ViewPager>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        height: '100%'
    },
    viewPager: {
        flex: 1
    },
    paginator: {
        height: '210@s'
    },
    dotContainer: {
        zIndex: 1000,
        opacity: 0.8,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    dot: {
        width: 20,
        height: 4,
        backgroundColor: 'white',
        marginHorizontal: 3,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#CDCDCD'
    }
})

export default OrderCarousel