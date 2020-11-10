import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { COLORS } from '../scripts/colors'

const CartIcon = ({ name, focused, cart }) => (
    <View>
        <Ionicons
            name={name}
            size={28}
            style={styles.iconContainer}
            color={focused ? COLORS.SECONDARY : COLORS.TERTIARY} />
        {Object.values(cart).length > 0 && (
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{Object.values(cart).length}</Text>
            </View>
        )}
    </View>
)

const styles = ScaledSheet.create({
    badge: {
        position: 'absolute',
        right: -10,
        top: 0,
        backgroundColor: COLORS.SECONDARY,
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    badgeText: {
        color: COLORS.SECONDARY,
        fontSize: '12@s'
    },
    iconContainer: {
        marginBottom: -3
    }
})

const mapStateToProps = ({ cartReducer: { cart } }) => ({
    cart
})

export default connect(mapStateToProps)(CartIcon)
