import React from 'react'

import {
    createStackNavigator,
    CardStyleInterpolators
} from '@react-navigation/stack'
import { ScaledSheet } from 'react-native-size-matters'

import HeaderLeft from '../components/HeaderLeft/HeaderLeft'
import HeaderRight from '../components/HeaderRight/HeaderRight'
import CompleteAddressScreen from '../screens/AddressScreens/CompleteAddressScreen'
import PinAddressScreen from '../screens/AddressScreens/PinAddressScreen'
import SearchAddressScreen from '../screens/AddressScreens/SearchAddressScreen'
import CartScreen from '../screens/CartScreen/CartScreen'
import CompletePaymentScreen from '../screens/CompletePaymentScreen/CompletePaymentScreen'
import AddNewCardScreen from '../screens/PaymentOptionsScreens/AddNewCardScreen'
import PaymentOptionsScreen from '../screens/PaymentOptionsScreens/PaymentOptionsScreen'
import AddressesScreen from '../screens/SettingsScreens/AddressesScreen'
import ThanksScreen from '../screens/ThanksScreen/ThanksScreen'
import { COLORS } from '../scripts/colors'

const Stack = createStackNavigator()

const CartStack = ({ navigation }) => (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
        <Stack.Screen
            name='cart'
            component={CartScreen}
            options={{
                title: 'Sepetim',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle,
                headerLeft: () => <HeaderLeft navigation={navigation} />,
                headerRight: () => <HeaderRight />
            }} />

        <Stack.Screen
            name='completePayment'
            component={CompletePaymentScreen}
            options={{
                title: 'Ödemeyi Tamamla',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='paymentOptionsScreen'
            component={PaymentOptionsScreen}
            options={{
                title: 'Ödeme Yöntemlerim',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='addNewCardScreen'
            component={AddNewCardScreen}
            options={{
                title: 'Kart Ekle',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='addresses'
            component={AddressesScreen}
            options={{
                title: 'Adreslerim',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='searchAddressScreen'
            component={SearchAddressScreen}
            options={{
                title: 'Adres Ara',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='pinAddressScreen'
            component={PinAddressScreen}
            options={{
                title: 'Adres Ekle',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='completeAddressScreen'
            component={CompleteAddressScreen}
            options={{
                title: 'Adres Ekle',
                headerTitleAlign: 'center',
                headerTintColor: COLORS.LIGHT,
                headerStyle: styles.headerStyle
            }} />

        <Stack.Screen
            name='thanksScreen'
            component={ThanksScreen}
            options={{
                headerShown: false
            }} />
    </Stack.Navigator>
)

const styles = ScaledSheet.create({
    headerStyle: { backgroundColor: COLORS.PRIMARY }
})

export default CartStack
