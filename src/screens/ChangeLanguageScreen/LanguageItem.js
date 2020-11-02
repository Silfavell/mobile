import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const LanguageItem = ({ title, selected }) => (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.rightIconContainer}>
            {selected ? (
                <Ionicons color="rgba(0,0,0,.8)" name="md-checkmark" size={32} />
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
        marginHorizontal: '8@s',
        fontSize: '16@s',
        color: '#505050',
        fontWeight: 'bold',
    },
    rightIconContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1,
    },
    empty: {
        height: 32,
    },
})

export default LanguageItem
