import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	Text,
	StyleSheet
} from 'react-native'
import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'

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
							text='Tamam'
							textStyle={styles.buttonText}
							style={styles.button}
							onPress={this.close}
							key='button-1'
						/>
					</ModalFooter>
				)}>
				<ModalContent style={styles.content}>
					<Text style={styles.text}>{this.props.title}</Text>
				</ModalContent>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	footer: {
		height: RFValue(42, 600)
	},
	content: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		height: RFValue(72, 600)
	},
	text: {
		fontSize: RFValue(16, 600),
		fontWeight: 'bold',
		marginBottom: -6
	},
	button: {
		backgroundColor: 'rgba(0,0,0,.8)'
	},
	buttonText: {
		color: 'white'
	}
})

export default PasswordChangedPopup
