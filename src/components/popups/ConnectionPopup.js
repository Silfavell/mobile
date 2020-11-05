import React from 'react'
import { connect } from 'react-redux'
import { ScaledSheet } from 'react-native-size-matters'
import { Text } from 'react-native'
import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'
import RNExitApp from 'react-native-exit-app'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class ConnectionPopup extends React.Component {
	close = () => {
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
				useNativeDriver={true}
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
					<MaterialIcons color='rgba(0,0,0,.8)' size={72} name='wifi' />
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

export default connect(mapStateToProps)(ConnectionPopup)