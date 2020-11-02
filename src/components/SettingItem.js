import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { View, Text } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const renderRightComponent = ({ version, rightComponent, rightIcon }) => {
    if (version) {
        return <View style={styles.empty} />
    } else if (rightComponent) {
        return rightComponent
    }

    return <MaterialIcons color="rgba(0,0,0,.8)" name={rightIcon ?? 'chevron-right'} size={32} />
}

const SettingItem = ({
    children: icon,
    emptyIcon,
    title,
    value,
    version,
    rightComponent,
    order,
    rightIcon,
}) => (
    <View style={[styles.container, order ? styles.order : {}]}>
        {(icon || emptyIcon) && <View style={styles.iconContainer}>{icon}</View>}

        <View style={styles.titleContainer}>
            <Text style={[styles.title, order ? styles.orderTitle : {}]}>{title}</Text>
        </View>

        {value && (
            <View style={styles.titleContainer}>
                <Text style={styles.value}>{value}</Text>
            </View>
        )}

        <View style={styles.rightIconContainer}>
            {renderRightComponent({ version, rightComponent, rightIcon })}
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
    order: {
        marginHorizontal: 0,
        borderBottomWidth: 0,
    },
    orderTitle: {
        marginHorizontal: 0,
        color: '#EE4266',
    },
    iconContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
    titleContainer: { alignItems: 'flex-start', flex: 6, justifyContent: 'center' },
    title: {
        marginHorizontal: '8@s',
        fontSize: '16@s',
        color: '#505050',
        fontWeight: 'bold',
    },
    value: {
        fontSize: '16@s',
    },
    rightIconContainer: { alignItems: 'flex-end', justifyContent: 'center', flex: 1 },
    empty: { height: 32 },
})

export default SettingItem
