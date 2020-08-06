import React, { Component } from 'react'
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native'
import SettingItem from '../SettingItem'

class Accordion extends Component {

    state = {
        expanded: false
    }

    constructor(props) {
        super(props)

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }

    render() {
        return (
            <View>

                <TouchableOpacity ref={this.accordion} onPress={() => this.toggleExpand()} activeOpacity={0.9}>
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

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.setState({ expanded: !this.state.expanded })
    }

}

export default Accordion