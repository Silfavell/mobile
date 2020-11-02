import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeStack from '../stacks/HomeStack'
import SearchStack from '../stacks/SearchStack'
import CartStack from '../stacks/CartStack'
import ProfileStack from '../stacks/ProfileStack'

import TabBarIcon from './TabBarIcon'
import CartIcon from './CartIcon'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator({ navigation }) {
    navigation.setOptions({ headerShown: false })

    return (
        <BottomTab.Navigator
            initialRouteName={INITIAL_ROUTE_NAME}
            tabBarOptions={{ activeTintColor: 'rgba(0,0,0,.8)' }}
            lazy={false}>
            <BottomTab.Screen
                name="Home"
                component={HomeStack}
                options={{
                    title: 'Ana Sayfa',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
                }}
            />

            <BottomTab.Screen
                name="Search"
                component={SearchStack}
                options={{
                    title: 'Ara',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
                }}
            />

            <BottomTab.Screen
                name="Cart"
                component={CartStack}
                options={{
                    title: 'Sepetim',
                    tabBarIcon: ({ focused }) => <CartIcon focused={focused} name="md-basket" />,
                }}
            />

            <BottomTab.Screen
                name="Profile"
                component={ProfileStack}
                options={{
                    title: 'Diğer',
                    tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-menu" />,
                }}
            />
        </BottomTab.Navigator>
    )
}
