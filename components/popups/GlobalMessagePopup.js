import React from 'react'
import { connect } from 'react-redux'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'
import FlashMessage from 'react-native-flash-message'
import { RFValue } from 'react-native-responsive-fontsize'

import { setMessagePopupRef } from '../../actions/global-actions'

class GlobalMessagePopup extends React.PureComponent {
	messageComponent = (source) => (
		<View style={styles.container}>
			<View style={styles.iconContainer}>
				{this.props.children}
			</View>
			<View style={styles.titleContainer}>
				<Text numberOfLines={3} style={styles.title}>{source.message.message}</Text>
			</View>
		</View>
	)

	render() {
		return (
			<View pointerEvents='none' style={styles.absoluteContainer}>
				<FlashMessage
					ref={this.props.setMessagePopupRef}
					animationDuration={300}
					duration={1250}
					position='top'
					MessageComponent={this.messageComponent}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	absoluteContainer: {
		...StyleSheet.absoluteFillObject,
		zIndex: 1000,
		elevation: 0.01,
		top: 100
	},
	container: {
		flex: 1,
		height: RFValue(80, 600),
		margin: RFValue(12, 600),
		borderRadius: 8,
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'row',
		borderColor: '#ABABAB',
		borderWidth: 0.4
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: RFValue(12, 600)
	},
	titleContainer: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		marginHorizontal: RFValue(12, 600),
		backgroundColor: 'white'
	},
	title: {
		fontSize: RFValue(18, 600)
	}
})

const mapDispatchToProps = {
	setMessagePopupRef
}

export default connect(null, mapDispatchToProps)(GlobalMessagePopup)
