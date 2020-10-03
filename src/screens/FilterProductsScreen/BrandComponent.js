import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CheckBox from 'react-native-check-box'

import SettingItem from '../../components/SettingItem'

class BrandComponent extends React.Component {
    state = {
        checked: this.props.checked
    }

    onClick = () => {
        this.setState({ checked: !this.state.checked }, () => {
            if (this.state.checked) {
                this.props.addBrand(this.props.brand.name)
            } else {
                this.props.removeBrand(this.props.brand.name)
            }
        })
    }

    x = () => { }

    render() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.onClick}>

                <SettingItem
                    title={this.props.brand.name}
                    rightComponent={
                        <CheckBox
                            style={{ height: 24 }}
                            checkedImage={<MaterialIcons name={'check'} size={24} color={'black'} />}
                            unCheckedImage={<MaterialIcons name={'check-box-outline-blank'} size={24} color={'black'} />}
                            disabled
                            isChecked={this.state.checked}
                        />
                    } />

            </TouchableOpacity>
        )
    }
}

export default BrandComponent