import React from 'react'

import {
    createStackNavigator,
    CardStyleInterpolators
} from '@react-navigation/stack'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import { setRootNavigation } from '../actions/global-actions'
import CategoryList from '../screens/CategoryList/CategoryList'
import FilterProductsScreen from '../screens/FilterProductsScreen/FilterProductsScreen'
import FullProductScreen from '../screens/FullProdutScreen/FullProductScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import ProductScreen from '../screens/ProductsScreen/ProductsScreen'
import { COLORS } from '../scripts/colors'

const Stack = createStackNavigator()

const HomeStack = ({ navigation, setRootNavigation }) => {
    setRootNavigation(navigation)

    return (
        <Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
            <Stack.Screen
                name='home'
                component={HomeScreen} />

            <Stack.Screen
                name='products'
                options={{
                    title: 'Ürünler',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.LIGHT,
                    headerStyle: styles.headerStyle
                }}
                component={ProductScreen} />

            <Stack.Screen
                name='categoryList'
                options={{
                    title: 'Kategoriler',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.LIGHT,
                    headerStyle: styles.headerStyle,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }}
                component={CategoryList} />

            <Stack.Screen
                name='fullProductScreen'
                options={{
                    title: 'Ürün detayı',
                    headerTitle: null,
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.PRIMARY,
                    // headerTransparent: true,
                    headerStyle: {
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0 // remove shadow on iOS
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }}
                component={FullProductScreen} />

            <Stack.Screen
                name='filterProductsScreen'
                options={{
                    title: 'Filtrele',
                    headerTitleAlign: 'center',
                    headerTintColor: COLORS.LIGHT,
                    headerStyle: styles.headerStyle,
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }}
                component={FilterProductsScreen} />
        </Stack.Navigator>
    )
}

const styles = ScaledSheet.create({
    headerStyle: {
        backgroundColor: COLORS.PRIMARY
    }
})

const mapDispatchToProps = {
    setRootNavigation
}

export default connect(null, mapDispatchToProps)(HomeStack)
