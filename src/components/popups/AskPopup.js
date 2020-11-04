import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import Modal, {
	ModalTitle,
	ModalButton,
	ModalFooter
} from 'react-native-modals'

class AskPopup extends React.PureComponent {
	close = () => {
		this.props.setPopupState({ scaleAnimationModal: false })
		return true
	}

	onConfirm = () => {
		this.props.setPopupState({ scaleAnimationModal: false })
		this.props.func()
	}

	render() {
		return (
			<Modal
				onTouchOutside={this.close}
				width={0.9}
				visible={this.props.scaleAnimationModal}
				onSwipeOut={this.close}
				onHardwareBackPress={this.close}
				children={null}
				useNativeDriver={true}
				modalTitle={(
					<ModalTitle
						style={styles.title}
						textStyle={styles.titleText}
						title={this.props.title}
						hasTitleBar={false}
					/>
				)}
				footer={(
					<ModalFooter style={styles.footer}>
						<ModalButton
							text='Hayır'
							textStyle={styles.buttonText}
							style={styles.buttonNo}
							onPress={this.close}
							key='button-1'
						/>
						<ModalButton
							text='Evet'
							textStyle={styles.buttonText}
							style={styles.buttonYes}
							onPress={this.onConfirm}
							key='button-2'
						/>
					</ModalFooter>
				)}
			/>
		)
	}
}

const styles = ScaledSheet.create({
	footer: {
		height: '42@s'
	},
	buttonNo: {
		backgroundColor: '#697488'
	},
	buttonYes: {
		backgroundColor: 'rgba(0,0,0,.8)'
	},
	buttonText: {
		color: 'white'
	},
	title: {
		marginVertical: '6@s'
	},
	titleText: {
		textAlign: 'center',
		fontSize: '16@s'
	}
})

export default AskPopup