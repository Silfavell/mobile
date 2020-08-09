import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'

import LanguageItem from '../components/LanguageItem'

const ChangeLanguageScreen = ({ navigation }) => (
	<ScrollView>

		<TouchableOpacity onPress={() => {
			navigation.goBack()
		}}
		>
			<LanguageItem title='English' />
		</TouchableOpacity>

		<TouchableOpacity onPress={() => {
			navigation.goBack()
		}}
		>
			<LanguageItem title='Türkçe' />
		</TouchableOpacity>

	</ScrollView>
)

export default ChangeLanguageScreen
