import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import SettingItem from '../components/SettingItem'
import LogoutItem from '../components/LogoutItem'
import ShadowContainer from '../components/ShadowContainer'

class ProfileScreen extends React.PureComponent {
	moveToEditProfileScreen = () => {
		this.props.navigation.navigate('editProfileScreen')
	}

	moveToAddress = () => {
		this.props.navigation.navigate('addresses')
	}

	moveToPaymentOptions = () => {
		this.props.navigation.navigate('paymentOptionsScreen')
	}

	moveToChangePasssword = () => {
		this.props.navigation.navigate('changePasswordScreen')
	}

	moveToLogin = () => {
		this.props.navigation.navigate('Welcome', { screen: 'login' })
	}

	render() {
		return (
			<ShadowContainer>
				<ScrollView>
					{
						this.props.token
							? (
								<>
									<TouchableOpacity onPress={this.moveToEditProfileScreen}>
										<SettingItem title={this.props.user.nameSurname}>
											<Ionicons color="#D000DB" name="md-person" size={32} />
										</SettingItem>
									</TouchableOpacity>

									{
										//  <SettingItem title={'muhammetipek57@hotmail.com'}>
										//      <Ionicons color={'#D000DB'} name={'md-mail-open'} size={32} />
										//  </SettingItem>
										//
										//  <SettingItem title={'(546) 813-3198'}>
										//      <Ionicons color={'#D000DB'} name={'md-phone-portrait'} size={32} />
										//  </SettingItem>
									}

									<TouchableOpacity onPress={this.moveToAddress}>
										<SettingItem title="Addresses">
											<MaterialIcons color="#D000DB" name="place" size={32} />
										</SettingItem>
									</TouchableOpacity>

									<TouchableOpacity onPress={this.moveToPaymentOptions}>
										<SettingItem title="Payment Options">
											<Ionicons color="#D000DB" name="ios-card" size={32} />
										</SettingItem>
									</TouchableOpacity>

									{
										//  <SettingItem title={'Favorite Products'}>
										//      <Ionicons color={'#D000DB'} name={'md-heart'} size={32} />
										//  </SettingItem>
										//
										//  <SettingItem title={'Previous Orders'}>
										//      <Ionicons color={'#D000DB'} name={'md-basket'} size={32} />
										//  </SettingItem>
										//
										//  <SettingItem title={'Previous Invoices'}>
										//      <Ionicons color={'#D000DB'} name={'md-document'} size={32} />
										//  </SettingItem>
										//
										//  <SettingItem title={'Invoice Information'}>
										//      <Ionicons color={'#D000DB'} name={'md-document'} size={32} />
										//  </SettingItem>
									}

									<TouchableOpacity onPress={this.moveToChangePasssword}>
										<SettingItem title="Change Password">
											<Ionicons color="#D000DB" name="md-lock" size={32} />
										</SettingItem>
									</TouchableOpacity>

									{
										//  <SettingItem title={'Communication Options'}>
										//      <Ionicons color={'#D000DB'} name={'md-notifications'} size={32} />
										//  </SettingItem>
										//
										//  <SettingItem title={'Support'}>
										//      <Ionicons color={'#D000DB'} name={'md-help-circle-outline'} size={32} />
										//  </SettingItem>
									}

									<LogoutItem navigation={this.props.navigation} />
								</>
							)
							: (
								<TouchableOpacity onPress={this.moveToLogin}>
									<SettingItem title="Giriş yap">
										<Ionicons color="#D000DB" name="md-person" size={32} />
									</SettingItem>
								</TouchableOpacity>
							)
					}

					{
						//  <TouchableOpacity onPress={() => { navigation.navigate('changeLanguageScreen') }}>
						//      <SettingItem title={'English'} />
						//  </TouchableOpacity>
					}

					<SettingItem title="1.0.0" version />

				</ScrollView>
			</ShadowContainer>
		)
	}
}

const mapStateToProps = ({
	reducer4: {
		token,
		user,
	},
}) => ({
	token,
	user,
})

export default connect(mapStateToProps)(ProfileScreen)
