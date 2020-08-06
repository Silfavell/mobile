import React, { Component } from 'react'
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native'
import SettingItem from '../SettingItem'

class Accordion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        return (
            <View>

                <TouchableOpacity ref={this.accordion} onPress={this.toggleExpand} activeOpacity={0.9}>
                    <SettingItem title={this.props.title} rightIcon={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} />
                </TouchableOpacity>

                {
                    this.state.expanded && (
                        <View style={{ marginHorizontal: 4 }}>
                            {this.props.children}
                        </View>
                    )
                }

            </View>
        )
    }
}

export default Accordion