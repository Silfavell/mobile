import React from 'react'

import { StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '../scripts/colors'

const TabBarIcon = ({ name, focused }) => (
    <Ionicons
        name={name}
        size={28}
        style={styles.iconContainer}
        color={focused ? COLORS.SECONDARY : COLORS.TERTIARY} />
)

const styles = StyleSheet.create({
    iconContainer: {
        marginBottom: -3
    }
})

export default TabBarIcon
