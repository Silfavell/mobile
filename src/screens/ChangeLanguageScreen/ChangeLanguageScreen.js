import React from 'react'

import { ScrollView, TouchableOpacity } from 'react-native'

import LanguageItem from './LanguageItem'

class ChangeLanguageScreen extends React.PureComponent {
    render() {
        return (
            <ScrollView>
                <TouchableOpacity onPress={this.props.navigation.goBack}>
                    <LanguageItem title='English' />
                </TouchableOpacity>

                <TouchableOpacity onPress={this.props.navigation.goBack}>
                    <LanguageItem title='Türkçe' />
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

export default ChangeLanguageScreen
