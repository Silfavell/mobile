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
			component={FullProductScreen}
		/>
	</Stack.Navigator>
)

const styles = StyleSheet.create({
	headerStyle: { backgroundColor: 'rgba(0,0,0,.8)' }
})

export default Screen2
