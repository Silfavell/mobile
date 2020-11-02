import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import Modal, { ModalTitle, ModalButton, ModalFooter, ModalContent } from 'react-native-modals'

class ConfirmAddressPopup extends React.PureComponent {
  close = () => {
      this.props.setPopupState(false)
      return true
  };

  onConfirm = () => {
      this.props.setPopupState(false, true, this.props.address)
  };

  render() {
      return (
          <Modal
              onTouchOutside={this.close}
              width={0.9}
              visible={this.props.scaleAnimationModal}
              onSwipeOut={this.close}
              onHardwareBackPress={this.close}
              modalTitle={
                  <ModalTitle
                      style={styles.title}
                      textStyle={styles.titleText}
                      title="Bu adresin doğru olduğuna emin misiniz ?"
                      hasTitleBar={false}
                  />
              }
              footer={
                  <ModalFooter style={styles.footer}>
                      <ModalButton
                          text="Hayır"
                          textStyle={styles.buttonText}
                          style={styles.buttonNo}
                          onPress={this.close}
                          key="button-1"
                      />
                      <ModalButton
                          text="Evet"
                          textStyle={styles.buttonText}
                          style={styles.buttonYes}
                          onPress={this.onConfirm}
                          key="button-2"
                      />
                  </ModalFooter>
              }>
              <ModalContent style={styles.content}>
                  <Text numberOfLines={3} style={styles.contentText}>
                      {this.props.address}
                  </Text>
              </ModalContent>
          </Modal>
      )
  }
}

const styles = ScaledSheet.create({
    footer: {
        height: '42@s',
    },
    buttonNo: {
        backgroundColor: '#697488',
    },
    buttonYes: {
        backgroundColor: 'rgba(0,0,0,.8)',
    },
    buttonText: {
        color: 'white',
    },
    title: {
        marginVertical: '8@s',
    },
    titleText: {
        textAlign: 'center',
        color: 'rgba(0,0,0,.8)',
        fontWeight: '600',
        fontSize: '19@s',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentText: {
        fontSize: '16@s',
        color: '#454545',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

const mapStateToProps = ({ mapReducer: { address } }) => ({
    address,
})

export default connect(mapStateToProps)(ConfirmAddressPopup)
