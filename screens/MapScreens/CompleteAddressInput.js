import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { connect } from 'react-redux'
import { TextInput, StyleSheet } from 'react-native'

import { setAddress } from '../../actions/map-actions'

// eslint-disable-next-line no-shadow
const CompleteAddressInput = ({ address, setAddress }) => (
	<TextInput
		value={address}
		onChangeText={setAddress}
		placeholder="Address"
		style={styles.input}
	/>
)

const styles = StyleSheet.create({
	input: {
		flex: 1,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: RFValue(3, 600),
		borderRadius: 8,
		borderColor: '#C3C3C3',
		paddingHorizontal: RFValue(13, 600),
		fontSize: RFValue(17, 600)
	},
})

const mapStateToProps = ({
	mapReducer: {
		region,
		address
	}
}) => ({
	region,
	address
})

const mapDispatchToProps = {
	setAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteAddressInput)
