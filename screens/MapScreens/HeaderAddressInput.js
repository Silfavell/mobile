import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'
import { View, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HeaderAddressInput = ({ address }) => (
	<View style={styles.container}>
		<Ionicons name='md-pin' size={32} color='rgba(0,0,0,.8)' />
		<TextInput style={styles.input} value={address} />
	</View>
)

const styles = ScaledSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		height: '56@s',
		left: 0,
		right: 0,
		backgroundColor: 'white',
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
		color: '#757B8B'
	}
})

const mapStateToProps = ({
	mapReducer: {
		address
	}
}) => ({
	address
})

export default connect(mapStateToProps)(HeaderAddressInput)
