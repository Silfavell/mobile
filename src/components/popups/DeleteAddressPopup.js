import React from 'react'

import Modal, { ModalTitle, ModalButton, ModalFooter } from 'react-native-modals'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'

class DeleteAddressPopup extends React.Component {
        close = () => {
            this.props.setPopupState({ scaleAnimationModal: false })

            return true
        }

        onConfirm = () => {
            this.props.setPopupState({ scaleAnimationModal: false }, true)
        }

        render() {
            return (
                <Modal
                    onTouchOutside={this.close}
                    width={0.9}
                    visible={this.props.scaleAnimationModal}
                    onSwipeOut={this.close}
                    onHardwareBackPress={this.close}
                    children={null}
                    useNativeDriver
                    modalTitle={(
                        <ModalTitle
                            style={styles.title}
                            textStyle={styles.titleText}
                            title='Adresi silmek istediğinize emin misiniz ?'
                            hasTitleBar={false} />
                    )}
                    footer={(
                        <ModalFooter style={styles.footer}>
                            <ModalButton
                                text='Hayır'
                                textStyle={styles.buttonText}
                                style={styles.buttonNo}
                                onPress={this.close}
                                key='button-1' />
                            <ModalButton
                                text='Evet'
                                textStyle={styles.buttonText}
                                style={styles.buttonYes}
                                onPress={this.onConfirm}
                                key='button-2' />
                        </ModalFooter>
                    )} />
            )
        }
}

const styles = ScaledSheet.create({
    footer: {
        height: '42@s'
    },
    buttonNo: {
        backgroundColor: COLORS.TERTIARY
    },
    buttonYes: {
        backgroundColor: COLORS.SECONDARY
    },
    buttonText: {
        color: COLORS.LIGHT
    },
    title: {
        marginVertical: '8@s'
    },
    titleText: {
        textAlign: 'center'
    }
})

export default DeleteAddressPopup
