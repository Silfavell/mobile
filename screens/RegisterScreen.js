import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	ScrollView,
	View,
	StyleSheet,
	Text
} from 'react-native'
import axios from 'axios'
import Ionicons from 'react-native-vector-icons/Ionicons'
import joi from 'react-native-joi'

import { SERVER_URL } from '../utils/global'
import ButtonComponent from '../components/ButtonComponent'
import InputComponent from '../components/InputComponent'
import InputIcon from '../components/InputIcon'


class RegisterScreen extends React.PureComponent {
	state = {
		// countryCode: '+90',
		phoneNumber: '',
		password: '',
		nameSurname: '',
		email: '',

		invalidPhoneNumber: false,
		invalidPassword: false,
		invalidNameSurname: false,
		invalidEmail: false,

		isPhoneNumberInitialized: false,
		isPasswordInitialized: false,
		isNameSurnameInitialized: false,
		isEmailInitialized: false
	}

	onRegisterClick = () => {
		const url = `${SERVER_URL}/send-activation-code`

		axios.post(url, {
			phoneNumber: this.state.phoneNumber,
			activationCodeType: 0 // REGISTER
		}).then(({ status }) => {
			if (status === 202) {
				this.props.navigation.navigate('activationScreen', {
					phoneNumber: this.state.phoneNumber,
					password: this.state.password,
					nameSurname: this.state.nameSurname,
					email: this.state.email
				})
			}
		})
	}

	/*
    joi.object({
        phoneNumber: joi.string().trim().strict().min(10).required(),
        password: joi.string().alphanum().min(4).required(),
        nameSurname: joi.string().required(),
        email: joi.string().trim().strict().email().required()
    })
    */

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
			.min(4)
			.validate(password, (err) => {
				this.setState({ password, isPasswordInitialized: true, invalidPassword: !!err })
			})
	}

	onNameSurnameChange = (nameSurname) => {
		joi.string()
			.trim()
			.validate(nameSurname, (err) => {
				this.setState({ nameSurname, isNameSurnameInitialized: true, invalidNameSurname: !!err })
			})
	}

	onEmailChange = (email) => {
		joi.string()
			.trim()
			.strict()
			.email()
			.validate(email, (err) => {
				this.setState({ email, isEmailInitialized: true, invalidEmail: !!err })
			})
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View>
					{
						//  <View style={styles.child}>
						//      <TouchableOpacity
						//          style={styles.facebookButton}
						//          onPress={() => {
						//              console.log('Connect with Facebook')
						//          }}>
						//          <Text style={styles.facebookText}>Connect with Facebook</Text>
						//      </TouchableOpacity>
						//  </View>
					}

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
							<Text style={{ color: 'rgba(0,0,0,.8)', fontSize: RFValue(18, 600) }}>90</Text>
						</InputIcon>
					</InputComponent>

					<InputComponent
						options={{
							secureTextEntry: true,
							textContentType: 'password',
							placeholder: 'Şifre (en az 4 karakter)'
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
									this.state.invalidPassword && this.state.isPasswordInitialized ? 'red' : 'rgba(0,0,0,.8)'
								}
								style={{ transform: [{ rotateY: '180deg' }, { rotateX: '180deg' }] }}
							/>
						</InputIcon>

					</InputComponent>

					<InputComponent
						options={{
							textContentType: 'name',
							placeholder: 'Ad soyad'
						}}
						invalid={this.state.invalidNameSurname && this.state.isNameSurnameInitialized}
						value={this.state.nameSurname}
						onChange={this.onNameSurnameChange}
					>

						<InputIcon>
							<Ionicons
								size={32}
								name='md-person'
								color={
									this.state.invalidNameSurname && this.state.isNameSurnameInitialized ? 'red' : 'rgba(0,0,0,.8)'
								}
							/>
						</InputIcon>

					</InputComponent>

					<InputComponent
						options={{
							keyboardType: 'email-address',
							textContentType: 'emailAddress',
							placeholder: 'E-mail'
						}}
						invalid={this.state.invalidEmail && this.state.isEmailInitialized}
						value={this.state.email}
						onChange={this.onEmailChange}
					>

						<InputIcon>
							<Ionicons
								size={32}
								name='md-mail-open'
								color={
									this.state.invalidEmail && this.state.isEmailInitialized ? 'red' : 'rgba(0,0,0,.8)'
								}
							/>
						</InputIcon>

					</InputComponent>

					{
						// <TermsComponent />
					}
				</View>

				<View>

					{
						//  <View style={[styles.child, { flexDirection: 'row' }]}>
						//      <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
						//          <CheckBox />
						//      </View>
						//      <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column', marginLeft: RFValue(8, 600) }}>
						//          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
						//              <Text style={{ color: 'rgba(0,0,0,.8)', fontSize: RFValue(16, 600), fontWeight: 'bold' }}>I give permissions for the use of my personal data for special offers and for receiving electronic communication, within the scope of The Law on Protection of Personal Data clarification document.</Text>
						//              <Text style={{ color: 'rgba(0,0,0,.8)', fontSize: RFValue(16, 600), fontWeight: 'bold' }}>the Terms and</Text>
						//          </View>
						//          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
						//              <Text style={{ color: 'rgba(0,0,0,.8)', fontSize: RFValue(16, 600), fontWeight: 'bold' }}>Conditions.</Text>
						//          </View>
						//      </View>
						//  </View>
					}
					<View style={styles.buttonDivider} />

					<ButtonComponent
						text='Kayıt ol'
						onClick={this.onRegisterClick}
						disabled={
							this.state.invalidEmail || !this.state.isEmailInitialized
							|| this.state.invalidNameSurname || !this.state.isNameSurnameInitialized
							|| this.state.invalidPassword || !this.state.isPasswordInitialized
							|| this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
						}
					/>
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
	facebookButton: {
		backgroundColor: '#3B589E',
		flex: 1,
		margin: RFValue(4, 600),
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	facebookText: {
		color: 'white',
		fontSize: RFValue(18, 600)
	},
	termsContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	checkBoxContainer: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start'
	},
	checkBox: {
		backgroundColor: 'transparent'
	},
	termsText: {
		color: 'rgba(0,0,0,.8)',
		fontSize: RFValue(16, 600),
		fontWeight: 'bold'
	},
	termsLinkText: {
		color: 'rgba(0,0,0,.8)',
		fontSize: RFValue(16, 600),
		fontWeight: 'bold'
	},
	termsTextContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	termsInfoContainer: {
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		flexDirection: 'column',
		marginLeft: RFValue(8, 600)
	},
	buttonDivider: {
		height: RFValue(22, 600),
		backgroundColor: '#EDEEF0'
	},
	invalid: {
		borderColor: 'red'
	}
})

export default RegisterScreen
