import React from 'react'

import { TouchableOpacity, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'

class Color extends React.PureComponent {
    onPress = () => {
        this.props.onPress(this.props.index)
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.container, this.props.selected ? styles.border : {}]}
                onPress={this.onPress}>
                <View style={[styles.color, { backgroundColor: this.props.product.color.code }]} />
            </TouchableOpacity>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        height: 32,
        width: 32,
        padding: 4,
        margin: 4,
        borderRadius: 16
    },
    border: {
        borderWidth: 1,
        borderColor: COLORS.GRAY
    },
    color: {
        flex: 1,
        borderRadius: 12
    }
})

export default Color
