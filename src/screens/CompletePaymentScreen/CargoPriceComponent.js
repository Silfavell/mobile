import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'

import { COLORS } from '../../scripts/colors'

const CargoPriceComponent = ({ cart }) => {
    const products = Object.values(cart)
    const totalPrice = products.reduce(
        (previousValue, currentValue) => previousValue
      + parseFloat(currentValue.discountedPrice || currentValue.price) * currentValue.quantity,
        0
    )

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialIcons size={32} name='markunread-mailbox' color={COLORS.TERTIARY} />
            </View>
            <View style={styles.paymentInfoContainer}>
                <View style={styles.paymentInfoTextContainer}>
                    <Text style={styles.paymentTitle}>{totalPrice >= 85 ? 'Ücretsiz Kargo' : '15TL'}</Text>
                </View>
                {totalPrice < 85 && (
                    <View style={styles.paymentInfoTextContainer}>
                        <Text numberOfLines={2} style={styles.paymentDetail}>
                            85 TL ve üzeri alışverişlerinizde kargo bedava!
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.iconContainer} />
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row'
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '8@s',
        padding: '4@s',
        flex: 1
    },
    paymentInfoContainer: {
        flexDirection: 'column',
        marginHorizontal: '8@s',
        padding: '4@s',
        height: '72@s',
        flex: 5
    },
    paymentInfoTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    paymentTitle: {
        fontSize: '17@s',
        marginVertical: '4@s'
    },
    paymentDetail: {
        fontSize: '14@s',
        marginVertical: '4@s'
    }
})

const mapStateToProps = ({ cartReducer: { cart } }) => ({
    cart
})

export default connect(mapStateToProps)(CargoPriceComponent)
