import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'

const Specification = ({ title, value, first }) => (
    <View style={[
        styles.detailRow,
        !first ? styles.nonFirstDetailsRow : {}
    ]}>
        <View style={styles.detailRowTitleContainer}>
            <Text style={styles.detailRowTitle}>{title}</Text>
        </View>
        <View style={styles.detailRowValueContainer}>
            <Text style={styles.detailRowValue}>{value}</Text>
        </View>
    </View>
)

const styles = ScaledSheet.create({
    detailRow: {
        display: 'flex',
        flexDirection: 'row'
    },
    nonFirstDetailsRow: {
        borderTopWidth: 1,
        borderTopColor: COLORS.GRAY
    },
    detailRowTitleContainer: {
        flex: 4,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: COLORS.LIGHT
    },
    detailRowTitle: {
        padding: '12@s',
        fontSize: '15@s',
        color: COLORS.DARK
    },
    detailRowValueContainer: {
        flex: 8,
        display: 'flex',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: COLORS.GRAY
    },
    detailRowValue: {
        padding: '12@s',
        fontSize: '15@s',
        color: COLORS.DARK
    }
})

export default Specification
