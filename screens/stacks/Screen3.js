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
			name="thanksScreen"
			component={ThanksScreen}
			options={{
				headerShown: false
			}}
		/>
	</Stack.Navigator>
)

const styles = StyleSheet.create({
	headerStyle: { backgroundColor: '#5D3EBD' }
})

export default Screen3
