import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { setPaymentType } from '../actions/payment-actions'

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
		flex: 5,
		borderBottomWidth: '2@s',
		borderBottomColor: '#C3C3C3'
	},
	paymentInfoTextContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	paymentTitle: {
		fontSize: '17@s',
		marginVertical: '4@s',
	},
	paymentDetail: {
		fontSize: '14@s',
		marginVertical: '4@s'
	}
})

const mapDispatchToProps = {
	setPaymentType
}

export default connect(null, mapDispatchToProps)(PaymentType)