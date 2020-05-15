import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native'

const ClickableSettingItem = ({ children: icons, title, onClick }) => (
	<TouchableOpacity style={styles.container} onPress={onClick}>
		<View style={styles.iconContainer}>
			{icons[0]}
		</View>
		<View style={styles.titleContainer}>
			<Text style={styles.title}>{title}</Text>
		</View>
		<View style={styles.rightIconContainer}>
			{icons[1]}
		</View>
	</TouchableOpacity>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: RFValue(10, 600),
		borderBottomWidth: 0.8,
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
		marginHorizontal: RFValue(4, 600),
		fontSize: RFValue(16, 600),
		fontWeight: 'bold'
	},
	rightIconContainer: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		flex: 1
	}
})

export default ClickableSettingItem
