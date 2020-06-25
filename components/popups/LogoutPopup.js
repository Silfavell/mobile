import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Modal, {
	ModalTitle,
	ModalButton,
	ModalFooter
} from 'react-native-modals'

import { logout } from '../../actions/actions4'

class LogoutPopup extends React.PureComponent {
	close = () => {
		this.props.setPopupState({ scaleAnimationModal: false })
		return true
	}

	onConfirm = () => {
		this.props.setPopupState({ scaleAnimationModal: false })
		this.props.logout()
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
						title="Çıkış yapmak istediğine emin misin ?"
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
		backgroundColor: 'rgba(0,0,0,.8)'
	},
	buttonText: {
		color: 'white'
	},
	title: {
		marginVertical: RFValue(6, 600)
	},
	titleText: {
		textAlign: 'center',
		fontSize: RFValue(16, 600)
	}
})

const mapDispatchToProps = {
	logout
}

export default connect(null, mapDispatchToProps)(LogoutPopup)
