import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	createStackNavigator,
	CardStyleInterpolators
} from '@react-navigation/stack'

import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen'
import ActivationScreen from '../screens/ActivationScreen/ActivationScreen'

const Stack = createStackNavigator()

const WelcomeStack = () => (
	<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
		<Stack.Screen
			name='welcome'
			component={WelcomeScreen}
			options={{
				headerTitleAlign: 'center',
				headerStyle: styles.headerStyle,
				headerShown: false
			}}
		/>

		<Stack.Screen
			name='login'
			component={LoginScreen}
			options={{
				title: 'Giriş yap',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name='register'
			component={RegisterScreen}
			options={{
				title: 'Kayıt ol',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name='forgotPassword'
			component={ForgotPasswordScreen}
			options={{
				title: 'Şifremi unuttum',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name='resetPassword'
			component={ResetPasswordScreen}
			options={{
				title: 'Şifremi unuttum',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name='activationScreen'
			component={ActivationScreen}
			options={{
				title: 'Aktivasyon',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>
	</Stack.Navigator>
)

const styles = ScaledSheet.create({
	headerStyle: { backgroundColor: 'rgba(0,0,0,.8)' },
	headerImage: {
		height: '200%'
	}
})

export default WelcomeStack
