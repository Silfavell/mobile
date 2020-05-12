import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View, TouchableOpacity, Text, StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'

import { makeOrder } from '../actions/actions1'
import { setNeedToLoginPopupState } from '../actions/global-actions'

class CompletePaymentComponent extends React.PureComponent {
	onCompletePaymentClick = () => {
		const {
			// eslint-disable-next-line no-shadow
			completable, token, navigation, makeOrder, selectedCard, selectedAddress, messagePopupRef, setNeedToLoginPopupState,
		} = this.props

		if (token) {
			if (completable) {
				if (selectedCard && selectedAddress) {
					makeOrder(selectedCard, selectedAddress, () => {
						navigation.navigate('thanksScreen')
					})
				} else if (!selectedAddress) {
					messagePopupRef.showMessage({ message: 'Lütfen adres seçiniz' })
				} else {
					messagePopupRef.showMessage({ message: 'Lütfen kart seçiniz' })
				}
			} else {
				navigation.navigate('completePayment')
			}
		} else {
			setNeedToLoginPopupState(true)
		}
	}

	render() {
		const products = Object.values(this.props.cart)
		const totalPrice = products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

		return (
			<View style={styles.completePaymentContainer}>

				<View style={styles.totalPriceContainer}>
					<Text style={styles.totalPriceText}>
						{`Toplam: ${totalPrice} TL`}
					</Text>
				</View>

				<TouchableOpacity onPress={this.onCompletePaymentClick} style={styles.completePaymentButton}>
					<Text style={styles.completePaymentText}>SİPARİŞ VER</Text>
				</TouchableOpacity>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	centeredContainer: {
		flex: 1, alignItems: 'center', justifyContent: 'center'
	},
	completePaymentContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: RFValue(65, 600),
		backgroundColor: '#E04299',
		flexDirection: 'row',
	},
	completePaymentButton: {
		flex: 1,
		padding: RFValue(20, 600),
		backgroundColor: '#DB0099',
		alignItems: 'center',
		justifyContent: 'center',
	},
	completePaymentText: { color: 'white', fontSize: RFValue(17, 600), fontWeight: 'bold' },
	totalPriceContainer: { flex: 2, justifyContent: 'center' },
	totalPriceText: {
		color: 'white',
		fontSize: RFValue(17, 600),
		padding: RFValue(12, 600),
		fontWeight: 'bold',
	},
})

const mapStateToProps = ({
	reducer1: {
		cart,
	},
	reducer2: {
		paymentType,
		selectedCard,
		selectedAddress,
	},
	reducer4: {
		token,
	},
	globalReducer: {
		messagePopupRef,
	},
}) => ({
	cart,
	paymentType,
	selectedCard,
	selectedAddress,
	token,
	messagePopupRef,
})

const mapDispatchToProps = {
	makeOrder,
	setNeedToLoginPopupState,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletePaymentComponent)
