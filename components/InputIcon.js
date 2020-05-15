import React from 'react'
import { View, StyleSheet } from 'react-native'

const InputIcon = ({ children: icon }) => (
	<View style={styles.container}>
		{
			icon
		}
	</View>
)

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		width: 54
	}
})

export default InputIcon
