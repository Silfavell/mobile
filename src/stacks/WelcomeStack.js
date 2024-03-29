import React from 'react'

import {
    createStackNavigator,
    CardStyleInterpolators
} from '@react-navigation/stack'
import { ScaledSheet } from 'react-native-size-matters'

import ActivationScreen from '../screens/ActivationScreen/ActivationScreen'
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen'
import LoginScreen from '../screens/LoginScreen/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen'
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
import { COLORS } from '../scripts/colors'

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
            }} />

        <Stack.Screen
            name='login'
            component={LoginScreen}
            options={{
                title: 'Giriş Yap',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='register'
            component={RegisterScreen}
            options={{
                title: 'Kayıt Ol',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='forgotPassword'
            component={ForgotPasswordScreen}
            options={{
                title: 'Şifremi Unuttum',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='resetPassword'
            component={ResetPasswordScreen}
            options={{
                title: 'Şifremi Değiştir',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='activationScreen'
            component={ActivationScreen}
            options={{
                title: 'Aktivasyon',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />
    </Stack.Navigator>
)

const styles = ScaledSheet.create({
    headerStyle: {
        backgroundColor: COLORS.PRIMARY
    },
    headerImage: {
        height: '200%'
    }
})

export default WelcomeStack
