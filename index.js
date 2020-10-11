/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

import Config from 'react-native-config'

alert('---' + ' ' + Config.SERVER_URL + ' ' + __DEV__)

AppRegistry.registerComponent(appName, () => App)
