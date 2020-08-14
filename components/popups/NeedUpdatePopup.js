import React from 'react'
import {
	Text
} from 'react-native'
import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'
import { ScaledSheet } from 'react-native-size-matters'

//  import { expo } from '../../app.json'
//  expo.version // current version

class NeedUpdatePopup extends React.PureComponent {
	close = () => {
		console.log('Close App')
		this.props.setPopupState({ scaleAnimationModal: false })
		return true
	}

	onConfirm = () => {
		console.log('Go to playstore')
	}

	render() {
		return (
			<Modal
				onTouchOutside={this.close}
				width={0.9}
				visible
				onSwipeOut={this.close}
				onHardwareBackPress={this.close}
				footer={(
					<ModalFooter style={styles.footer}>

						<ModalButton
							text='Close'
							textStyle={styles.buttonText}
							style={styles.buttonNo}
							onPress={this.close}
							key='button-1'
						/>

						<ModalButton
							text='Update'
							textStyle={styles.buttonText}
							style={styles.buttonYes}
							onPress={this.onConfirm}
							key='button-2'
						/>

					</ModalFooter>
				)}
			>

				<ModalContent style={styles.content}>
					<Text style={styles.text}>Silfavell'in yeni bir sürümü var. Lütfen devam etmeden önce güncelleyiniz.</Text>
				</ModalContent>

			</Modal>
		)
	}
}

const styles = ScaledSheet.create({
	footer: {
		height: '42@s'
	},
	content: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: '17@s',
		fontWeight: 'bold',
		marginBottom: -6
	},
	buttonNo: {
		backgroundColor: '#697488'
	},
	buttonYes: {
		backgroundColor: 'rgba(0,0,0,.8)'
	},
	buttonText: {
		color: 'white'
	}
})

export default NeedUpdatePopup
