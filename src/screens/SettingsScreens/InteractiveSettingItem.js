import React from 'react'

import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'

const InteractiveSettingItem = ({
    children: icons,
    title,
    onLeftClick,
    onRightIconClick
}) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onLeftClick}>
            <View style={styles.iconContainer}>
                {icons[0]}
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightIconContainer} onPress={onRightIconClick}>
            {icons[1]}
        </TouchableOpacity>
    </View>
)

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        padding: '10@s',
        borderBottomWidth: 0.8,
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
        marginHorizontal: '4@s',
        fontSize: '16@s'
    },
    rightIconContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    button: {
        flex: 7,
        flexDirection: 'row'
    }
})

export default InteractiveSettingItem
