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

	render() {
		const {
			value,
			onChange,
			options,
			children: icon,
			selector,
			setPickedValue,
			invalid,
			disabled
		} = this.props

		return (
			<TouchableOpacity activeOpacity={1} style={styles.container} onPress={this.state.selectorRef ? this.onSelectorInputClick : null} >
				{
					icon
				}

				<TextInput
					// eslint-disable-next-line react/jsx-props-no-spreading
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

				{
					selector && (
						<ModalSelector
							data={selector}
							ref={this.setSelectorRef}
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
