import React from 'react'

import { FlatList, View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import CartProduct from '../../components/CartProduct'
import CompletePayment from '../../components/CompletePayment'
import { COLORS } from '../../scripts/colors'
import CartProductWithHoc from './CartProductWithHoc'

class CartScreen extends React.Component {
    products = Object.values(this.props.cart);

    shouldComponentUpdate(nextProps) {
        // nextProps.cart and this.props.cart refers to same object that's what im using products.length for previousProps
        if (Object.values(nextProps.cart).length !== this.products.length) {
            return true
        }

        return false
    }

    renderCartProductItem = ({ item, index }) => {
        if (index === this.products.length - 1) {
            return <CartProductWithHoc data={item} />
        }

        return <></>
    }

    keyExtractor = (item) => `cart${item._id}`;

    renderCartProductItem = ({ item, index }) => {
        if (index === this.products.length - 1) {
            return <CartProductWithHoc data={item} />
        }

        return <CartProduct data={item} />
    }

    render() {
        this.products = Object.values(this.props.cart)

        if (this.products.length > 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        style={styles.flatListStyle}
                        data={this.products}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderCartProductItem} />
                    <CompletePayment navigation={this.props.navigation} />
                </View>
            )
        }

        return (
            <View style={styles.emptyContainer}>
                <Ionicons name='md-basket' size={96} color={COLORS.PRIMARY} />
                <Text style={styles.emptyText}>Sepetinizde ürün bulunmamaktadır</Text>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '65@s'
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.GRAY
    },
    emptyText: {
        marginTop: 32,
        fontSize: '18@s',
        textAlign: 'center',
        color: COLORS.DARK
    },
    child: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    listProductsButtonContainer: {
        display: 'flex'
    },
    listProducts: {
        backgroundColor: COLORS.TERTIARY,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '18@s',
        padding: '18@s',
        paddingHorizontal: '48@s'
    },
    listProductsText: {
        color: COLORS.LIGHT,
        fontSize: '19@s',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        height: '65@s',
        backgroundColor: 'transparent'
    },
    flatListStyle: {
        backgroundColor: COLORS.GRAY
    }
})

const mapStateToProps = ({ cartReducer: { cart } }) => ({
    cart
})

export default connect(mapStateToProps)(CartScreen)
