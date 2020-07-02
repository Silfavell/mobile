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
			<View style={styles.titleContainer}>
				<Text numberOfLines={3} style={styles.title}>{source.message.message}</Text>
			</View>
		</View>
	)

	horizontalTransition = (animValue) => {
		const opacity = animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
		})

		const translateX = animValue.interpolate({
			inputRange: [0, 1],
			outputRange: [100, 0]
		})

		return {
			transform: [{ translateX }],
			opacity
		}
	}

	render() {
		return (
			<View pointerEvents='none' style={styles.absoluteContainer}>
				<FlashMessage
					ref={this.props.setMessagePopupRef}
					animationDuration={250}
					duration={2000}
					position={'bottom'}
					transitionConfig={this.horizontalTransition}
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
		marginVertical: 100
	},
	container: {
		flex: 1,
		margin: RFValue(12, 600),
		backgroundColor: 'white',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#EFEFEF',
		borderBottomWidth: 1,
		borderBottomColor: 'red'
	},
	titleContainer: {
		flex: 1,
		alignItems: 'flex-start',
		justifyContent: 'center',
		margin: RFValue(18, 600),
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
