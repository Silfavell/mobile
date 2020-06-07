import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'


import ProfileScreen from '../ProfileScreen'
import ChangePasswordScreen from '../ChangePasswordScreen'
import AddressesScreen from '../SettingsScreens/AddressesScreen'
import SearchAddressScreen from '../AddressScreens/SearchAddressScreen'
import PinAddressScreen from '../AddressScreens/PinAddressScreen'
import CompleteAddressScreen from '../AddressScreens/CompleteAddressScreen'
import PaymentOptionsScreen from '../PaymentOptionsScreens/PaymentOptionsScreen'
import AddNewCardScreen from '../PaymentOptionsScreens/AddNewCardScreen'
import ChangeLanguageScreen from '../ChangeLanguageScreen'
import EditProfileScreen from '../EditProfileScreen'
import FavoriteProductsScreen from '../FavoriteProductsScreen'
import FullProductScreen from '../FullProductScreen'
import PreviousOrdersScreen from '../PreviousOrdersScreen'

const Stack = createStackNavigator()

class Screen4 extends React.PureComponent {
	render() {
		return (
			<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
				<Stack.Screen
					name="profile"
					component={ProfileScreen}
					options={{
						title: 'Diğer',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="changePasswordScreen"
					component={ChangePasswordScreen}
					options={{
						title: 'Şifremi değiştir',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="addresses"
					component={AddressesScreen}
					options={{
						title: 'Adreslerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="searchAddressScreen"
					component={SearchAddressScreen}
					options={{
						title: 'Adres ara',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="pinAddressScreen"
					component={PinAddressScreen}
					options={{
						title: 'Adres ekle',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="completeAddressScreen"
					component={CompleteAddressScreen}
					options={{
						title: 'Adres ekle',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="paymentOptionsScreen"
					component={PaymentOptionsScreen}
					options={{
						title: 'Ödeme Yöntemlerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="favoriteProductsScreen"
					component={FavoriteProductsScreen}
					options={{
						title: 'Favorilerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="previousOrdersScreen"
					component={PreviousOrdersScreen}
					options={{
						title: 'Siparişlerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="addNewCardScreen"
					component={AddNewCardScreen}
					options={{
						title: 'Kart ekle',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="changeLanguageScreen"
					component={ChangeLanguageScreen}
					options={{
						title: 'Dili değiştir',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="editProfileScreen"
					component={EditProfileScreen}
					options={{
						title: 'Profilim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name="fullProductScreen"
					options={{
						title: 'Ürün detayı',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}

					component={FullProductScreen}
				/>

			</Stack.Navigator>
		)
	}
}

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: '#DB0099'
	}
})

export default Screen4
