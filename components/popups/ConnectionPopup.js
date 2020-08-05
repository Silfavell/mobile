import React from 'react'
import { connect } from 'react-redux'
import { ScaledSheet } from 'react-native-size-matters'
import { Image, Text } from 'react-native'
import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'
import RNExitApp from 'react-native-exit-app'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { setConnectionPopupState } from '../../actions/global-actions'

class ConnectionPopup extends React.PureComponent {
	close = () => {
		this.props.setConnectionPopupState(false)
		RNExitApp.exitApp()
		return true
	}

	render() {
		return (
			<Modal
				onTouchOutside={this.close}
				width={0.9}
				visible={this.props.connectionPopupState}
				onSwipeOut={this.close}
				onHardwareBackPress={this.close}
				footer={(
					<ModalFooter style={styles.footer}>
						<ModalButton
							text='Tamam'
							textStyle={styles.buttonText}
							style={styles.buttonOk}
							onPress={this.close}
							key='button-1'
						/>
					</ModalFooter>
				)}
			>
				<ModalContent style={styles.content}>
					<MaterialIcons color='rgba(0,0,0,.8)' size={72} name={'wifi'} />
					<Text style={styles.contentText}>Lütfen internet bağlantınızı kontrol edin</Text>
				</ModalContent>
			</Modal>
		)
	}
}

const styles = ScaledSheet.create({
	footer: {
		height: '42@s'
	},
	buttonOk: {
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
		height: '72@s'
	},
	contentText: {
		fontSize: '16@s',
		fontWeight: 'bold',
		marginTop: '12@s',
		marginBottom: -6,
		textAlign: 'center'
	}
})

const mapStateToProps = ({
	globalReducer: {
		connectionPopupState
	}
}) => ({
	connectionPopupState
})

const mapDispatchToProps = {
	setConnectionPopupState
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionPopup)
