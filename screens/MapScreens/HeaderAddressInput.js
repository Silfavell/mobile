import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { connect } from 'react-redux'
import { View, TextInput, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const HeaderAddressInput = ({ address }) => (
	<View style={styles.container}>
		<Ionicons name="md-pin" size={32} color="#DB0099" />
		<TextInput style={styles.input} value={address} />
	</View>
)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		height: RFValue(56, 600),
		left: 0,
		right: 0,
		backgroundColor: 'white',
		zIndex: RFValue(2, 600),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 10,
		margin: RFValue(18, 600),
		paddingHorizontal: RFValue(12, 600)
	},
	input: {
		margin: RFValue(8, 600),
		marginHorizontal: RFValue(4, 600),
		flex: 1,
		fontSize: RFValue(19, 600),
		padding: RFValue(8, 600),
		paddingHorizontal: RFValue(8, 600),
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
