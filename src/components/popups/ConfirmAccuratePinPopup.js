import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'

class ConfirmAccuratePinPopup extends React.PureComponent {
	close = () => {
		this.props.setPopupState(false)
		return true
	}

	onConfirm = () => {
		this.props.setPopupState(false, true, this.props.region)
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
			>
				<ModalContent style={styles.content}>
					<Ionicons color='rgba(0,0,0,.8)' size={92} name='md-map' />
					<Text style={styles.contentText}>Siparişiniz haritadaki konuma teslim edilecektir. Konumunun doğru olduğuna emin misiniz ?</Text>
				</ModalContent>
			</Modal>
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
	content: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentImage: {
		height: '92@s'
	},
	contentText: {
		fontSize: '16@s',
		fontWeight: 'bold',
		marginTop: '12@s',
		marginBottom: -6,
		textAlign: 'center'
	},
})


const mapStateToProps = ({
	mapReducer: {
		region
	}
}) => ({
	region
})

export default connect(mapStateToProps)(ConfirmAccuratePinPopup)
