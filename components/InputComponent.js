import React from 'react'
import {
	View,
	TextInput,
	StyleSheet
} from 'react-native'
import {
	RFValue
} from 'react-native-responsive-fontsize'

const InputComponent = ({
	value,
	onChange,
	options,
	children: icon,
	invalid,
	disabled
}) => (
	<View style={styles.container}>
		{
			icon
		}
		<TextInput
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...options}
			value={value}
			onChangeText={onChange}
			placeholderTextColor={invalid ? '#EE4266' : '#C7C7CD'}
			editable={!disabled}
			selectTextOnFocus={!disabled}
			style={[
				styles.input,
				invalid ? styles.invalid : {},
				icon ? styles.withIcon : {},
				disabled ? styles.disabled : {},
			]}
		/>
	</View>
)

const styles = StyleSheet.create({
	container: {
		height: RFValue(60, 600),
		margin: RFValue(3, 600),
		flexDirection: 'row'
	},
	input: {
		flex: 1,
		margin: RFValue(4, 600),
		zIndex: -1,
		borderRadius: 6,
		paddingHorizontal: RFValue(12, 600),
		fontSize: RFValue(18, 600),
		borderWidth: 1,
		borderColor: '#CCC8E0'
	},
	withIcon: {
		paddingLeft: RFValue(48, 600)
	},
	invalid: {
		borderColor: '#EE4266',
		borderWidth: 1.2
	},
	disabled: {
		color: '#909090'
	}
})

export default InputComponent
