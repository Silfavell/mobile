import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'


import CartScreen from '../CartScreen'
import ChoosePaymentScreen from '../ChoosePaymentScreen'
import CompletePaymentScreen from '../CompletePaymentScreen'
import OnlinePaymentScreen from '../OnlinePaymentScreen'
import ThanksScreen from '../ThanksScreen'

import HeaderLeft from '../../components/CartComponents/HeaderLeft'
import HeaderRight from '../../components/CartComponents/HeaderRight'
import PaymentOptionsScreen from '../PaymentOptionsScreens/PaymentOptionsScreen'
import AddNewCardScreen from '../PaymentOptionsScreens/AddNewCardScreen'
import CompleteAddressScreen from '../AddressScreens/CompleteAddressScreen'
import PinAddressScreen from '../AddressScreens/PinAddressScreen'
import SearchAddressScreen from '../AddressScreens/SearchAddressScreen'
import AddressesScreen from '../SettingsScreens/AddressesScreen'

const Stack = createStackNavigator()

const Screen3 = ({ navigation }) => (
	<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
		<Stack.Screen
			name="cart"
			component={CartScreen}
			options={{
				title: 'Sepetim',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle,
				headerLeft: () => <HeaderLeft navigation={navigation} />,
				headerRight: () => <HeaderRight />
			}}
		/>

		<Stack.Screen
			name="completePayment"
			component={CompletePaymentScreen}
			options={{
				title: 'Ödemeyi tamamla',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name="choosePayment"
			component={ChoosePaymentScreen}
			options={{
				title: 'Ödeme Yöntemi',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name="onlinePaymentScreen"
			component={OnlinePaymentScreen}
			options={{
				title: 'Online Kredi/Banka Kartı',
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
				headerStyle: styles.headerStyle,
			}}
		/>

		<Stack.Screen
			name="addNewCardScreen"
			component={AddNewCardScreen}
			options={{
				title: 'Kart ekle',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle,
			}}
		/>

		<Stack.Screen
			name="addresses"
			component={AddressesScreen}
			options={{
				title: 'Adreslerim',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle,
			}}
		/>

		<Stack.Screen
			name="searchAddressScreen"
			component={SearchAddressScreen}
			options={{
				title: 'Adres ara',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle,
			}}
		/>

		<Stack.Screen
			name="pinAddressScreen"
			component={PinAddressScreen}
			options={{
				title: 'Adres ekle',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle,
			}}
		/>

		<Stack.Screen
			name="completeAddressScreen"
			component={CompleteAddressScreen}
			options={{
				title: 'Adres ekle',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle,
			}}
		/>

		<Stack.Screen
			name="thanksScreen"
			component={ThanksScreen}
			options={{
				headerShown: false
			}}
		/>
	</Stack.Navigator>
)

const styles = StyleSheet.create({
	headerStyle: { backgroundColor: '#DB0099' }
})

export default Screen3
