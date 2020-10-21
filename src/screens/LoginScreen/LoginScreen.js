import React from 'react'
import { connect } from 'react-redux'
import {
	ScrollView,
	View,
	TouchableOpacity,
	Text
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import joi from 'react-native-joi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet } from 'react-native-size-matters'

import ButtonComponent from '../../components/ButtonComponent'
import InputComponent from '../../components/InputComponent'
import InputIcon from '../../components/InputIcon'

import { login } from '../../actions/source-actions'
import { bulkCart } from '../../scripts/requests'

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

	saveCart = async () => {
		const { cart, token } = this.props

		if (token && Object.values(cart).length > 0) {
			const { status, data } = await bulkCart(Object.values(cart).map(({ _id, quantity }) => ({ _id, quantity })))

			if (status === 200) {
				AsyncStorage.setItem('cart', JSON.stringify(data))
			}
		}
	}

	onLoginClick = () => {
		this.props.login({ phoneNumber: this.state.phoneNumber, password: this.state.password }, () => {
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
			.min(19)
			.max(19)
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
							placeholder: 'Telefon Numarası',
							maxLength: 19
						}}
						mask={'telephoneNumber'}
						invalid={this.state.invalidPhoneNumber && this.state.isPhoneNumberInitialized}
						value={this.state.phoneNumber}
						onChange={this.onPhoneChange}
					>
						<InputIcon>
							<Ionicons
								size={32}
								name='md-phone-portrait'
								color='rgba(0,0,0,.8)' />
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
								name='ios-key'
								color={
									this.state.invalidPassword && this.state.isPasswordInitialized ? '#EE4266' : 'rgba(0,0,0,.8)'
								}
								style={{ transform: [{ rotateY: '180deg' }, { rotateX: '180deg' }] }}
							/>
						</InputIcon>
					</InputComponent>

					<ButtonComponent
						disabled={
							this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
							|| this.state.invalidPassword || !this.state.isPasswordInitialized
						}
						text='Giriş Yap'
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
					<ButtonComponent text='Kayıt Ol' onClick={this.goToRegister} opposite />
				</View>
			</ScrollView>
		)
	}
}

const styles = ScaledSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		marginBottom: 12
	},
	child: {
		height: '60@vs',
		margin: 3
	},
	facebookButton: {
		backgroundColor: '#3B589E',
		flex: 1,
		margin: '4@s',
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
		margin: '4@s',
		zIndex: -1,
		borderRadius: 6,
		paddingHorizontal: '12@s',
		fontSize: '18@s',
		borderWidth: 0.8,
		borderColor: '#ABABAB'
	},
	facebookText: {
		color: 'white',
		fontSize: '18@s'
	},
	forgotPasswordText: {
		color: '#6E7586',
		fontSize: '18@s',
		fontWeight: 'bold'
	},
	empty: {
		height: '28@vs'
	},
	buttonDivider: {
		height: '22@vs',
		backgroundColor: '#EDEEF0'
	},
	view: {
		justifyContent: 'flex-end',
		margin: 0
	}
})

const mapStateToProps = ({
	cartReducer: {
		cart
	},
	sourceReducer: {
		token
	}
}) => ({
	cart,
	token
})

const mapDispatchToProps = {
	login
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)