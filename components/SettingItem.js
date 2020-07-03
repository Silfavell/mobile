import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { View, Text, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const renderRightComponent = ({ version, rightComponent }) => {
	if (version) {
		return <View style={styles.empty} />
	} else if (rightComponent) {
		return rightComponent
	}

	return <MaterialIcons color='rgba(0,0,0,.8)' name='chevron-right' size={32} />
}

const SettingItem = ({ children: icon, emptyIcon, title, value, version, rightComponent, order }) => (
	<View style={[
		styles.container,
		order ? styles.order : {}
	]}>

		{
			(icon || emptyIcon) && (
				<View style={styles.iconContainer}>
					{icon}
				</View>
			)
		}

		<View style={styles.titleContainer}>
			<Text style={[
				styles.title,
				order ? styles.orderTitle : {}
			]}>{title}</Text>
		</View>

		{
			value && (
				<View style={styles.titleContainer}>
					<Text style={styles.value}>{value}</Text>
				</View>
			)
		}

		<View style={styles.rightIconContainer}>
			{
				renderRightComponent({ version, rightComponent })
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
	order: {
		marginHorizontal: 0,
		borderBottomWidth: 0
	},
	orderTitle: {
		marginHorizontal: 0,
		color: '#EE4266'
	},
	iconContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
	titleContainer: { alignItems: 'flex-start', flex: 6, justifyContent: 'center' },
	title: {
		marginHorizontal: RFValue(8, 600), fontSize: RFValue(16, 600), color: '#505050', fontWeight: 'bold'
	},
	rightIconContainer: { alignItems: 'flex-end', justifyContent: 'center', flex: 1 },
	empty: { height: 32 }
})

export default SettingItem
