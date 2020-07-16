import React from 'react'
import axios from 'axios'
import { Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import joi from 'react-native-joi'

import { SERVER_URL } from '../utils/global'
import ButtonComponent from '../components/ButtonComponent'
import InputComponent from '../components/InputComponent'
import InputIcon from '../components/InputIcon'
import ShadowContainer from '../components/ShadowContainer'

class ForgotPasswordScreen extends React.PureComponent {
	state = {
		phoneNumber: '',
		isPhoneNumberInitialized: false,
		invalidPhoneNumber: false
	}

	onSendCodeClick = () => {
		const url = `${SERVER_URL}/send-activation-code`

		axios.post(url, {
			phoneNumber: this.state.phoneNumber,
			activationCodeType: 1 // RESET
		}).then(({ status }) => {
			if (status === 202) {
				this.props.navigation.navigate('resetPassword', { phoneNumber: this.state.phoneNumber })
			}
		})
	}

	onPhoneNumberChange = (phoneNumber) => {
		joi.string().trim().strict().min(10)
			.max(10)
			.validate(phoneNumber, (err) => {
				this.setState({ phoneNumber, isPhoneNumberInitialized: true, invalidPhoneNumber: !!err })
			})
	}

	render() {
		return (
			<ShadowContainer>
				<InputComponent
					options={{
						keyboardType: 'phone-pad',
						placeholder: 'Telefon numarası',
						maxLength: 10
					}}
					invalid={
						this.state.invalidPhoneNumber && this.state.isPhoneNumberInitialized
					}
					value={this.state.phoneNumber}
					onChange={this.onPhoneNumberChange}
				>
					<InputIcon>
						<Text style={{ color: 'rgba(0,0,0,.8)', fontSize: RFValue(18, 600) }}>90</Text>
					</InputIcon>
				</InputComponent>

				<ButtonComponent
					text='Aktivasyon Kodu Gönder'
					onClick={this.onSendCodeClick}
					disabled={
						this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
					}
				/>

			</ShadowContainer>
		)
	}
}


export default ForgotPasswordScreen
