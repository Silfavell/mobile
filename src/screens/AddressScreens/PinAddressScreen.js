import React from 'react'

import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ButtonComponent from '../../components/ButtonComponent'
import ConfirmAccuratePinPopup from '../../components/popups/ConfirmAccuratePinPopup'
import { COLORS } from '../../scripts/colors'
import HeaderAddressInput from '../MapScreens/HeaderAddressInput'
import Map from '../MapScreens/Map'

class PinAddressScreen extends React.Component {
    state = {
        scaleAnimationModal: false
    }

    setPopupState = (scaleAnimationModal, navigate, region) => {
        this.setState({ scaleAnimationModal })

        if (navigate) {
            this.props.navigation.navigate('completeAddressScreen', { region })
        }
    }

    onUseThisAddressClick = () => {
        this.setPopupState(true)
    }

    render() {
        return (
            <View style={styles.container}>
                <ConfirmAccuratePinPopup
                    setPopupState={this.setPopupState}
                    scaleAnimationModal={this.state.scaleAnimationModal} />

                <HeaderAddressInput disabled />

                <Map region={this.props.route.params.region} />

                <View style={styles.markerContainer} pointerEvents='none'>
                    <Ionicons color={COLORS.TERTIARY} size={48} name='md-pin' />
                </View>

                <View style={styles.buttonContainer}>
                    <ButtonComponent text='Bu Adresi Kullan' onClick={this.onUseThisAddressClick} needFlex />
                </View>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    markerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2@s'
    },
    marker: { width: 48, height: 48 },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        height: 78,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        zIndex: '2@s',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: '24@s',
        paddingVertical: '24@s'
    }
})

export default PinAddressScreen
