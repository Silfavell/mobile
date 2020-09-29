import React from 'react'
import { AppState, LogBox, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NetInfo from '@react-native-community/netinfo'
import geolocation from '@react-native-community/geolocation'
import SplashScreen from 'react-native-splash-screen'

import rootReducer from './src/reducers/root-reducer'

import BottomTabNavigator from './src/navigation/BottomTabNavigator'
import WelcomeStack from './src/stacks/WelcomeStack'
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen'
import GlobalScreen from './src/screens/GlobalScreen/GlobalScreen'

import axiosMiddleware from './src/utils/axios'

import { SET_NETWORK_STATUS } from './src/actions/network-actions'

// eslint-disable-next-line no-undef
navigator.geolocation = geolocation

const store = createStore(rootReducer, applyMiddleware(thunk))
const Stack = createStackNavigator()

axiosMiddleware(store)

const networkListener = () => {
	NetInfo.addEventListener((state) => {
		store.dispatch({
			type: SET_NETWORK_STATUS,
			payload: {
				networkStatus: state.isConnected
			}
		})
	})
}

const handleAppStateChange = (nextAppState) => {
	const { cart } = store.getState().cartReducer
	// const { token } = store.getState().sourceReducer
	if (nextAppState.match(/inactive|background/)) {
		if (Object.values(cart).length > 0) {
			AsyncStorage.setItem('cart', JSON.stringify(cart))
		}
	}
}

class App extends React.PureComponent {

	componentDidMount() {
		SplashScreen.hide()
		console.disableYellowBox = true;
		networkListener()
		AppState.addEventListener('change', handleAppStateChange)
	}

	render() {
		return (
			<Provider store={store}>
				<StatusBar backgroundColor='rgba(0,0,0,.8)' barStyle='light-content' />
				<GlobalScreen />
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Loading'>
						<Stack.Screen name='Welcome' component={WelcomeStack} options={{ headerShown: false }} />
						<Stack.Screen name='Loading' component={LoadingScreen} options={{ headerShown: false }} />
						<Stack.Screen name='Root' component={BottomTabNavigator} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		)
	}
}

export default App