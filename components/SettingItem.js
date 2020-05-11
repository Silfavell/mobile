import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { View, Text, StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const SettingItem = ({ children: icon, title, version }) => (
	<View style={styles.container}>
		<View style={styles.iconContainer}>
			{icon}
		</View>
		<View style={styles.titleContainer}>
			<Text style={styles.title}>{title}</Text>
		</View>
		<View style={styles.rightIconContainer}>
			{
				version ? <View style={styles.empty} /> : <MaterialIcons color="#D000DB" name="chevron-right" size={32} />
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
	iconContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
	titleContainer: { alignItems: 'flex-start', flex: 6, justifyContent: 'center' },
	title: {
		marginHorizontal: RFValue(8, 600), fontSize: RFValue(16, 600), color: '#505050', fontWeight: 'bold'
	},
	rightIconContainer: { alignItems: 'flex-end', justifyContent: 'center', flex: 1 },
	empty: { height: 32 }
})

export default SettingItem
