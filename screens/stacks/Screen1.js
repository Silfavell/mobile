import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { View, Image, StyleSheet } from 'react-native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { connect } from 'react-redux'

import HomeScreen from '../HomeScreen'
import ProductScreen from '../ProductsScreen'
import FullProductScreen from '../FullProductScreen'

import { setRootNavigation } from '../../actions/global-actions'

import logo from '../../assets/icon.png'

const Stack = createStackNavigator()

// eslint-disable-next-line no-shadow
const Screen1 = ({ navigation, setRootNavigation }) => {
	setRootNavigation(navigation)

	return (
		<Stack.Navigator screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>

			<Stack.Screen
				name="home"
				component={HomeScreen}
				options={{
					headerTitleAlign: 'center',
					headerStyle: styles.headerStyle,
					headerTitle: () => (
						<View style={styles.headerTitle}>
							<Image source={logo} resizeMode="center" style={styles.headerImage} />
						</View>
					)
				}}
			/>

			<Stack.Screen
				name="products"
				options={{
					title: 'Ürünler',
					headerTitleAlign: 'center',
					headerTintColor: 'white',
					headerStyle: styles.headerStyle
				}}
				component={ProductScreen}
			/>

			<Stack.Screen
				name="fullProductScreen"
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
}

const styles = StyleSheet.create({
	headerStyle: { backgroundColor: '#D000DB' },
	headerTitle: {
		height: '100%',
		padding: RFValue(8, 600),
		backgroundColor: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		borderBottomWidth: 3,
		borderBottomColor: '#D000DB'
	},
	headerImage: {
		height: '200%'
	}
})

const mapDispatchToProps = {
	setRootNavigation
}

export default connect(null, mapDispatchToProps)(Screen1)
