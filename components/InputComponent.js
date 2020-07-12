import React from 'react'
import {
	TouchableOpacity,
	TextInput,
	StyleSheet
} from 'react-native'
import {
	RFValue
} from 'react-native-responsive-fontsize'
import ModalSelector from 'react-native-modal-selector'
import TextInputMask from 'react-native-text-input-mask'

class InputComponent extends React.Component {
	state = {
		selectorRef: null
	}

	onSelectorInputClick = () => {
		this.state.selectorRef.open()
	}

	setSelectorRef = (selectorRef) => {
		this.setState({ selectorRef })
	}

	getMask = (type) => {
		switch (type) {
			case 'telephoneNumber': return '+90 ([000]) [000] [00] [00]'
			case 'card': return '[0000] [0000] [0000] [0000]'

			default: return null
		}
	}

	render() {
		const {
			value,
			onChange,
			options,
			children: icon,
			selector,
			setPickedValue,
			invalid,
			disabled,
			mask
		} = this.props

		return (
			<TouchableOpacity activeOpacity={1} style={styles.container} onPress={this.state.selectorRef ? this.onSelectorInputClick : null} >
				{
					icon
				}

				{
					mask ? (
						<TextInputMask
							mask={this.getMask(mask)}
							{...options}
							value={value}
							onChangeText={onChange}
							placeholderTextColor={invalid ? '#EE4266' : '#C7C7CD'}
							editable={!(disabled || selector)}
							selectTextOnFocus={!disabled}
							style={[
								styles.input,
								invalid ? styles.invalid : {},
								icon ? styles.withIcon : {},
								disabled ? styles.disabled : {},
							]}
						/>
					) : (
							<TextInput
								{...options}
								value={value}
								onChangeText={onChange}
								placeholderTextColor={invalid ? '#EE4266' : '#C7C7CD'}
								editable={!(disabled || selector)}
								selectTextOnFocus={!disabled}
								style={[
									styles.input,
									invalid ? styles.invalid : {},
									icon ? styles.withIcon : {},
									disabled ? styles.disabled : {},
								]}
							/>
						)
				}


				{
					selector && (
						<ModalSelector
							data={selector}
							ref={this.setSelectorRef}
							key={value}
							customSelector={<></>}
							onChange={setPickedValue} />
					)
				}

			</TouchableOpacity >
		)
	}
}

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
		color: 'black',
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
