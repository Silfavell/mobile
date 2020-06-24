import React from 'react'
import {
	StyleSheet
} from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators
} from '@react-navigation/stack'

import SearchScreen from '../SearchScreen'
import FullProductScreen from '../FullProductScreen'

const Stack = createStackNavigator()

const Screen2 = () => (
	<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
		<Stack.Screen
			name='search'
			options={{
				title: 'Ara',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
			component={SearchScreen}
		/>

		<Stack.Screen
			name='fullProductScreen'
			options={{
				title: 'Ürün detayı',
				headerTitleAlign: 'center',
				headerTintColor: 'white',
				headerStyle: styles.headerStyle
			}}
			component={FullProductScreen}
		/>
	</Stack.Navigator>
)

const styles = StyleSheet.create({
	headerStyle: { backgroundColor: '#DB0099' }
})

export default Screen2
