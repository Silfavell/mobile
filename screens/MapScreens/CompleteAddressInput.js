import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'
import { TextInput } from 'react-native'

import { setAddress } from '../../actions/map-actions'

// eslint-disable-next-line no-shadow
const CompleteAddressInput = ({ address, setAddress }) => (
	<TextInput
		value={address}
		onChangeText={setAddress}
		placeholder='Address'
		style={styles.input}
	/>
)

const styles = ScaledSheet.create({
	input: {
		flex: 1,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: '3@s',
		borderRadius: 8,
		borderColor: '#C3C3C3',
		paddingHorizontal: '13@s',
		fontSize: '17@s'
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
