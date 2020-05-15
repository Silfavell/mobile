import React from 'react'
import {
	Text,
	StyleSheet
} from 'react-native'
import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'
import { RFValue } from 'react-native-responsive-fontsize'

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
							text="Close"
							textStyle={styles.buttonText}
							style={styles.buttonNo}
							onPress={this.close}
							key="button-1"
						/>

						<ModalButton
							text="Update"
							textStyle={styles.buttonText}
							style={styles.buttonYes}
							onPress={this.onConfirm}
							key="button-2"
						/>

					</ModalFooter>
				)}
			>

				<ModalContent style={styles.content}>
					<Text style={styles.text}>There are more recent version of our application. Please update to continue.</Text>
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
	text: {
		fontSize: RFValue(17, 600),
		fontWeight: 'bold',
		marginBottom: -6
	},
	buttonNo: {
		backgroundColor: '#697488'
	},
	buttonYes: {
		backgroundColor: '#DB0099'
	},
	buttonText: {
		color: 'white'
	}
})

export default NeedUpdatePopup
