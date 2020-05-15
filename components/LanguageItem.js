import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const LanguageItem = ({ title, selected }) => (
	<View style={styles.container}>
		<View style={styles.titleContainer}>
			<Text style={styles.title}>{title}</Text>
		</View>
		<View style={styles.rightIconContainer}>
			{
				selected ? <Ionicons color="#DB0099" name="md-checkmark" size={32} /> : <View style={styles.empty} />
			}
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: RFValue(10, 600),
		borderBottomWidth: 1,
		borderBottomColor: '#D2D2D2',
		marginHorizontal: RFValue(6, 600)
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	titleContainer: {
		alignItems: 'flex-start',
		flex: 6,
		justifyContent: 'center'
	},
	title: {
		marginHorizontal: RFValue(8, 600),
		fontSize: RFValue(16, 600),
		color: '#505050',
		fontWeight: 'bold'
	},
	rightIconContainer: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		flex: 1
	},
	empty: {
		height: 32
	}
})

export default LanguageItem
