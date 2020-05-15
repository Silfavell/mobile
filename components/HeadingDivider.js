import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { View, Text, StyleSheet } from 'react-native'

const HeadingDivider = ({ title }) => (
	<View style={styles.container}>
		<View style={styles.titleContainer}>
			<Text style={styles.title}>{title}</Text>
		</View>
	</View>
)

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		overflow: 'hidden'
	},
	titleContainer: {
		flex: 1,
		justifyContent: 'center',
		height: 40,
		paddingHorizontal: 16,
		backgroundColor: '#DFDFDF',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 24,
		elevation: 3
	},
	title: {
		color: '#A8A8A8',
		fontSize: RFValue(17, 600),
		fontWeight: 'bold'
	}
})

export default HeadingDivider
