import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StyleSheet } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'


import WelcomeScreen from '../WelcomeScreen'
import LoginScreen from '../LoginScreen'
import RegisterScreen from '../RegisterScreen'
import ForgotPasswordScreen from '../ForgotPasswordScreen'
import ResetPasswordScreen from '../ResetPasswordScreen'
import ActivationScreen from '../ActivationScreen'

const Stack = createStackNavigator()

const WelcomeStack = () => (
	<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
		<Stack.Screen
			name="welcome"
			component={WelcomeScreen}
			options={{
				headerTitleAlign: 'center',
				headerStyle: styles.headerStyle,
				headerShown: false
			}}
		/>

		<Stack.Screen
			name="login"
			component={LoginScreen}
			options={{
				title: 'Giriş yap',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name="register"
			component={RegisterScreen}
			options={{
				title: 'Kayıt ol',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name="forgotPassword"
			component={ForgotPasswordScreen}
			options={{
				title: 'Şifremi unuttum',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name="resetPassword"
			component={ResetPasswordScreen}
			options={{
				title: 'Şifremi unuttum',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
		/>

		<Stack.Screen
			name="activationScreen"
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

const styles = StyleSheet.create({
	headerStyle: { backgroundColor: '#DB0099' },
	headerTitle: {
		height: '100%',
		padding: RFValue(8, 600),
		backgroundColor: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		borderBottomWidth: 3,
		borderBottomColor: '#DB0099'
	},
	headerImage: {
		height: '200%'
	}
})

export default WelcomeStack
