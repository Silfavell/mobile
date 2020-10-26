import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const TabBarIcon = ({ name, focused }) => (
	<Ionicons
		name={name}
		size={28}
		style={styles.iconContainer}
		color={focused ? 'rgba(0,0,0,.8)' : '#CCC'}
	/>
)

const styles = StyleSheet.create({
	iconContainer: {
		marginBottom: -3
	}
})

export default TabBarIcon


