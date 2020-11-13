import React from 'react'

import { View, TouchableOpacity, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import { COLORS } from '../../scripts/colors'

class PaymentTypeSelectComponent extends React.PureComponent {
    onPress = () => {
        const { navigation, token, setNeedToLoginPopupState } = this.props

        if (!token) {
            setNeedToLoginPopupState(true)
        } else {
            navigation.navigate('paymentOptionsScreen')
        }
    }

    render() {
        const { title } = this.props

        return (
            <TouchableOpacity
                style={styles.container}
                onPress={this.onPress}>
                <View style={styles.iconContainer}>
                    <Ionicons size={32} name='ios-wallet' color={COLORS.PRIMARY} />
                </View>
                <View style={styles.paymentInfoContainer}>
                    <View style={styles.paymentInfoTextContainer}>
                        <Text numberOfLines={1} style={styles.paymentTitle}>{title}</Text>
                    </View>
                </View>
                <View style={styles.iconContainer}>
                    <MaterialIcons color={COLORS.GRAY} size={32} name='chevron-right' />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: '8@s',
        padding: '4@s',
        flex: 1
    },
    paymentInfoContainer: {
        flexDirection: 'column',
        marginHorizontal: '8@s',
        padding: '4@s',
        flex: 5
    },
    paymentInfoTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    paymentTitle: {
        fontSize: '17@s',
        marginVertical: '4@s'
    },
    paymentDetail: {
        fontSize: '17@s',
        marginVertical: '4@s'
    }
})

export default ShadowContainerHoc(PaymentTypeSelectComponent)
