import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'
import { RFValue } from 'react-native-responsive-fontsize'
import joi from 'react-native-joi'

import { SERVER_URL } from '../utils/global'
import PasswordChangedPopup from '../components/popups/PasswordChangedPopup'
import ButtonComponent from '../components/ButtonComponent'
import InputComponent from '../components/InputComponent'
import ShadowContainer from '../components/ShadowContainer'

class ChangePasswordScreen extends React.PureComponent {
	state = {
		scaleAnimationModal: false,

		oldPassword: '',
		password: '',

		invalidOldPassword: false,
		invalidPassword: false,

		isOldPasswordInitialized: false,
		isPasswordInitialized: false,
	}

	setPopupState = (state) => {
		this.setState({ scaleAnimationModal: state.scaleAnimationModal })

		if (!state.scaleAnimationModal) {
			this.props.navigation.pop()
		}
	}

	onChangePasswordClick = () => {
		if (this.state.oldPassword === '' || this.state.password === '') {
			this.props.messagePopupRef.showMessage({ message: 'Lütfen gerekli alanlarını doldurunuz' })
		} else if (this.state.password.length < 4) {
			this.props.messagePopupRef.showMessage({ message: 'Yeni şifreniz en az 4 haneli olmalı' })
		} else if (this.state.oldPassword === this.state.password) {
			this.props.messagePopupRef.showMessage({ message: 'Yeni şifre eskisi ise aynı olamaz' })
		} else {
			const url = `${SERVER_URL}/user/change-password`

			axios.put(url, { oldPassword: this.state.oldPassword, newPassword: this.state.password })
				.then(({ status }) => {
					if (status === 200) {
						this.setState({ scaleAnimationModal: true })
					}
				})
		}
	}

	onOldPasswordChange = (oldPassword) => {
		joi.string().alphanum().min(4).validate(oldPassword, (err) => {
			this.setState({ oldPassword, isOldPasswordInitialized: true, invalidOldPassword: !!err })
		})
	}

	onPasswordChange = (password) => {
		joi.string().alphanum().min(4).validate(password, (err) => {
			this.setState({ password, isPasswordInitialized: true, invalidPassword: !!err })
		})
	}

	render() {
		return (
			<ShadowContainer>
				<ScrollView style={styles.container}>

					<PasswordChangedPopup scaleAnimationModal={this.state.scaleAnimationModal} setPopupState={this.setPopupState} />

					<InputComponent
						options={{
							secureTextEntry: true,
							textContentType: 'password',
							placeholder: 'Geçerli şifre',
						}}
						invalid={this.state.invalidOldPassword && this.state.isOldPasswordInitialized}
						value={this.state.oldPassword}
						onChange={this.onOldPasswordChange}
					/>

					<InputComponent
						options={{
							secureTextEntry: true,
							textContentType: 'password',
							placeholder: 'Yeni şifre (en az 4 karakter)',
						}}
						invalid={this.state.invalidPassword && this.state.isPasswordInitialized}
						value={this.state.password}
						onChange={this.onPasswordChange}
					/>

					<ButtonComponent
						disabled={
							this.state.invalidPassword || !this.state.isPasswordInitialized
							|| this.state.invalidOldPassword || !this.state.isOldPasswordInitialized
						}
						text="Şifremi değiştir"
						onClick={this.onChangePasswordClick}
					/>

				</ScrollView>
			</ShadowContainer>
		)
	}
}

const styles = StyleSheet.create({
	container: { marginVertical: RFValue(12, 600) },
	resendContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
	resendCodeText: { fontSize: RFValue(20, 600), paddingHorizontal: RFValue(12, 600), color: '#6E7586' },
})

const mapStateToProps = ({
	globalReducer: {
		messagePopupRef,
	},
}) => ({
	messagePopupRef,
})

export default connect(mapStateToProps)(ChangePasswordScreen)
