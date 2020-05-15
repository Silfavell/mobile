import React from 'react'
import { connect } from 'react-redux'
import {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	AsyncStorage,
	StyleSheet
} from 'react-native'
import axios from 'axios'
import { RFValue } from 'react-native-responsive-fontsize'
import joi from 'react-native-joi'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { SERVER_URL } from '../utils/global'
import { login } from '../actions/actions4'
import ButtonComponent from '../components/ButtonComponent'
import InputComponent from '../components/InputComponent'
import InputIcon from '../components/InputIcon'

class LoginScreen extends React.Component {
	state = {
		// countryCode: '+90',
		phoneNumber: '',
		password: '',

		invalidPhoneNumber: false,
		invalidPassword: false,

		isPhoneNumberInitialized: false,
		isPasswordInitialized: false
	}

	shouldComponentUpdate = (nextProps, nextState) => ( // Update only state change, not props
		this.state.phoneNumber !== nextState.phoneNumber
		|| this.state.password !== nextState.password
	)

	saveCart = () => {
		const { cart, token } = this.props
		if (token && Object.values(cart).length > 0) {
			const url = `${SERVER_URL}/user/cart`

			axios.post(url, Object.values(cart).map(({ _id, quantity }) => ({ _id, quantity })))
				.then(({ status, data }) => {
					if (status === 200) {
						AsyncStorage.setItem('cart', JSON.stringify(data))
					}
				})
		}
	}

	onLoginClick = () => {
		this.props.login({ phoneNumber: this.state.phoneNumber, password: this.state.password }, this.props.messagePopupRef, () => {
			this.saveCart()
			this.props.navigation.navigate('Loading', { next: true })
		})
	}

	goToRegister = () => {
		this.props.navigation.navigate('register')
	}

	goToForgotPassword = () => {
		this.props.navigation.navigate('forgotPassword')
	}

	onPhoneChange = (phoneNumber) => {
		joi.string()
			.trim()
			.strict()
			.min(10)
			.max(10)
			.validate(phoneNumber, (err) => {
				this.setState({ phoneNumber, isPhoneNumberInitialized: true, invalidPhoneNumber: !!err })
			})
	}

	onPasswordChange = (password) => {
		joi.string()
			.alphanum()
			.min(4)
			.validate(password, (err) => {
				this.setState({ password, isPasswordInitialized: true, invalidPassword: !!err })
			})
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>

				<View>
					<InputComponent
						options={{
							keyboardType: 'phone-pad',
							textContentType: 'telephoneNumber',
							placeholder: 'Telefon numarası',
							maxLength: 10
						}}
						invalid={this.state.invalidPhoneNumber && this.state.isPhoneNumberInitialized}
						value={this.state.phoneNumber}
						onChange={this.onPhoneChange}
					>
						<InputIcon>
							<Text style={{ color: 'black', fontSize: RFValue(18, 600) }}>90</Text>
						</InputIcon>
					</InputComponent>

					<InputComponent
						options={{
							secureTextEntry: true,
							textContentType: 'password',
							placeholder: 'Şifre (en az 4 karakter)',
						}}
						invalid={this.state.invalidPassword && this.state.isPasswordInitialized}
						value={this.state.password}
						onChange={this.onPasswordChange}
					>
						<InputIcon>
							<Ionicons
								size={32}
								name="md-lock"
								color={
									this.state.invalidPassword && this.state.isPasswordInitialized ? 'red' : '#DB0099'
								}
							/>
						</InputIcon>

					</InputComponent>

					<ButtonComponent
						disabled={
							this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
							|| this.state.invalidPassword || !this.state.isPasswordInitialized
						}
						text="Giriş yap"
						onClick={this.onLoginClick}
					/>

					<View style={styles.child}>
						<TouchableOpacity style={styles.forgotPasswordButton} onPress={this.goToForgotPassword}>
							<Text style={styles.forgotPasswordText}>Şifremi unuttum</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View>
					<View style={styles.buttonDivider} />

					<ButtonComponent text="Kayıt ol" onClick={this.goToRegister} opposite />
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		marginBottom: 12
	},
	child: {
		height: RFValue(60, 600),
		margin: RFValue(3, 600)
	},
	facebookButton: {
		backgroundColor: '#3B589E',
		flex: 1,
		margin: RFValue(4, 600),
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	forgotPasswordButton: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputContainer: {
		flexDirection: 'row'
	},
	input: {
		flex: 1,
		margin: RFValue(4, 600),
		zIndex: -1,
		borderRadius: 6,
		paddingHorizontal: RFValue(12, 600),
		fontSize: RFValue(18, 600),
		borderWidth: 0.8,
		borderColor: '#ABABAB'
	},
	facebookText: {
		color: 'white',
		fontSize: RFValue(18, 600)
	},
	forgotPasswordText: {
		color: '#6E7586',
		fontSize: RFValue(18, 600),
		fontWeight: 'bold'
	},
	empty: {
		height: RFValue(28, 600)
	},
	buttonDivider: {
		height: RFValue(22, 600),
		backgroundColor: '#EDEEF0'
	},
	view: {
		justifyContent: 'flex-end',
		margin: 0
	}
})

const mapStateToProps = ({
	reducer1: {
		cart
	},
	reducer4: {
		token
	},
	globalReducer: {
		messagePopupRef
	}
}) => ({
	cart,
	token,
	messagePopupRef
})

const mapDispatchToProps = {
	login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
