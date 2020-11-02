import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
    createStackNavigator,
    CardStyleInterpolators
} from '@react-navigation/stack'

import CartScreen from '../screens/CartScreen/CartScreen'
import CompletePaymentScreen from '../screens/CompletePaymentScreen/CompletePaymentScreen'
import OnlinePaymentScreen from '../screens/OnlinePaymentScreen/OnlinePaymentScreen'
import ThanksScreen from '../screens/ThanksScreen/ThanksScreen'

import HeaderLeft from '../components/HeaderLeft'
import HeaderRight from '../components/HeaderRight'
import PaymentOptionsScreen from '../screens/PaymentOptionsScreens/PaymentOptionsScreen'
import AddNewCardScreen from '../screens/PaymentOptionsScreens/AddNewCardScreen'
import CompleteAddressScreen from '../screens/AddressScreens/CompleteAddressScreen'
import PinAddressScreen from '../screens/AddressScreens/PinAddressScreen'
import SearchAddressScreen from '../screens/AddressScreens/SearchAddressScreen'
import AddressesScreen from '../screens/SettingsScreens/AddressesScreen'

const Stack = createStackNavigator()

const CartStack = ({ navigation }) => (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
        <Stack.Screen
            name='cart'
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
            name='completePayment'
            component={CompletePaymentScreen}
            options={{
                title: 'Ödemeyi Tamamla',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerStyle: styles.headerStyle
            }}
        />

        <Stack.Screen
            name='onlinePaymentScreen'
            component={OnlinePaymentScreen}
            options={{
                title: 'Online Kredi/Banka Kartı',
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
            name='thanksScreen'
            component={ThanksScreen}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
)

const styles = ScaledSheet.create({
    headerStyle: { backgroundColor: 'rgba(0,0,0,.8)' }
})

export default CartStack
