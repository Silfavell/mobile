import React from 'react'

import { Text } from 'react-native'
import Modal, { ModalButton, ModalFooter, ModalContent } from 'react-native-modals'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'

class PasswordChangedPopup extends React.Component {
    close = () => {
        this.props.setPopupState({ scaleAnimationModal: false })

        return true
    }

    render() {
        return (
            <Modal
                onTouchOutside={this.close}
                width={0.9}
                visible={this.props.scaleAnimationModal}
                onSwipeOut={this.close}
                onHardwareBackPress={this.close}
                useNativeDriver
                footer={(
                    <ModalFooter style={styles.footer}>
                        <ModalButton
                            text='Tamam'
                            textStyle={styles.buttonText}
                            style={styles.button}
                            onPress={this.close}
                            key='button-1' />
                    </ModalFooter>
                )}>
                <ModalContent style={styles.content}>
                    <Text style={styles.text}>{this.props.title}</Text>
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
    image: {
        height: '72@s'
    },
    text: {
        fontSize: '16@s',
        fontWeight: 'bold',
        marginBottom: -6
    },
    button: {
        backgroundColor: COLORS.PRIMARY
    },
    buttonText: {
        color: COLORS.LIGHT
    }
})

export default PasswordChangedPopup
