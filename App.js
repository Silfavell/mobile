import React from 'react'
import { AppState, AsyncStorage, StatusBar } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import NetInfo from '@react-native-community/netinfo'
import geolocation from '@react-native-community/geolocation'

import rootReducer from './reducers/root-reducer'

import BottomTabNavigator from './navigation/BottomTabNavigator'
import WelcomeStack from './screens/stacks/WelcomeStack'
import LoadingScreen from './screens/LoadingScreen'
import GlobalScreen from './screens/GlobalScreen'

import axiosMiddleware from './utils/axios'

import { SET_NETWORK_STATUS } from './actions/network-actions'

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
	const { cart } = store.getState().reducer1
	// const { token } = store.getState().reducer4
	if (nextAppState.match(/inactive|background/)) {
		if (Object.values(cart).length > 0) {
			AsyncStorage.setItem('cart', JSON.stringify(cart))
		}
	}
}

export default function App() {
	console.disableYellowBox = true
	networkListener()
	AppState.addEventListener('change', handleAppStateChange)

	return (
		<Provider store={store}>
			<StatusBar backgroundColor='#DB0099' barStyle='light-content' />
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
