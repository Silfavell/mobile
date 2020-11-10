import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '../../scripts/colors'

const LanguageItem = ({ title, selected }) => (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightIconContainer}>
            {selected ? (
                <Ionicons color={COLORS.TERTIARY} name='md-checkmark' size={32} />
            ) : (
                <View style={styles.empty} />
            )}
        </View>
    </View>
)

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        padding: '10@s',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY,
        marginHorizontal: '6@s'
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
        marginHorizontal: '8@s',
        fontSize: '16@s',
        color: COLORS.DARK,
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
