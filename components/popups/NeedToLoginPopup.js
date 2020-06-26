import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StyleSheet } from 'react-native'
import Modal, {
	ModalTitle,
	ModalButton,
	ModalFooter
} from 'react-native-modals'
import { connect } from 'react-redux'

import { setNeedToLoginPopupState } from '../../actions/global-actions'

class NeedToLoginPopup extends React.PureComponent {
	close = () => {
		this.props.setNeedToLoginPopupState(false)
		return true
	}

	onConfirm = () => {
		this.props.setNeedToLoginPopupState(false)
		if (this.props.navigation) {
			this.props.navigation.navigate('Welcome', { screen: 'login' })
		}
	}

	render() {
		return (
			<Modal
				onTouchOutside={this.close}
				width={0.9}
				visible={this.props.needToLoginPopupState}
				onSwipeOut={this.close}
				onHardwareBackPress={this.close}
				modalTitle={(
					<ModalTitle
						style={styles.title}
						textStyle={styles.titleText}
						title='Devam etmeden önce giriş yapmalısın'
						hasTitleBar={false}
					/>
				)}
				footer={(
					<ModalFooter style={styles.footer}>
						<ModalButton
							text='Ok'
							textStyle={styles.buttonText}
							style={styles.buttonOk}
							onPress={this.onConfirm}
							key='button-2'
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
	buttonOk: {
		backgroundColor: 'rgba(0,0,0,.8)'
	},
	buttonText: {
		color: 'white'
	},
	title: {
		marginVertical: RFValue(8, 600)
	},
	titleText: {
		textAlign: 'center',
		fontSize: 16
	}
})

const mapStateToProps = ({
	globalReducer: {
		needToLoginPopupState,
		navigation
	}
}) => ({
	needToLoginPopupState,
	navigation
})

const mapDispatchToProps = {
	setNeedToLoginPopupState
}

export default connect(mapStateToProps, mapDispatchToProps)(NeedToLoginPopup)
