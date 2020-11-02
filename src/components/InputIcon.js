import React from 'react'

import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

const InputIcon = ({ children: icon }) => <View style={styles.container}>{icon}</View>

const styles = ScaledSheet.create({
    container: {
        position: 'absolute',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        width: '54@s'
    }
})

export default InputIcon
