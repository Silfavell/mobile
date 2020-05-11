import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { updateProfile } from '../actions/actions4'

import InputComponent from '../components/InputComponent'
import ButtonComponent from '../components/ButtonComponent'
import InputIcon from '../components/InputIcon'
import ShadowContainer from '../components/ShadowContainer'

class EditProfileScreen extends React.PureComponent {
	state = {
		nameSurname: this.props.user.nameSurname,
		phoneNumber: this.props.user.phoneNumber,
		email: this.props.user.email
	}

	onNameSurnameChange = (nameSurname) => {
		this.setState({ nameSurname })
	}

	onEmailChange = (email) => {
		this.setState({ email })
	}

	onPhoneChange = (phoneNumber) => {
		this.setState({ phoneNumber })
	}

	onSaveClick = () => {
		this.props.updateProfile({
			nameSurname: this.state.nameSurname,
			phoneNumber: this.state.phoneNumber,
			email: this.state.email
		}, () => {
			this.props.navigation.goBack()
		})
	}

	render() {
		return (
			<ShadowContainer>
				<View>
					<InputComponent
						options={{
							textContentType: 'name',
							placeholder: 'Ad soyad',
						}}
						value={this.state.nameSurname}
						onChange={this.onNameSurnameChange}
					>
						<InputIcon>
							<Ionicons size={32} name="md-person" color="#D000DB" />
						</InputIcon>

					</InputComponent>

					<InputComponent
						options={{
							keyboardType: 'email-address',
							textContentType: 'emailAddress',
							placeholder: 'E-mail',
						}}
						value={this.state.email}
						onChange={this.onEmailChange}
					>
						<InputIcon>
							<Ionicons size={32} name="md-mail-open" color="#D000DB" />
						</InputIcon>

					</InputComponent>

					<InputComponent
						options={{
							keyboardType: 'phone-pad',
							textContentType: 'telephoneNumber',
							placeholder: 'Telefon numarası'
						}}
						value={this.state.phoneNumber}
						disabled
						onChange={this.onPhoneChange}
					>
						<InputIcon>
							<Ionicons size={32} name="md-phone-portrait" color="#D000DB" />
						</InputIcon>

					</InputComponent>
				</View>

				<ButtonComponent text="Kaydet" onClick={this.onSaveClick} />
			</ShadowContainer>
		)
	}
}

const mapStateToProps = ({
	reducer4: {
		user
	},
}) => ({
	user
})

const mapDispatchToProps = {
	updateProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen)
