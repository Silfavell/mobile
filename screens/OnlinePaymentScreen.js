import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native'
import { connect } from 'react-redux'

import FloatingInput from 'react-native-floating-labels'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { makeOrder } from '../actions/actions1'

class OnlinePaymentScreen extends React.PureComponent {
	state = {
		cardNumber: '4444 4444 4444 4444',
		expirationDate: '09/23',
		CVC2: '333'
	}

	makeOrder = () => {
		this.props.makeOrder(this.props.navigation)
	}

	onCardNumberChange = (cardNumber) => {
		this.setState({ cardNumber })
	}

	onExpirationDateChange = (expirationDate) => {
		this.setState({ expirationDate })
	}

	onCvcChange = (CVC2) => {
		this.setState({ CVC2 })
	}

	render() {
		const products = Object.values(this.props.cart)
		const totalPrice = products.reduce((previousValue, currentValue) => previousValue + parseFloat(currentValue.price) * currentValue.quantity, 0).toFixed(2)

		return (
			<View style={styles.container}>

				<View style={styles.paymentHeader}>
					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						<Text style={styles.totalPriceText}>Ödeme Tutarı</Text>
					</View>
					<View style={{ alignItems: 'center', justifyContent: 'center' }}>
						<Text style={styles.totalPrice}>{`${totalPrice} TL`}</Text>
					</View>
				</View>


				<View style={styles.cardInformationContainer}>
					<View style={styles.inputContainer}>
						<FloatingInput
							labelStyle={styles.labelInput}
							inputStyle={styles.input}
							style={styles.formInput}
							onChangeText={this.onCardNumberChange}
							value={this.state.cardNumber}
						>
							Kart Numarası *
						</FloatingInput>
					</View>

					<View style={styles.rowInputContainer}>
						<View style={styles.inputContainerChild}>
							<FloatingInput
								labelStyle={styles.labelInput}
								inputStyle={styles.input}
								style={styles.formInput}
								onChangeText={this.onExpirationDateChange}
								value={this.state.expirationDate}
							>
								Son Kullanma Tarihi *
							</FloatingInput>
						</View>

						<View style={styles.inputContainerChild}>
							<FloatingInput
								labelStyle={styles.labelInput}
								inputStyle={styles.input}
								style={styles.formInput}
								onChangeText={this.onCvcChange}
								value={this.state.CVC2}
							>
								Güvenlik Kodu (CVC2) *
							</FloatingInput>
						</View>
					</View>
				</View>

				<View style={styles.cvcInfoContainer}>
					<View style={styles.child} />
					<View style={styles.cvcInfoTextContainer}>
						<Text style={styles.cvcInfoText}>Kartınızın arka yüzünde bulunan 3 haneli sayı</Text>
					</View>
				</View>

				<View style={styles.informationContainer}>
					<View style={styles.child} />
					<View style={styles.informationTextContainer}>
						<View style={styles.infoIconContainer}><Ionicons name="md-information-circle-outline" size={28} /></View>
						<Text>Kredi kartı bilgileriniz Platform App tarafından tutulmamaktadır ödeme altyapısı Mastercard tarafından sağlanmaktadır.</Text>
					</View>
					<View style={styles.child} />
				</View>

				<TouchableOpacity
					onPress={this.makeOrder}
					style={styles.completePaymentContainer}
				>
					<Text style={styles.completePaymentText}>Siparişi Tamamla</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		top: 0,
		left: 0,
		height: 600,
		width: Dimensions.get('window').width,
		backgroundColor: '#EDEDED',
		display: 'flex'
	},
	paymentHeader: {
		flex: 0.16,
		backgroundColor: 'white',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: RFValue(4, 600) },
		shadowOpacity: 0.32,
		shadowRadius: RFValue(6, 600),
		elevation: 9
	},
	labelInput: {
		color: '#57A25A',
		fontSize: RFValue(14, 600)
	},
	inputContainerChild: {
		flex: 1
	},
	input: {
		borderWidth: 0,
		borderBottomWidth: 1.5,
		borderColor: '#333',
		color: 'black'
	},
	totalPriceText: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: 19
	},
	totalPrice: {
		color: 'black',
		fontWeight: 'bold',
		fontSize: RFValue(22, 600)
	},
	cardInformationContainer: {
		flex: 0.34,
		marginVertical: RFValue(24, 600)
	},
	inputContainer: {
		flex: 1,
		marginHorizontal: RFValue(12, 600)
	},
	rowInputContainer: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: RFValue(12, 600)
	},
	child: { flex: 1 },
	completePaymentContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 0.6,
		backgroundColor: '#D3D3D3',
		margin: RFValue(8, 600),
		borderRadius: 36
	},
	completePaymentText: {
		fontSize: RFValue(20, 600),
		fontWeight: 'bold',
		color: '#8D8D8D'
	},
	cvcInfoContainer: {
		flex: 0.1,
		flexDirection: 'row'
	},
	infoIconContainer: {
		margin: RFValue(8, 600)
	},
	cvcInfoTextContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	cvcInfoText: {
		fontSize: RFValue(13, 600),
		color: '#A5A5A5'
	},
	informationContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'row',
		flex: 0.1
	},
	informationTextContainer: {
		flex: 7,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	}
})

const mapStateToProps = ({
	reducer1: {
		cart
	}
}) => ({
	cart
})

const mapDispatchToProps = {
	makeOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(OnlinePaymentScreen)
