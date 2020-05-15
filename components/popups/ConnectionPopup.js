import React from 'react'
import { connect } from 'react-redux'
import { RFValue } from 'react-native-responsive-fontsize'
import { Image, Text, StyleSheet } from 'react-native'
import Modal, {
	ModalButton,
	ModalFooter,
	ModalContent
} from 'react-native-modals'

import { setConnectionPopupState } from '../../actions/global-actions'

import connectionImage from '../../assets/connection.png'

class ConnectionPopup extends React.PureComponent {
	close = () => {
		this.props.setConnectionPopupState(false)
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
							text="Ok"
							textStyle={styles.buttonText}
							style={styles.buttonOk}
							onPress={this.close}
							key="button-1"
						/>
					</ModalFooter>
				)}
			>
				<ModalContent style={styles.content}>
					<Image style={styles.contentImage} resizeMode="contain" source={connectionImage} />
					<Text style={styles.contentText}>Lütfen internet bağlantını kontrol et</Text>
				</ModalContent>
			</Modal>
		)
	}
}

const styles = StyleSheet.create({
	footer: {
		height: RFValue(42, 600)
	},
	buttonOk: {
		backgroundColor: '#DB0099'
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
		height: RFValue(72, 600)
	},
	contentText: {
		fontSize: RFValue(16, 600),
		fontWeight: 'bold',
		marginTop: RFValue(12, 600),
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
