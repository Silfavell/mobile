import React from 'react'

import { View, TextInput } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { COLORS } from '../../scripts/colors'

const HeaderAddressInput = ({ address, disabled }) => (
    <View style={styles.container}>
        <Ionicons name='md-pin' size={32} color={COLORS.TERTIARY} />
        <TextInput style={styles.input} value={address} editable={!disabled} />
    </View>
)

const styles = ScaledSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        height: '56@s',
        left: 0,
        right: 0,
        backgroundColor: COLORS.LIGHT,
        zIndex: '2@s',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        margin: '18@s',
        paddingHorizontal: '12@s'
    },
    input: {
        margin: '8@s',
        marginHorizontal: '4@s',
        flex: 1,
        fontSize: '19@s',
        padding: '8@s',
        paddingHorizontal: '8@s',
        color: COLORS.GRAY
    }
})

const mapStateToProps = ({ mapReducer: { address } }) => ({
    address
})

export default connect(mapStateToProps)(HeaderAddressInput)
