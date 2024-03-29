import React from 'react'

import { TouchableOpacity, StyleSheet } from 'react-native'
import CheckBox from 'react-native-check-box'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import SettingItem from '../../components/SettingItem/SettingItem'
import { COLORS } from '../../scripts/colors'

class BrandComponent extends React.Component {
    state = {
        checked: this.props.checked
    }

    onClick = () => {
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.setState({ checked: !this.state.checked }, () => {
            if (this.state.checked) {
                this.props.addBrand(this.props.brand.name)
            } else {
                this.props.removeBrand(this.props.brand.name)
            }
        })
    }

    x = () => {}

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={this.onClick}>
                <SettingItem
                    title={this.props.brand.name}
                    rightComponent={(
                        <CheckBox
                            style={styles.checkBoxStyle}
                            checkedImage={<MaterialIcons name='check' size={24} color={COLORS.DARK} />}
                            unCheckedImage={
                                <MaterialIcons name='check-box-outline-blank' size={24} color={COLORS.DARK} />
                            }
                            disabled
                            isChecked={this.state.checked} />
                    )} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    checkBoxStyle: {
        height: 24
    }
})
export default BrandComponent
