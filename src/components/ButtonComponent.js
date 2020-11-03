import React from 'react'

import { View, TouchableOpacity, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const ButtonComponent = ({
    text, onClick, opposite, needFlex, disabled
}) => (
    <View
        style={[styles.container, needFlex ? styles.needFlex : {}, disabled ? styles.disabled : {}]}
    >
        <TouchableOpacity
            disabled={disabled}
            onPress={onClick}
            style={[styles.button, opposite ? styles.opposite : {}]}
        >
            <Text style={[styles.text, opposite ? styles.opposite : {}]}>{text}</Text>
        </TouchableOpacity>
    </View>
)

const styles = ScaledSheet.create({
    container: {
        height: '60@s',
        margin: '3@s'
    },
    needFlex: {
        flex: 1
    },
    button: {
        backgroundColor: 'rgba(0,0,0,.8)',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,.8)',
        flex: 1,
        margin: '4@s',
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
    opposite: {
        backgroundColor: 'white',
        color: 'rgba(0,0,0,.8)'
    },
    text: {
        color: 'white',
        fontSize: '18@s'
    },
    disabled: {
        opacity: 0.65
    }
})

export default ButtonComponent
