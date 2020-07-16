import React from 'react'
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native'
import axios from 'axios'

import ButtonComponent from '../components/ButtonComponent'
import InputComponent from '../components/InputComponent'
import AlertPopup from '../components/popups/AlertPopup'

import { SERVER_URL } from '../utils/global'

class HelpScreen extends React.PureComponent {

    state = { // autofill ?
        scaleAnimationModal: false,
        name: '',
        surname: '',
        email: '',
        subject: '',
        message: ''
    }

    setPopupState = ({ scaleAnimationModal }) => {
        this.setState({ scaleAnimationModal })

        if (!scaleAnimationModal) {
            this.props.navigation.pop()
        }
    }

    onNameChange = (name) => {
        this.setState({ name })
    }

    onSurnameChange = (surname) => {
        this.setState({ surname })
    }

    onEmailChange = (email) => {
        this.setState({ email })
    }

    onSubjectChange = (subject) => {
        this.setState({ subject })
    }

    onMessageChange = (message) => {
        this.setState({ message })
    }

    onSendClick = () => {
        const {
            name,
            surname,
            email,
            subject,
            message
        } = this.state

        axios.post(`${SERVER_URL}/ticket`, {
            name,
            surname,
            email,
            subject,
            message
        }).then(({ status }) => {
            if (status === 200) {
                this.setState({ scaleAnimationModal: true })
            }
        })
    }

    render() {
        const {
            name,
            surname,
            email,
            subject,
            message,
            scaleAnimationModal
        } = this.state

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <AlertPopup
                    title={'Mesajınız iletildi'}
                    scaleAnimationModal={scaleAnimationModal}
                    setPopupState={this.setPopupState} />

                <View>
                    <InputComponent
                        options={{
                            placeholder: 'Adınız'
                        }}
                        onChange={this.onNameChange}
                        value={name}
                    />

                    <InputComponent
                        options={{
                            placeholder: 'Soyadınız'
                        }}
                        onChange={this.onSurnameChange}
                        value={surname}
                    />

                    <InputComponent
                        options={{
                            placeholder: 'E-mail'
                        }}
                        onChange={this.onEmailChange}
                        value={email}
                    />

                    <InputComponent
                        options={{
                            placeholder: 'Konu'
                        }}
                        onChange={this.onSubjectChange}
                        value={subject}
                    />

                    <InputComponent
                        options={{
                            placeholder: 'Mesaj'
                        }}
                        multiline
                        onChange={this.onMessageChange}
                        value={message}
                    />

                </View>

                <ButtonComponent
                    text='Tamamla'
                    onClick={this.onSendClick}
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between'
    }
})

export default HelpScreen