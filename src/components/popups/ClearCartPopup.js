import React from 'react'

import Modal, { ModalTitle, ModalButton, ModalFooter } from 'react-native-modals'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import { clearCart } from '../../actions/cart-actions'
import { setClearCartPopupState } from '../../actions/global-actions'

class ClearCartPopup extends React.Component {
    close = () => {
        this.props.setClearCartPopupState(false)

        return true
    }

    onConfirm = () => {
        this.props.setClearCartPopupState(false)
        this.props.clearCart(this.props.token)
    }

    render() {
        return (
            <Modal
                onTouchOutside={this.close}
                width={0.9}
                visible={this.props.clearCartPopupState}
                onSwipeOut={this.close}
                onHardwareBackPress={this.close}
                children={null}
                useNativeDriver
                modalTitle={(
                    <ModalTitle
                        style={styles.title}
                        textStyle={styles.titleText}
                        title='Sepeti boşatmak istediğinizden emin misiniz?'
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
        backgroundColor: '#697488'
    },
    buttonYes: {
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    buttonText: {
        color: 'white'
    },
    title: {
        marginVertical: '6@s'
    },
    titleText: {
        textAlign: 'center',
        fontSize: '16@s'
    }
})

const mapStateToProps = ({ globalReducer: { clearCartPopupState }, sourceReducer: { token } }) => ({
    clearCartPopupState,
    token
})

const mapDispatchToProps = {
    clearCart,
    setClearCartPopupState
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearCartPopup)
