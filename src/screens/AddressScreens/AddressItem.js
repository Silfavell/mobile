import React from 'react'

import {
    View, TouchableOpacity, Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { setRegionByPlace, setCurrentRegion } from '../../actions/map-actions'
import { COLORS } from '../../scripts/colors'

class AddressItem extends React.PureComponent {
    onAddress = (data) => {
        this.props.navigation.navigate('pinAddressScreen', {
            region: {
                latitude: data.result.geometry.location.lat,
                longitude: data.result.geometry.location.lng
            }
        })
    }

    onClick = () => {
        this.props.setRegionByPlace(this.props.item.place_id, this.onAddress)
    }

    render() {
        const { item } = this.props

        return (
            <TouchableOpacity onPress={this.onClick} style={styles.item}>

                <View style={styles.itemChild}>
                    <Ionicons size={32} name='md-pin' color={COLORS.TERTIARY} />

                    <Text numberOfLines={3} style={styles.description}>
                        {item.description}
                    </Text>

                    <Text numberOfLines={3} style={styles.meterText}>
                        {
                            item.distance_meters
                        && (parseInt(item.distance_meters) > 1000 ? `${(parseInt(item.distance_meters) / 1000).toFixed(2)}km` : `${item.distance_meters}m`)
                        }
                    </Text>

                </View>

            </TouchableOpacity>
        )
    }
}

const styles = ScaledSheet.create({
    item: {
        height: 70,
        paddingVertical: '16@s',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '6@s'
    },
    itemChild: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: '10@s',
        alignItems: 'center'
    },
    description: {
        flex: 1,
        paddingHorizontal: '16@s',
        fontSize: '15@s',
        color: COLORS.GRAY,
        fontWeight: '500'
    },
    meterText: {
        paddingHorizontal: '4@s',
        fontSize: '13@s',
        color: COLORS.GRAY,
        fontWeight: '500'
    }
})

const mapDispatchToProps = {
    setRegionByPlace,
    setCurrentRegion
}

export default connect(null, mapDispatchToProps)(AddressItem)
