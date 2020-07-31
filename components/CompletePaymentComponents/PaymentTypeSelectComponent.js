import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ShadowContainer from '../ShadowContainer'

const PaymentTypeSelectComponent = ({
	navigation,
	title,
	token,
	setNeedToLoginPopupState
}) => (
		<ShadowContainer>
			<TouchableOpacity
				style={styles.container}
				onPress={() => {
					if (!token) {
						setNeedToLoginPopupState(true)
					} else {
						navigation.navigate('paymentOptionsScreen')
					}
				}}
			>
				<View style={styles.iconContainer}>
					<Ionicons size={32} name='ios-wallet' />
				</View>
				<View style={styles.paymentInfoContainer}>
					<View style={styles.paymentInfoTextContainer}>
						<Text numberOfLines={1} style={styles.paymentTitle}>{title}</Text>
					</View>
				</View>
				<View style={styles.iconContainer}>
					<MaterialIcons color='#ACACAC' size={32} name='chevron-right' />
				</View>
			</TouchableOpacity>
		</ShadowContainer>
	)

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
		flex: 5
	},
	paymentInfoTextContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	paymentTitle: {
		fontSize: '17@s',
		marginVertical: '4@s'
	},
	paymentDetail: {
		fontSize: '17@s',
		marginVertical: '4@s'
	},
})

export default PaymentTypeSelectComponent
