import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View,
	Image,
	StyleSheet
} from 'react-native'
import {
	createStackNavigator,
	CardStyleInterpolators
} from '@react-navigation/stack'
import { connect } from 'react-redux'

import HomeScreen from '../HomeScreen'
import ProductScreen from '../ProductsScreen'
import FullProductScreen from '../FullProductScreen'
import FilterProductsScreen from '../FilterProductsScreen'

import { setRootNavigation } from '../../actions/global-actions'

import logo from '../../assets/icon-black.png'

const Stack = createStackNavigator()

// eslint-disable-next-line no-shadow
const Screen1 = ({ navigation, setRootNavigation }) => {
	setRootNavigation(navigation)

	return (
		<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
			<Stack.Screen
				name='home'
				component={HomeScreen}
				options={{
					headerTitleAlign: 'center',
					headerStyle: styles.headerStyle,
					headerTitle: () => (
						<View style={styles.headerTitle}>
							<Image source={logo} resizeMode='center' style={styles.headerImage} />
						</View>
					)
				}}
			/>

			<Stack.Screen
				name='products'
				options={{
					title: 'Ürünler',
					headerTitleAlign: 'center',
					headerTintColor: 'white',
					headerStyle: styles.headerStyle
				}}
				component={ProductScreen}
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

			<Stack.Screen
				name='filterProductsScreen'
				options={{
					title: 'Filtrele',
					headerTitleAlign: 'center',
					headerTintColor: 'white',
					headerStyle: styles.headerStyle,
					cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
					cardStyle: {
						backgroundColor: 'rgba(255,255,255,0.7)'
					}
				}}
				component={FilterProductsScreen}
			/>
		</Stack.Navigator>
	)
}

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: 'rgba(0,0,0,.8)'
	},
	headerTitle: {
		height: '100%',
		padding: RFValue(8, 600),
		backgroundColor: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		borderBottomWidth: 3,
		borderBottomColor: 'rgba(0,0,0,.8)'
	},
	headerImage: {
		height: '200%'
	}
})

const mapDispatchToProps = {
	setRootNavigation
}

export default connect(null, mapDispatchToProps)(Screen1)
