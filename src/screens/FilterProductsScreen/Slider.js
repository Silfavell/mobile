import React from 'react'

import { View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import RangeSlider from 'rn-range-slider'

class Slider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            minPrice: props.initialMinPrice,
            maxPrice: props.initialMaxPrice
        }
    }

    // TODO replace with another lifecycle method
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            minPrice: nextProps.initialMinPrice,
            maxPrice: nextProps.initialMaxPrice
        })
    }

    render() {
        return (
            <View
                style={styles.sliderContainer}
                key={this.props.initialMinPrice + ':' + this.props.initialMaxPrice}>
                <RangeSlider
                    style={styles.slider}
                    gravity={'top'}
                    min={this.props.minPrice}
                    max={this.props.maxPrice}
                    initialLowValue={this.state.minPrice}
                    initialHighValue={this.state.maxPrice}
                    step={1}
                    labelBackgroundColor="#FF0000"
                    labelBorderColor="#00FF00"
                    selectionColor="#3df"
                    blankColor="#f618"
                    onValueChanged={(min, max) => {
                        this.setState({ minPrice: min, maxPrice: max })
                    }}
                />
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    slider: {
        flex: 1,
        height: '80@s',
        marginHorizontal: '32@s',
        marginVertical: '16@s'
    }
})

export default Slider
