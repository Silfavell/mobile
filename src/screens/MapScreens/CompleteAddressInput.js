import React from 'react'

import { TextInput } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import { setAddress } from '../../actions/map-actions'
import { COLORS } from '../../scripts/colors'

const CompleteAddressInput = ({ address, setAddress }) => (
    <TextInput
        value={address}
        multiline
        textAlignVertical='top'
        numberOfLines={4}
        onChangeText={setAddress}
        placeholder='Address'
        style={styles.input} />
)

const styles = ScaledSheet.create({
    input: {
        flex: 1,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '3@s',
        borderRadius: 8,
        borderColor: COLORS.GRAY,
        paddingHorizontal: '13@s',
        fontSize: '17@s'
    }
})

const mapStateToProps = ({ mapReducer: { region, address } }) => ({
    region,
    address
})

const mapDispatchToProps = {
    setAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteAddressInput)
