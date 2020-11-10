import React from 'react'

import joi from 'react-native-joi'
import Ionicons from 'react-native-vector-icons/Ionicons'

import ButtonComponent from '../../components/ButtonComponent'
import InputComponent from '../../components/InputComponent'
import InputIcon from '../../components/InputIcon'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import { COLORS } from '../../scripts/colors'
import { sendActivationCode } from '../../scripts/requests'

class ForgotPasswordScreen extends React.Component {
    state = {
        phoneNumber: '',

        isPhoneNumberInitialized: false,
        invalidPhoneNumber: false
    }

    onSendCodeClick = async () => {
        const { status } = await sendActivationCode({
            phoneNumber: this.state.phoneNumber,
            activationCodeType: 1 // RESET // TODO
        })

        if (status === 202) {
            this.props.navigation.navigate('resetPassword', { phoneNumber: this.state.phoneNumber })
        }
    }

    onPhoneChange = (formatted, extracted) => {
        joi
            .string()
            .trim()
            .strict()
            .min(19)
            .max(19)
            .validate(formatted, (err) => {
                this.setState({ phoneNumber: extracted, isPhoneNumberInitialized: true, invalidPhoneNumber: !!err })
            })
    }

    render() {
        return (
            <>
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
                    onChange={this.onPhoneChange}>
                    <InputIcon>
                        <Ionicons
                            size={32}
                            name='md-phone-portrait'
                            color={COLORS.TERTIARY} />
                    </InputIcon>
                </InputComponent>

                <ButtonComponent
                    text='Aktivasyon Kodu Gönder'
                    onClick={this.onSendCodeClick}
                    disabled={this.state.invalidPhoneNumber || !this.state.isPhoneNumberInitialized} />
            </>
        )
    }
}

export default ShadowContainerHoc(ForgotPasswordScreen)
