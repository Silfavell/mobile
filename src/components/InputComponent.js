import React from 'react'

import { TouchableOpacity, TextInput } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { ScaledSheet } from 'react-native-size-matters'
import TextInputMask from 'react-native-text-input-mask'

class InputComponent extends React.Component {
  state = {
      selectorRef: null,
  };

  onSelectorInputClick = () => {
      this.state.selectorRef.open()
  };

  setSelectorRef = (selectorRef) => {
      this.setState({ selectorRef })
  };

  getMask = (type) => {
      switch (type) {
      case 'telephoneNumber':
          return '+90 ([000]) [000] [00] [00]'
      case 'card':
          return '[0000] [0000] [0000] [0000]'

      default:
          return null
      }
  };

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
          mask,
          multiline,
      } = this.props

      return (
          <TouchableOpacity
              activeOpacity={1}
              style={[styles.container, multiline ? styles.multiline : {}]}
              onPress={this.state.selectorRef ? this.onSelectorInputClick : null}>
              {icon}

              {mask ? (
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
                      multiline={multiline}
                      style={[
                          styles.input,
                          invalid ? styles.invalid : {},
                          multiline ? styles.multilineInput : {},
                          icon ? styles.withIcon : {},
                          disabled ? styles.disabled : {},
                      ]}
                  />
              )}

              {selector && (
                  <ModalSelector
                      data={selector}
                      ref={this.setSelectorRef}
                      key={value}
                      customSelector={<></>}
                      onChange={setPickedValue}
                  />
              )}
          </TouchableOpacity>
      )
  }
}

const styles = ScaledSheet.create({
    container: {
        height: '60@s',
        margin: '3@s',
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        margin: '4@s',
        zIndex: -1,
        borderRadius: 6,
        paddingHorizontal: '12@s',
        fontSize: '18@s',
        borderWidth: 1,
        color: 'black',
        borderColor: '#CCC8E0',
    },
    multiline: {
        height: '180@s',
    },
    multilineInput: {
        textAlignVertical: 'top',
    },
    withIcon: {
        paddingLeft: '48@s',
    },
    invalid: {
        borderColor: '#EE4266',
        borderWidth: 1.2,
    },
    disabled: {
        color: '#909090',
    },
})

export default InputComponent
