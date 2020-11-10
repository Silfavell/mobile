import React from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import {
    View,
    TouchableOpacity,
    Text,
    Linking
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import AskPopup from '../../components/popups/AskPopup'
import { COLORS } from '../../scripts/colors'

class ThanksScreen extends React.Component {
    state = {
        scaleAnimationModal: false,
        isRatePlaystoreAsked: false
    }

    setPopupState = (state) => {
        this.setState(state, () => {
            this.props.navigation.popToTop()
            this.props.navigation.navigate('home')
        })
    }

    moveToPlayStore = async () => {
        await AsyncStorage.setItem('isRatePlaystoreAsked', '')
        Linking.openURL('market://details?id=com.silfavell.android')
    }

    onGoHomeClick = () => {
        if (AsyncStorage.getItem('isRatePlaystoreAsked') || this.state.isRatePlaystoreAsked) {
            this.props.navigation.popToTop()
            this.props.navigation.navigate('home')
        } else {
            this.setState({
                scaleAnimationModal: true,
                isRatePlaystoreAsked: true
            })
        }
    }

    render() {
        return (
            <View style={styles.emptyCartContainer}>
                <AskPopup
                    func={this.moveToPlayStore}
                    title='Silfavelli puanlamak ister misiniz ?'
                    scaleAnimationModal={this.state.scaleAnimationModal}
                    setPopupState={this.setPopupState} />

                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child} />
                <View style={styles.child}>
                    <Ionicons name='md-checkmark-circle-outline' size={96} color='#4CAB51' />
                </View>
                <View style={styles.child} />
                <View style={styles.child}>
                    <Text style={styles.orderCompletedText}>Siparişiniz alınmıştır</Text>
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
        backgroundColor: '#4CAB51',
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

export default ThanksScreen
