import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StyleSheet } from 'react-native'
import Modal, {
	ModalTitle,
	ModalButton,
	ModalFooter
} from 'react-native-modals'

class DeleteAddressPopup extends React.PureComponent {
	close = () => {
		this.props.setPopupState({ scaleAnimationModal: false })
		return true
	}

	onConfirm = () => {
		this.props.setPopupState({ scaleAnimationModal: false }, true)
	}

	render() {
		return (
			<Modal
				onTouchOutside={this.close}
				width={0.9}
				visible={this.props.scaleAnimationModal}
				onSwipeOut={this.close}
				onHardwareBackPress={this.close}
				modalTitle={(
					<ModalTitle
						style={styles.title}
						textStyle={styles.titleText}
						title="Adresi silmek istediğine emin misin ?"
						hasTitleBar={false}
					/>
				)}
				footer={(
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
				)}
			/>
		)
	}
}

const styles = StyleSheet.create({
	footer: {
		height: RFValue(42, 600)
	},
	buttonNo: {
		backgroundColor: '#697488'
	},
	buttonYes: {
		backgroundColor: '#DB0099'
	},
	buttonText: {
		color: 'white'
	},
	title: {
		marginVertical: RFValue(8, 600)
	},
	titleText: {
		textAlign: 'center'
	}
})

export default DeleteAddressPopup
