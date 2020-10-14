import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'


import ProfileScreen from '../screens/ProfileScreen/ProfileScreen'
import ChangePasswordScreen from '../screens/ChangePasswordScreen/ChangePasswordScreen'
import AddressesScreen from '../screens/SettingsScreens/AddressesScreen'
import SearchAddressScreen from '../screens/AddressScreens/SearchAddressScreen'
import PinAddressScreen from '../screens/AddressScreens/PinAddressScreen'
import CompleteAddressScreen from '../screens/AddressScreens/CompleteAddressScreen'
import PaymentOptionsScreen from '../screens/PaymentOptionsScreens/PaymentOptionsScreen'
import AddNewCardScreen from '../screens/PaymentOptionsScreens/AddNewCardScreen'
import ChangeLanguageScreen from '../screens/ChangeLanguageScreen/ChangeLanguageScreen'
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen'
import FavoriteProductsScreen from '../screens/FavoriteProductsScreen/FavoriteProductsScreen'
import FullProductScreen from '../screens/FullProdutScreen/FullProductScreen'
import PreviousOrdersScreen from '../screens/PreviousOrdersScreen/PreviousOrdersScreen'
import ReturnItems from '../screens/ReturnItems/ReturnItems'
import ReturnItemsCompleted from '../screens/ReturnItemsCompleted/ReturnItemsCompleted'
import HelpScreen from '../screens/HelpScreen/HelpScreen'

const Stack = createStackNavigator()

class ProfileStack extends React.PureComponent {
	render() {
		return (
			<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
				<Stack.Screen
					name='profile'
					component={ProfileScreen}
					options={{
						title: 'Diğer',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerLeft: null,
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='changePasswordScreen'
					component={ChangePasswordScreen}
					options={{
						title: 'Şifremi Değiştir',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>


				<Stack.Screen
					name='helpScreen'
					component={HelpScreen}
					options={{
						title: 'İletişime Geç',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='addresses'
					component={AddressesScreen}
					options={{
						title: 'Adreslerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='searchAddressScreen'
					component={SearchAddressScreen}
					options={{
						title: 'Adres Ara',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='pinAddressScreen'
					component={PinAddressScreen}
					options={{
						title: 'Adres Ekle',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='completeAddressScreen'
					component={CompleteAddressScreen}
					options={{
						title: 'Adres Ekle',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='paymentOptionsScreen'
					component={PaymentOptionsScreen}
					options={{
						title: 'Ödeme Yöntemlerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='favoriteProductsScreen'
					component={FavoriteProductsScreen}
					options={{
						title: 'Favorilerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='previousOrdersScreen'
					component={PreviousOrdersScreen}
					options={{
						title: 'Siparişlerim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='returnItems'
					component={ReturnItems}
					options={{
						title: 'Iade Talebinde Bulun',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='returnItemsCompleted'
					component={ReturnItemsCompleted}
					options={{
						title: 'Iade Talebiniz Alınmıştır',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='addNewCardScreen'
					component={AddNewCardScreen}
					options={{
						title: 'Kart Ekle',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='changeLanguageScreen'
					component={ChangeLanguageScreen}
					options={{
						title: 'Dili Değiştir',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='editProfileScreen'
					component={EditProfileScreen}
					options={{
						title: 'Profilim',
						headerTitleAlign: 'center',
						headerTintColor: 'white',
						headerStyle: styles.headerStyle
					}}
				/>

				<Stack.Screen
					name='fullProductScreen'
					options={{
						title: 'Ürün Detayı',
						headerTitle: null,
						headerTitleAlign: 'center',
						headerTintColor: 'rgba(0,0,0,.8)',
						headerStyle: {
							elevation: 0, // remove shadow on Android
							shadowOpacity: 0 // remove shadow on iOS
						},
						// headerTransparent: true,
						cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
					}}
					component={FullProductScreen}
				/>
			</Stack.Navigator>
		)
	}
}

const styles = ScaledSheet.create({
	headerStyle: {
		backgroundColor: 'rgba(0,0,0,.8)'
	}
})

export default ProfileStack
