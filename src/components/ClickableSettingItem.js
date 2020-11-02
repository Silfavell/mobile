import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { View, TouchableOpacity, Text } from 'react-native'

const ClickableSettingItem = ({ children: icons, title, onClick }) => (
    <TouchableOpacity style={styles.container} onPress={onClick}>
        <View style={styles.iconContainer}>{icons[0]}</View>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightIconContainer}>{icons[1]}</View>
    </TouchableOpacity>
)

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        padding: '10@s',
        borderBottomWidth: 0.8,
        borderBottomColor: '#D2D2D2',
        marginHorizontal: '6@s',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    titleContainer: {
        alignItems: 'flex-start',
        flex: 6,
        justifyContent: 'center',
    },
    title: {
        marginHorizontal: '4@s',
        fontSize: '16@s',
        fontWeight: 'bold',
    },
    rightIconContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
    },
})

export default ClickableSettingItem
