import React from 'react'

import {
    TouchableOpacity,
    Text
} from 'react-native'
import joi from 'react-native-joi'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import ButtonComponent from '../../components/ButtonComponent'
import InputComponent from '../../components/InputComponent'
import AlertPopup from '../../components/popups/AlertPopup'
import ShadowContainer from '../../components/ShadowContainer'
import { resetPassword, sendActivationCode } from '../../scripts/requests'

class ResetPasswordScreen extends React.Component {
    state = {
        scaleAnimationModal: false,
        errorMessage: '',

        phoneNumber: this.props.route.params.phoneNumber,
        activationCode: '',
        password: '',

        invalidPhoneNumber: false,
        invalidActivationCode: false,
        invalidPassword: false,

        isPhoneNumberInitialized: true,
        isActivationCodeInitialized: false,
        isPasswordInitialized: false
    }

    setPopupState = ({ scaleAnimationModal }) => {
        this.setState({ scaleAnimationModal })
        if (!scaleAnimationModal) {
            this.props.navigation.navigate('Welcome', { screen: 'login' })
        }
    }

    showMessagePopupFromError = (errorMessage) => {
        this.setState({ errorMessage }, () => {
            this.props.messagePopupRef.showMessage({ message: this.state.errorMessage })
        })
    }

    onResetPasswordClick = async () => {
        if (this.state.activationCode === '' || this.state.password === '' || this.state.phoneNumber === '') {
            this.props.messagePopupRef.showMessage({ message: 'Lütfen gerekli alanlarını doldurunuz' })
        } else if (this.state.password.length < 4) {
            this.props.messagePopupRef.showMessage({ message: 'Yeni şifreniz en az 4 haneli olmalı' })
        } else {
            const { status } = await resetPassword({
                activationCode: this.state.activationCode,
                phoneNumber: this.state.phoneNumber,
                newPassword: this.state.password
            })

            if (status === 200) {
                this.setState({ scaleAnimationModal: true })
            }
        }
    }

    onResendClick = () => {
        sendActivationCode({
            phoneNumber: this.state.phoneNumber,
            activationCodeType: 1 // RESET // TODO TS
        })
    }

    onPhoneChange = (phoneNumber) => {
        joi.string()
            .trim()
            .strict()
            .min(19)
            .max(19)
            .validate(phoneNumber, (err) => {
                this.setState({ phoneNumber, isPhoneNumberInitialized: true, invalidPhoneNumber: !!err })
            })
    }

    onActivationCodeChange = (activationCode) => {
        joi.string()
            .trim()
            .strict()
            .min(4)
            .max(4)
            .validate(activationCode, (err, val) => {
                this.setState({ activationCode: val, isActivationCodeInitialized: true, invalidActivationCode: !!err })
            })
    }

    onPasswordChange = (password) => {
        joi.string()
            .alphanum()
            .min(4)
            .validate(password, (err) => {
                this.setState({ password, isPasswordInitialized: true, invalidPassword: !!err })
            })
    }

    render() {
        return (
            <ShadowContainer>
                <AlertPopup
                    title='Şifreniz güncellendi'
                    scaleAnimationModal={this.state.scaleAnimationModal}
                    setPopupState={this.setPopupState} />

                {
                    //  <TextInput
                    //      keyboardType={'phone-pad'}
                    //      placeholder={'Country/Region Code'}
                    //      style={styles.input} />
                }

                <InputComponent
                    options={{
                        keyboardType: 'phone-pad',
                        textContentType: 'telephoneNumber',
                        placeholder: 'Telefon Numarası',
                        maxLength: 19
                    }}
                    mask='telephoneNumber'
                    invalid={this.state.invalidPhoneNumber && this.state.isPhoneNumberInitialized}
                    value={this.state.phoneNumber}
                    onChange={this.onPhoneChange} />

                <InputComponent
                    options={{
                        keyboardType: 'number-pad',
                        placeholder: 'Aktivasyon kodu',
                        maxLength: 4
                    }}
                    invalid={this.state.invalidActivationCode && this.state.isActivationCodeInitialized}
                    value={this.state.activationCode}
                    onChange={this.onActivationCodeChange} />

                <InputComponent
                    options={{
                        secureTextEntry: true,
                        textContentType: 'password',
                        placeholder: 'Yeni şifre (en az 4 karakter)'
                    }}
                    invalid={this.state.invalidPassword && this.state.isPasswordInitialized}
                    value={this.state.password}
                    onChange={this.onPasswordChange} />

                <ButtonComponent
                    disabled={
                        this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized
                        || this.state.invalidActivationCode || !this.state.isActivationCodeInitialized
                        || this.state.invalidPassword || !this.state.isPasswordInitialized
                    }
                    text='Şifremi Sıfırla'
                    onClick={this.onResetPasswordClick} />

                <TouchableOpacity style={styles.resendContainer} onPress={this.onResendClick}>
                    <Ionicons name='md-refresh' size={28} color='#6E7586' />
                    <Text style={styles.resendCodeText}>Yeniden gönder</Text>
                </TouchableOpacity>
            </ShadowContainer>
        )
    }
}

const styles = ScaledSheet.create({
    resendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    resendCodeText: {
        fontSize: '19@s',
        paddingHorizontal: '12@s',
        color: '#6E7586'
    }
})

const mapStateToProps = ({
    globalReducer: {
        messagePopupRef
    }
}) => ({
    messagePopupRef
})

export default connect(mapStateToProps)(ResetPasswordScreen)
