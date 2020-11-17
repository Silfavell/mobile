import React from 'react'

import axios from 'axios'
import {
    View, TouchableOpacity, Text, TextInput
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { setCurrentRegion } from '../../actions/map-actions'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import { COLORS } from '../../scripts/colors'

class AddressListHeaderComponent extends React.Component {
    state = {
        searchVal: ''
    }

    onSearchChange = (searchVal) => {
        this.setState({ searchVal })
    }

    onSearchClick = async () => {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.state.searchVal}&key=AIzaSyDOKcW0tFvi_T9vFyERfUDh20IxfTfBsmA&components=country:tr`
        const { data } = await axios.get(url)
        this.props.setLocations(data.predictions)
    }

    onCurrentRegion = (region, err) => {
        if (err) {
            // this.props.messagePopupRef.showMessage({ message: 'Konumunuzu için izine ihtiyaç var.' })
        } else {
            this.props.navigation.navigate('pinAddressScreen', {
                region
            })
        }
    }

    useCurrentLocation = () => {
        this.props.setCurrentRegion(this.onCurrentRegion)
    }

    render() {
        return (
            <View style={styles.header}>
                <View style={styles.searchAddressContainerContainer}>
                    <View style={styles.searchAddressContainer}>
                        <TextInput
                            value={this.state.searchVal}
                            onChangeText={this.onSearchChange}
                            placeholder='Adres ara'
                            style={styles.searchAddress} />
                        <Ionicons size={32} name='md-search' color={COLORS.PRIMARY} onPress={this.onSearchClick} />
                    </View>
                </View>
                <View style={styles.divider} />

                <TouchableOpacity onPress={this.useCurrentLocation} style={styles.useCurrentLocationButton}>
                    <View style={styles.useCurrentLocationContainer}>
                        <Ionicons size={32} name='md-locate' color={COLORS.PRIMARY} />
                        <Text style={styles.useCurrentLocation}>Bulunduğum konumu kullan</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    header: {
        height: 110,
        display: 'flex',
        backgroundColor: COLORS.LIGHT
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.GRAY,
        marginHorizontal: 12
    },
    searchAddressContainerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6
    },
    searchAddressContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginHorizontal: 10
    },
    searchAddress: {
        flex: 1,
        paddingHorizontal: '16@s',
        fontSize: 17
    },
    useCurrentLocationButton: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 6
    },
    useCurrentLocationContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center'
    },
    useCurrentLocation: {
        flex: 1,
        paddingHorizontal: '16@s',
        fontSize: 17
    }
})

const mapDispatchToProps = {
    setCurrentRegion
}

export default ShadowContainerHoc(connect(null, mapDispatchToProps)(AddressListHeaderComponent))
