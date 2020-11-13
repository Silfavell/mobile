import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../scripts/colors'

const HeadingDivider = ({ title }) => (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    </View>
)

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        overflow: 'hidden'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        height: '40@s',
        paddingHorizontal: '16@s',
        backgroundColor: COLORS.GRAY,
        shadowColor: COLORS.DARK,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 3
    },
    title: {
        color: COLORS.TERTIARY,
        fontSize: '17@s',
        fontWeight: 'bold'
    }
})

export default HeadingDivider
