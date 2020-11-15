import React from 'react'

import joi from 'react-native-joi'
import { connect } from 'react-redux'

import ButtonComponent from '../../components/ButtonComponent'
import InputComponent from '../../components/InputComponent'
import AlertPopup from '../../components/popups/AlertPopup'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import { changePassword } from '../../scripts/requests'

class ChangePasswordForm extends React.Component {
    state = {
        scaleAnimationModal: false,

        oldPassword: '',
        password: '',

        invalidOldPassword: false,
        invalidPassword: false,

        isOldPasswordInitialized: false,
        isPasswordInitialized: false
    }

    setPopupState = ({ scaleAnimationModal }) => {
        this.setState({ scaleAnimationModal })
        if (!scaleAnimationModal) {
            this.props.navigation.pop()
        }
    }

    onChangePasswordClick = async () => {
        if (this.state.oldPassword === '' || this.state.password === '') {
            this.props.messagePopupRef.showMessage({ message: 'Lütfen gerekli alanlarını doldurunuz' })
        } else if (this.state.password.length < 4) {
            this.props.messagePopupRef.showMessage({ message: 'Yeni şifreniz en az 4 haneli olmalı' })
        } else if (this.state.oldPassword === this.state.password) {
            this.props.messagePopupRef.showMessage({ message: 'Yeni şifre eskisi ise aynı olamaz' })
        } else {
            const { status } = await changePassword({
                oldPassword: this.state.oldPassword,
                newPassword: this.state.password
            })

            if (status === 200) {
                this.setState({ scaleAnimationModal: true })
            }
        }
    }

    onOldPasswordChange = (oldPassword) => {
        joi.string()
            .alphanum()
            .min(4)
            .validate(oldPassword, (err) => {
                this.setState({ oldPassword, isOldPasswordInitialized: true, invalidOldPassword: !!err })
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
            <>
                <AlertPopup
                    title='Şifreniz güncellendi'
                    scaleAnimationModal={this.state.scaleAnimationModal}
                    setPopupState={this.setPopupState} />

                <InputComponent
                    options={{
                        secureTextEntry: true,
                        textContentType: 'password',
                        placeholder: 'Geçerli şifre'
                    }}
                    invalid={this.state.invalidOldPassword && this.state.isOldPasswordInitialized}
                    value={this.state.oldPassword}
                    onChange={this.onOldPasswordChange} />

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
                        this.state.invalidPassword || !this.state.isPasswordInitialized
                        || this.state.invalidOldPassword || !this.state.isOldPasswordInitialized
                    }
                    text='Şifremi Değiştir'
                    onClick={this.onChangePasswordClick} />
            </>
        )
    }
}

const mapStateToProps = ({ globalReducer: { messagePopupRef } }) => ({
    messagePopupRef
})

export default ShadowContainerHoc(connect(mapStateToProps)(ChangePasswordForm))
