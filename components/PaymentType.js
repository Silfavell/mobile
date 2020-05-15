import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { setPaymentType } from '../actions/actions2'

const PaymentType = ({
	Id,
	title,
	detail,
	icon,
	navigation,
	// eslint-disable-next-line no-shadow
	setPaymentType
}) => {
	const onPaymentTypeClick = () => {
		setPaymentType(Id)
		navigation.goBack()
	}

	return (
		<TouchableOpacity style={styles.container} onPress={onPaymentTypeClick}>
			<View style={styles.iconContainer}>
				<Ionicons size={32} name={icon} />
			</View>
			<View style={styles.paymentInfoContainer}>
				<View style={styles.paymentInfoTextContainer}>
					<Text style={styles.paymentTitle}>{title}</Text>
				</View>
				<View style={styles.paymentInfoTextContainer}>
					<Text style={styles.paymentDetail}>{detail}</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row'
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: RFValue(8, 600),
		padding: RFValue(4, 600),
		flex: 1
	},
	paymentInfoContainer: {
		flexDirection: 'column',
		marginHorizontal: RFValue(8, 600),
		padding: RFValue(4, 600),
		height: RFValue(72, 600),
		flex: 5,
		borderBottomWidth: RFValue(2, 600),
		borderBottomColor: '#C3C3C3'
	},
	paymentInfoTextContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	paymentTitle: {
		fontSize: RFValue(17, 600),
		marginVertical: RFValue(4, 600),
	},
	paymentDetail: {
		fontSize: RFValue(14, 600),
		marginVertical: RFValue(4, 600)
	}
})

const mapDispatchToProps = {
	setPaymentType
}

export default connect(null, mapDispatchToProps)(PaymentType)
