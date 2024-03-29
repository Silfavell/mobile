import React from 'react'

import joi from 'react-native-joi'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { updateProfile } from '../../actions/source-actions'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import InputIcon from '../../components/InputIcon/InputIcon'
import ShadowContainerHoc from '../../components/ShadowContainerHoc/ShadowContainerHoc'
import { COLORS } from '../../scripts/colors'

class EditProfileForm extends React.Component {
    state = {
        nameSurname: this.props.user.nameSurname,
        phoneNumber: this.props.user.phoneNumber,
        email: this.props.user.email,

        invalidNameSurname: false,
        invalidEmail: false,

        isNameSurnameInitialized: true,
        isEmailInitialized: true
    }

    onNameSurnameChange = (nameSurname) => {
        joi.string()
            .trim()
            .validate(nameSurname, (err) => {
                this.setState({ nameSurname, isNameSurnameInitialized: true, invalidNameSurname: !!err })
            })
    }

    onEmailChange = (email) => {
        joi.string()
            .trim()
            .strict()
            .email()
            .validate(email, (err) => {
                this.setState({ email, isEmailInitialized: true, invalidEmail: !!err })
            })
    }

    onPhoneChange = (formatted, extracted) => {
        joi
            .string()
            .trim()
            .strict()
            .min(19)
            .max(19)
            .validate(formatted, () => {
                this.setState({ phoneNumber: extracted /* isPhoneNumberInitialized: true, invalidPhoneNumber: true */ })
            })
    }

    onSaveClick = () => {
        this.props.updateProfile({
            nameSurname: this.state.nameSurname,
            email: this.state.email
        }, () => {
            this.props.messagePopupRef?.showMessage({ message: 'Bilgileriniz güncellendi' })
            this.props.navigation.goBack()
        })
    }

    render() {
        return (
            <>
                <InputComponent
                    options={{
                        textContentType: 'name',
                        placeholder: 'Ad Soyad'
                    }}
                    invalid={this.state.invalidNameSurname && this.state.isNameSurnameInitialized}
                    value={this.state.nameSurname}
                    onChange={this.onNameSurnameChange}>
                    <InputIcon>
                        <Ionicons size={32} name='md-person' color={COLORS.PRIMARY} />
                    </InputIcon>

                </InputComponent>

                <InputComponent
                    options={{
                        keyboardType: 'email-address',
                        textContentType: 'emailAddress',
                        placeholder: 'E-Posta'
                    }}
                    invalid={this.state.invalidEmail && this.state.isEmailInitialized}
                    value={this.state.email}
                    onChange={this.onEmailChange}>
                    <InputIcon>
                        <Ionicons size={32} name='md-mail-open' color={COLORS.PRIMARY} />
                    </InputIcon>

                </InputComponent>

                <InputComponent
                    options={{
                        keyboardType: 'phone-pad',
                        textContentType: 'telephoneNumber',
                        placeholder: 'Telefon Numarası',
                        maxLength: 19
                    }}
                    mask='telephoneNumber'
                    value={this.state.phoneNumber}
                    disabled
                    onChange={this.onPhoneChange}>
                    <InputIcon>
                        <Ionicons size={32} name='md-phone-portrait' color={COLORS.PRIMARY} />
                    </InputIcon>

                </InputComponent>

                <ButtonComponent
                    text='Kaydet'
                    onClick={this.onSaveClick}
                    disabled={
                        this.state.invalidEmail || !this.state.isEmailInitialized
                        || this.state.invalidNameSurname || !this.state.isNameSurnameInitialized
                    } />
            </>
        )
    }
}

const mapStateToProps = ({ sourceReducer: { user }, globalReducer: { messagePopupRef } }) => ({
    user,
    messagePopupRef
})

const mapDispatchToProps = {
    updateProfile
}

export default ShadowContainerHoc(connect(mapStateToProps, mapDispatchToProps)(EditProfileForm))
