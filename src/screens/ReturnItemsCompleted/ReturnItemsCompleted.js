import React from 'react'

import {
    View,
    TouchableOpacity,
    Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '../../scripts/colors'

class ReturnItemsCompleted extends React.PureComponent {
    onGoHomeClick = () => {
        this.props.navigation.popToTop()
        this.props.navigation.navigate('home')
    }

    render() {
        return (
            <View style={styles.emptyCartContainer}>
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child}>
                    <Ionicons name='md-checkmark-circle-outline' size={96} color={COLORS.PRIMARY} />
                </View>
                <View style={styles.child} />
                <View style={styles.child}>
                    <Text style={styles.orderCompletedText}>Iade talebiniz alınmıştır</Text>
                </View>
                <View style={styles.child} />
                <View style={[styles.child, styles.goToHomeButtonContainer]}>
                    <TouchableOpacity
                        onPress={this.onGoHomeClick}
                        style={styles.goToHomeButton}>
                        <Text style={styles.goToHomeButtonText}>Ana Sayfaya Git</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    emptyCartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.GRAY
    },
    child: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    orderCompletedText: {
        fontSize: '22@s',
        textAlign: 'center'
    },
    goToHomeButtonContainer: {
        display: 'flex'
    },
    goToHomeButton: {
        backgroundColor: COLORS.SECONDARY,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        margin: '18@s',
        padding: '18@s',
        paddingHorizontal: '48@s'
    },
    goToHomeButtonText: {
        color: COLORS.LIGHT,
        fontSize: '20@s',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ReturnItemsCompleted
