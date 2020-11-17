import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { COLORS } from '../scripts/colors'
import CartStack from '../stacks/CartStack'
import HomeStack from '../stacks/HomeStack'
import ProfileStack from '../stacks/ProfileStack'
import SearchStack from '../stacks/SearchStack'
import CartIcon from './CartIcon'
import TabBarIcon from './TabBarIcon'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator({ navigation }) {
    navigation.setOptions({ headerShown: false })

    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{ activeTintColor: COLORS.SECONDARY }}
            lazy={false}>
            <BottomTab.Screen
                name='Home'
                component={HomeStack}
                options={{
                    title: 'Ana Sayfa',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-home' />
                }} />

            <BottomTab.Screen
                name='Search'
                component={SearchStack}
                options={{
                    title: 'Ara',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-search' />,
                    color: 'red'
                }} />

            <BottomTab.Screen
                name='Cart'
                component={CartStack}
                options={{
                    title: 'Sepetim',
                    tabBarIcon: ({ focused }) => <CartIcon focused={focused} name='md-basket' />
                }} />

            <BottomTab.Screen
                name='Profile'
                component={ProfileStack}
                options={{
                    title: 'Diğer',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='md-menu' />
                }} />
        </BottomTab.Navigator>
    )
}
