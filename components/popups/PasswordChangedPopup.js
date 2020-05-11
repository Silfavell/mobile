import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { Image, Text, StyleSheet } from 'react-native'
import Modal, { ModalButton, ModalFooter, ModalContent } from 'react-native-modals'

import verifyImage from '../../assets/verify-image.jpeg'

class PasswordChangedPopup extends React.PureComponent {
	close = () => {
		this.props.setPopupState({ scaleAnimationModal: false })
		return true
	}

	render() {
		return (
			<Modal
				onTouchOutside={this.close}
				width={0.9}
				visible={this.props.scaleAnimationModal}
				onSwipeOut={this.close}
				onHardwareBackPress={this.close}
				footer={(
					<ModalFooter style={styles.footer}>
						<ModalButton
							text="OK"
							textStyle={styles.buttonText}
							style={styles.button}
							onPress={this.close}
							key="button-1"
						/>
					</ModalFooter>
				)}
			>
				<ModalContent style={styles.content}>
					<Image style={styles.image} source={verifyImage} />
					<Text style={styles.text}>Şifre başarılı bir şekilde değiştirildi</Text>
				</ModalContent>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	footer: { height: RFValue(42, 600) },
	content: { backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
	image: { height: RFValue(72, 600) },
	text: {
		fontSize: RFValue(16, 600), fontWeight: 'bold', marginTop: RFValue(12, 600), marginBottom: -6,
	},
	button: { backgroundColor: '#D000DB' },
	buttonText: { color: 'white' },
})

export default PasswordChangedPopup
