import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Modal, {
	ModalTitle,
	ModalButton,
	ModalFooter
} from 'react-native-modals'

import { clearCart } from '../../actions/actions1'
import { setClearCartPopupState } from '../../actions/global-actions'

class ClearCartPopup extends React.PureComponent {
	close = () => {
		this.props.setClearCartPopupState(false)
		return true
	}

	onConfirm = () => {
		this.props.setClearCartPopupState(false)
		this.props.clearCart(this.props.token)
	}

	render() {
		return (
			<Modal
				onTouchOutside={this.close}
				width={0.9}
				visible={this.props.clearCartPopupState}
				onSwipeOut={this.close}
				onHardwareBackPress={this.close}
				modalTitle={(
					<ModalTitle
						style={styles.title}
						textStyle={styles.titleText}
						title="Sepeti boşatmak istediğinden emin misin?"
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
		marginVertical: RFValue(6, 600)
	},
	titleText: {
		textAlign: 'center',
		fontSize: RFValue(16, 600)
	},
})

const mapStateToProps = ({
	globalReducer: {
		clearCartPopupState
	},
	reducer4: {
		token
	}
}) => ({
	clearCartPopupState,
	token
})

const mapDispatchToProps = {
	clearCart,
	setClearCartPopupState,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearCartPopup)
