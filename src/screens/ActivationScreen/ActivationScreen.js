import React from 'react'

import { TouchableOpacity, Text } from 'react-native'
import joi from 'react-native-joi'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { register } from '../../actions/source-actions'
import ButtonComponent from '../../components/ButtonComponent'
import InputComponent from '../../components/InputComponent'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import { sendActivationCode } from '../../scripts/requests'

class ActivationScreen extends React.Component {
  state = {
      activationCode: '',
      invalidActivationCode: false,
      isActivationCodeInitialized: false
  };

  onRegisterClick = () => {
      this.props.register(
          { ...this.props.route.params, activationCode: this.state.activationCode },
          () => {
              this.props.navigation.navigate('Loading', { next: true })
          }
      )
  };

  onActivationCodeChange = (activationCode) => {
      joi
          .string()
          .trim()
          .strict()
          .min(4)
          .max(4)
          .validate(activationCode, (err, val) => {
              this.setState({
                  activationCode: val,
                  isActivationCodeInitialized: true,
                  invalidActivationCode: !!err
              })
          })
  };

  onResendClick = () => {
      sendActivationCode({
          phoneNumber: this.props.route.params.phoneNumber,
          activationCodeType: 0 // REGISTER
      })
  };

  render() {
      return (
          <>
              <InputComponent
                  value={this.state.activationCode}
                  onChange={this.onActivationCodeChange}
                  invalid={this.state.invalidActivationCode && this.state.isActivationCodeInitialized}
                  options={{
                      keyboardType: 'number-pad',
                      placeholder: 'Aktivasyon kodu',
                      maxLength: 4
                  }} />

              <ButtonComponent
                  disabled={this.state.invalidActivationCode || !this.state.isActivationCodeInitialized}
                  text='Kayıt Ol'
                  onClick={this.onRegisterClick} />

              <TouchableOpacity style={styles.resendContainer} onPress={this.onResendClick}>
                  <Ionicons name='md-refresh' size={28} color='#6E7586' />
                  <Text style={styles.resendCodeText}>Yeniden Gönder</Text>
              </TouchableOpacity>
          </>
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

const mapDistachToProps = {
    register
}

export default ShadowContainerHoc(connect(null, mapDistachToProps)(ActivationScreen))
