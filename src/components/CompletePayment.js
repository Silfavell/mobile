import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	View,
	TouchableOpacity,
	Text
} from 'react-native'
import { connect } from 'react-redux'

import { makeOrder } from '../actions/cart-actions'
import { setNeedToLoginPopupState } from '../actions/global-actions'

class CompletePaymentComponent extends React.Component {
	onCompletePaymentClick = () => {
		const {
			completable,
			token,
			navigation,
			makeOrder,
			selectedCard,
			selectedAddress,
			messagePopupRef,
			setNeedToLoginPopupState
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

	shouldComponentUpdate(nextProps) {
		if (Object.values(nextProps.cart).length === 1 || (Object.values(nextProps.cart).length === 0)) {
			return true
		}

		return false
	}

	render() {
		const products = Object.values(this.props.cart)
		let totalPrice = products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.discountedPrice || currentValue.price) * currentValue.quantity, 0)

		if (totalPrice < 85 && this.props.completable) {
			totalPrice += 15
		}

		return (
			<View style={styles.completePaymentContainer}>

				<View style={styles.totalPriceContainer}>
					<Text style={styles.totalPriceText}>
						{`Toplam: ${totalPrice.toFixed(2).replace('.', ',')} TL`}
					</Text>
				</View>

				<TouchableOpacity onPress={this.onCompletePaymentClick} style={styles.completePaymentButton}>
					<Text style={styles.completePaymentText}>SİPARİŞ VER</Text>
				</TouchableOpacity>

			</View>
		)
	}
}

const styles = ScaledSheet.create({
	centeredContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	completePaymentContainer: {
		position: 'absolute',
		bottom: 0,
		width: '100%',
		height: '65@s',
		backgroundColor: 'rgba(0,0,0,.7)',
		flexDirection: 'row'
	},
	completePaymentButton: {
		padding: '20@s',
		backgroundColor: 'rgba(0,0,0,.8)',
		alignItems: 'center',
		justifyContent: 'center'
	},
	completePaymentText: {
		color: 'white',
		fontSize: '16@s',
		fontWeight: 'bold'
	},
	totalPriceContainer: {
		flex: 2,
		justifyContent: 'center'
	},
	totalPriceText: {
		color: 'white',
		fontSize: '16@s',
		padding: '12@s',
		fontWeight: 'bold'
	}
})

const mapStateToProps = ({
	cartReducer: {
		cart
	},
	paymentReducer: {
		paymentType,
		selectedCard,
		selectedAddress
	},
	sourceReducer: {
		token
	},
	globalReducer: {
		messagePopupRef
	}
}) => ({
	cart,
	paymentType,
	selectedCard,
	selectedAddress,
	token,
	messagePopupRef
})

const mapDispatchToProps = {
	makeOrder,
	setNeedToLoginPopupState
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletePaymentComponent)
