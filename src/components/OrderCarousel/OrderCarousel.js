import React from 'react'

import ViewPager from '@react-native-community/viewpager'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'
import CartProduct from '../CartProduct/CartProduct'

class OrderCarousel extends React.PureComponent {
    render() {
        return (
            <ViewPager style={styles.paginator} initialPage={0} showPageIndicator>
                {
                    this.props.products.map((product) => (
                        <CartProduct
                        // key={`cartProduct:${}`}
                            data={product}
                            previousOrder />
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
        backgroundColor: COLORS.LIGHT,
        marginHorizontal: 3,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: COLORS.GRAY
    }
})

export default OrderCarousel
