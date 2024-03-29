import React from 'react'

import { ScrollView, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputComponent from '../../components/InputComponent/InputComponent'
import AlertPopup from '../../components/popups/AlertPopup'
import { COLORS } from '../../scripts/colors'
import { postTicket } from '../../scripts/requests'

class HelpScreen extends React.Component {
  state = {
      // autofill ?
      scaleAnimationModal: false,
      name: '',
      surname: '',
      email: '',
      subject: '',
      message: ''
  };

  setPopupState = ({ scaleAnimationModal }) => {
      this.setState({ scaleAnimationModal })

      if (!scaleAnimationModal) {
          this.props.navigation.pop()
      }
  };

  onNameChange = (name) => {
      this.setState({ name })
  };

  onSurnameChange = (surname) => {
      this.setState({ surname })
  };

  onEmailChange = (email) => {
      this.setState({ email })
  };

  onSubjectChange = (subject) => {
      this.setState({ subject })
  };

  onMessageChange = (message) => {
      this.setState({ message })
  };

  onSendClick = async () => {
      const {
          name, surname, email, subject, message
      } = this.state

      const { status } = await postTicket({
          name,
          surname,
          email,
          subject,
          message
      })

      if (status === 200) {
          this.setState({ scaleAnimationModal: true })
      }
  };

  render() {
      const {
          name, surname, email, subject, message, scaleAnimationModal
      } = this.state

      return (
          <ScrollView contentContainerStyle={styles.container}>
              <AlertPopup
                  title='Mesajınız iletildi'
                  scaleAnimationModal={scaleAnimationModal}
                  setPopupState={this.setPopupState} />

              <View>
                  <InputComponent
                      options={{
                          placeholder: 'Adınız'
                      }}
                      onChange={this.onNameChange}
                      value={name} />

                  <InputComponent
                      options={{
                          placeholder: 'Soyadınız'
                      }}
                      onChange={this.onSurnameChange}
                      value={surname} />

                  <InputComponent
                      options={{
                          placeholder: 'E-Posta'
                      }}
                      onChange={this.onEmailChange}
                      value={email} />

                  <InputComponent
                      options={{
                          placeholder: 'Konu'
                      }}
                      onChange={this.onSubjectChange}
                      value={subject} />

                  <InputComponent
                      options={{
                          placeholder: 'Mesaj'
                      }}
                      multiline
                      onChange={this.onMessageChange}
                      value={message} />
              </View>

              <ButtonComponent
                  text='Gönder'
                  onClick={this.onSendClick}
                  disabled={
                      name.length === 0
            || surname.length === 0
            || email.length === 0
            || subject.length === 0
            || message.length === 0
                  } />
          </ScrollView>
      )
  }
}

const styles = ScaledSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: COLORS.LIGHT
    }
})

export default HelpScreen
