import React from 'react'

import {
    FlatList
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'
import AddressItem from './AddressItem'
import AddressListHeaderComponent from './AddressListHeaderComponent'

class SearchAddressScreen extends React.Component {
    state = {
        locations: []
    }

    shouldComponentUpdate(_, nextState) {
        if (this.state.locations.length !== nextState.locations.length) {
            return true
        }

        return false
    }

    setLocations = (locations) => {
        this.setState({ locations })
    }

    renderSearchedItem = ({ item }) => (
        <AddressItem
            navigation={this.props.navigation}
            item={item} />
    )

    render() {
        return (
            <FlatList
                extraData={this.state.searchVal}
                style={styles.list}
                data={this.state.locations}
                renderItem={this.renderSearchedItem}
                ListHeaderComponent={(
                    <AddressListHeaderComponent
                        setLocations={this.setLocations} />
                )}
                stickyHeaderIndices={[0]} />
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        backgroundColor: COLORS.GRAY,
        flex: 1
    },
    list: {
        flex: 1,
        backgroundColor: COLORS.LIGHT
    }
})

export default SearchAddressScreen
