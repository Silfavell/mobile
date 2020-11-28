import React from 'react'

import { View, StyleSheet } from 'react-native'

import { COLORS } from '../../scripts/colors'
import AddressesFooter from './AddressesFooter'
import AddressList from './AddressList'

class AddressesScreen extends React.PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <AddressList
                    navigation={this.props.navigation}
                    footer={<AddressesFooter navigation={this.props.navigation} />} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.LIGHT
    }
})

export default AddressesScreen
