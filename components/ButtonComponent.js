import React from 'react'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const ButtonComponent = ({
	text,
	onClick,
	opposite,
	needFlex,
	disabled
}) => (
	<View style={[
		styles.container,
		needFlex ? styles.needFlex : {},
		disabled ? styles.disabled : {}
	]}
	>
		<TouchableOpacity
			disabled={disabled}
			onPress={onClick}
			style={[
				styles.button,
				opposite ? styles.opposite : {}
			]}
		>

			<Text style={[
				styles.text,
				opposite ? styles.opposite : {}
			]}
			>
				{text}
			</Text>

		</TouchableOpacity>
	</View>
)

const styles = StyleSheet.create({
	container: {
		height: RFValue(60, 600),
		margin: RFValue(3, 600)
	},
	needFlex: {
		flex: 1
	},
	button: {
		backgroundColor: 'rgba(0,0,0,.8)',
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,.8)',
		flex: 1,
		margin: RFValue(4, 600),
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center'
	},
	opposite: {
		backgroundColor: 'white',
		color: 'rgba(0,0,0,.8)'
	},
	text: {
		color: 'white',
		fontSize: RFValue(18, 600)
	},
	disabled: {
		opacity: 0.65
	}
})

export default ButtonComponent
