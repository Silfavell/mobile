import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import CartScreen from './CartScreen'
import ChoosePaymentScreen from './ChoosePaymentScreen'
import CompletePaymentScreen from './CompletePaymentScreen'
import OnlinePaymentScreen from './OnlinePaymentScreen'

const Stack = createStackNavigator()

const Screen3 = () => (
    <Stack.Navigator>
        <Stack.Screen name='cart' component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name='choosePayment' component={ChoosePaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name='completePayment' component={CompletePaymentScreen} options={{ headerShown: false }} />
        <Stack.Screen name='onlinePaymentScreen' component={OnlinePaymentScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
)

export default Screen3