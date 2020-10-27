import React, { Component } from 'react'
import { View, TouchableOpacity, LayoutAnimation, Platform, UIManager, StyleSheet } from 'react-native'
import SettingItem from './SettingItem'

class Accordion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: !!this.props.expanded
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
                        <View style={styles.childContainer}>
                            {this.props.children}
                        </View>
                    )
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    childContainer: {
        marginHorizontal: 4
    }
})
export default Accordion