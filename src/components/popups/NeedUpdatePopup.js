import React from 'react'

import { Text, Linking } from 'react-native'
import Modal, { ModalButton, ModalFooter, ModalContent } from 'react-native-modals'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import { COLORS } from '../../scripts/colors'
//  import { expo } from '../../app.json'
//  expo.version // current version

class NeedUpdatePopup extends React.Component {
    onConfirm = () => {
        Linking.openURL('market://details?id=com.silfavell.android')
    }

    render() {
        return (
            <Modal
                onTouchOutside={this.close}
                width={0.9}
                visible={this.props.needUpdatePopupState}
                onSwipeOut={this.close}
                onHardwareBackPress={this.close}
                useNativeDriver
                footer={(
                    <ModalFooter style={styles.footer}>
                        <ModalButton
                            text='Güncelle'
                            textStyle={styles.buttonText}
                            style={styles.buttonYes}
                            onPress={this.onConfirm}
                            key='button-2' />
                    </ModalFooter>
                )}>
                <ModalContent style={styles.content}>
                    <Text style={styles.text}>{'Silfavell\'in yeni bir sürümü var. Lütfen devam etmeden önce güncelleyiniz.'}</Text>
                </ModalContent>
            </Modal>
        )
    }
}

const styles = ScaledSheet.create({
    footer: {
        height: '42@s'
    },
    content: {
        backgroundColor: COLORS.LIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: '17@s',
        fontWeight: 'bold',
        marginBottom: -6,
        textAlign: 'center'
    },
    buttonNo: {
        backgroundColor: COLORS.TERTIARY
    },
    buttonYes: {
        backgroundColor: COLORS.SECONDARY
    },
    buttonText: {
        color: COLORS.LIGHT
    }
})

const mapStateToProps = ({ globalReducer: { needUpdatePopupState } }) => ({
    needUpdatePopupState
})

export default connect(mapStateToProps)(NeedUpdatePopup)
