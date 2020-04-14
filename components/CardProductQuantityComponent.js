import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { connect } from 'react-redux'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

import { decreaseProductQuantity, increaseProductQuantity } from '../actions/actions1'

const CardProductQuantityComponent = ({ id, cart, decreaseProductQuantity, increaseProductQuantity }) => (
    <React.Fragment>
        <TouchableOpacity onPress={() => { decreaseProductQuantity(id) }} style={[styles.child, styles.decreaseButton]}>
            <Text style={styles.quantityButton}>{'-'}</Text>
        </TouchableOpacity>

        <View style={[styles.child, styles.quantityContainer]}>
            <Text style={styles.quantityText}>{cart[id].quantity}</Text>
        </View>

        <TouchableOpacity onPress={() => { increaseProductQuantity(id) }} style={[styles.child, styles.increaseButton]}>
            <Text style={styles.quantityButton}>{'+'}</Text>
        </TouchableOpacity>
    </React.Fragment>
)

const styles = StyleSheet.create({
    child: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    quantityContainer: { backgroundColor: '#5D3EBD', padding: RFValue(4, 600) },
    quantityButton: { color: '#5D3EBD', fontSize: RFValue(18, 600) },
    quantityText: { color: 'white', fontSize: RFValue(18, 600) },
    decreaseButton: {
        padding: RFValue(4, 600), borderTopLeftRadius: RFValue(10, 600),
        borderBottomLeftRadius: RFValue(10, 600)
    },
    increaseButton: {
        padding: RFValue(4, 600), borderTopRightRadius: RFValue(10, 600),
        borderBottomRightRadius: RFValue(10, 600)
    }
})

const mapStateToProps = ({
    reducer1: {
        cart
    }
}) => ({
    cart
})

const mapDispatchToProps = {
    decreaseProductQuantity,
    increaseProductQuantity
}

export default connect(mapStateToProps, mapDispatchToProps)(CardProductQuantityComponent)