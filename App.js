import React from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import geolocation from '@react-native-community/geolocation'
import NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppState, StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { SET_NETWORK_STATUS } from './src/actions/network-actions'
import BottomTabNavigator from './src/navigation/BottomTabNavigator'
import rootReducer from './src/reducers/root-reducer'
import GlobalScreen from './src/screens/GlobalScreen/GlobalScreen'
import LoadingScreen from './src/screens/LoadingScreen/LoadingScreen'
import axiosMiddleware from './src/scripts/axios'
import { COLORS } from './src/scripts/colors'
import WelcomeStack from './src/stacks/WelcomeStack'

import './src/scripts/wydr'

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
        } else {
            AsyncStorage.removeItem('cart')
        }
    }
}

class App extends React.PureComponent {
    componentDidMount() {
        SplashScreen.hide()
        console.disableYellowBox = true
        networkListener()
        AppState.addEventListener('change', handleAppStateChange)
    }

    render() {
        return (
            <Provider store={store}>
                <StatusBar backgroundColor={COLORS.PRIMARY} barStyle='light-content' />
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
