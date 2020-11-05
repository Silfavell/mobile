import React from 'react'

import Modal, { ModalTitle, ModalButton, ModalFooter } from 'react-native-modals'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import { setNeedToLoginPopupState } from '../../actions/global-actions'

class NeedToLoginPopup extends React.Component {
    shouldComponentUpdate() {
        return false
    }

    close = () => {
        this.props.setNeedToLoginPopupState(false)

        return true
    };

    render() {
        return (
            <Modal
                onTouchOutside={this.close}
                width={0.9}
                visible={this.props.needToLoginPopupState}
                onSwipeOut={this.close}
                onHardwareBackPress={this.close}
                children={null}
                useNativeDriver
                modalTitle={(
                    <ModalTitle
                        style={styles.title}
                        textStyle={styles.titleText}
                        title='Devam etmeden önce giriş yapmalısın'
                        hasTitleBar={false} />
                )}
                footer={(
                    <ModalFooter style={styles.footer}>
                        <ModalButton
                            text='Tamam'
                            textStyle={styles.buttonText}
                            style={styles.buttonOk}
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
    buttonOk: {
        backgroundColor: 'rgba(0,0,0,.8)'
    },
    buttonText: {
        color: 'white'
    },
    title: {
        marginVertical: '8@s'
    },
    titleText: {
        textAlign: 'center',
        fontSize: 16
    }
})

const mapStateToProps = ({ globalReducer: { needToLoginPopupState, navigation } }) => ({
    needToLoginPopupState,
    navigation
})

const mapDispatchToProps = {
    setNeedToLoginPopupState
}

export default connect(mapStateToProps, mapDispatchToProps)(NeedToLoginPopup)
