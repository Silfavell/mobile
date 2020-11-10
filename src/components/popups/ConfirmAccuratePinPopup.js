import React from 'react'

import { Text } from 'react-native'
import Modal, { ModalButton, ModalFooter, ModalContent } from 'react-native-modals'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { COLORS } from '../../scripts/colors'

class ConfirmAccuratePinPopup extends React.Component {
        close = () => {
            this.props.setPopupState(false)

            return true
        }

        onConfirm = () => {
            this.props.setPopupState(false, true, this.props.region)
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
                    )}>
                    <ModalContent style={styles.content}>
                        <Ionicons color={COLORS.TERTIARY} size={92} name='md-map' />
                        <Text style={styles.contentText}>Siparişiniz haritadaki konuma teslim edilecektir. Konumunun doğru olduğuna emin misiniz ?</Text>
                    </ModalContent>
                </Modal>
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
    content: {
        backgroundColor: COLORS.LIGHT,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentImage: {
        height: '92@s'
    },
    contentText: {
        fontSize: '16@s',
        fontWeight: 'bold',
        marginTop: '12@s',
        marginBottom: -6,
        textAlign: 'center'
    }
})

const mapStateToProps = ({ mapReducer: { region } }) => ({
    region
})

export default connect(mapStateToProps)(ConfirmAccuratePinPopup)
