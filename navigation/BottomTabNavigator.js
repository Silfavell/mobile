import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../screens/stacks/Screen1'
import Search from '../screens/stacks/Screen2'
import Cart from '../screens/stacks/Screen3'
import ProfileScreen from '../screens/stacks/Screen4'

import TabBarIcon from './TabBarIcon'
import CartIcon from './CartIcon'

const BottomTab = createBottomTabNavigator()
const INITIAL_ROUTE_NAME = 'Home'

export default function BottomTabNavigator({ navigation, route }) {
	navigation.setOptions({ headerTitle: getHeaderTitle(route), headerShown: false })

	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBarOptions={{ activeTintColor: '#DB0099' }} lazy={false}>

			<BottomTab.Screen
				name="Home"
				component={Home}
				options={{
					title: 'Sipariş',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />
				}}
			/>

			<BottomTab.Screen
				name="Search"
				component={Search}
				options={{
					title: 'Ara',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />
				}}
			/>

			<BottomTab.Screen
				name="Cart"
				component={Cart}
				options={{
					title: 'Sepetim',
					tabBarIcon: ({ focused }) => <CartIcon focused={focused} name="md-cart" />
				}}
			/>

			<BottomTab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					title: 'Diğer',
					tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-menu" />
				}}
			/>

		</BottomTab.Navigator>
	)
}

function getHeaderTitle(route) {
	const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME

	switch (routeName) {
		case 'Home':
			return 'Home'
		case 'Search':
			return 'Search'
		case 'Cart':
			return 'Cart'
		case 'Profile':
			return 'Profile'
		default:
			return 'Profile'
	}
}
