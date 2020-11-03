import React from 'react'

import {
    createStackNavigator,
    CardStyleInterpolators
} from '@react-navigation/stack'
import { ScaledSheet } from 'react-native-size-matters'

import FullProductScreen from '../screens/FullProdutScreen/FullProductScreen'
import SearchScreen from '../screens/SearchScreen/SearchScreen'

const Stack = createStackNavigator()

const SearchStack = () => (
    <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
        <Stack.Screen
            name='search'
            options={{
                title: 'Ara',
                headerTitleAlign: 'center',
                headerTintColor: 'white',
                headerLeft: null,
                headerStyle: styles.headerStyle
            }}
            component={SearchScreen} />

        <Stack.Screen
            name='fullProductScreen'
            options={{
                title: 'Ürün Detayı',
                headerTitle: null,
                headerTitleAlign: 'center',
                headerTintColor: 'rgba(0,0,0,.8)',
                // headerTransparent: true,
                headerStyle: {
                    elevation: 0, // remove shadow on Android
                    shadowOpacity: 0 // remove shadow on iOS
                },
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
            }}
            component={FullProductScreen} />
    </Stack.Navigator>
)

const styles = ScaledSheet.create({
    headerStyle: { backgroundColor: 'rgba(0,0,0,.8)' }
})

export default SearchStack
