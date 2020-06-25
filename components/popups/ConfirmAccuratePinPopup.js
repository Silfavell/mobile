import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { connect } from 'react-redux'
import {
	Image,
	Text,
	StyleSheet
} from 'react-native'
import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'

import pinIcon from '../../assets/pin.png'

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
			>
				<ModalContent style={styles.content}>
					<Image style={styles.contentImage} resizeMode="contain" source={pinIcon} />
					<Text style={styles.contentText}>Siparişiniz haritadaki konuma teslim edilecektir. Konumunun doğru olduğuna emin misin ?</Text>
				</ModalContent>
			</Modal>
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
		height: RFValue(92, 600)
	},
	contentText: {
		fontSize: RFValue(16, 600),
		fontWeight: 'bold',
		marginTop: RFValue(12, 600),
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
