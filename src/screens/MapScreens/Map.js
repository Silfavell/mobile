import React from 'react'

import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { connect } from 'react-redux'

import { setRegion } from '../../actions/map-actions'

const Map = ({ region, setRegion }) => (
    <MapView
        style={StyleSheet.absoluteFillObject}
        tracksViewChanges={false}
        loadingEnabled
        showsCompass={false}
        initialRegion={{
            ...region,
            latitudeDelta: 0.007,
            longitudeDelta: 0.007
        }}
        customMapStyle={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
                featureType: 'poi',
                elementType: 'labels.text',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            // eslint-disable-next-line react-native/no-inline-styles
            {
                featureType: 'poi.business',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            // eslint-disable-next-line react-native/no-inline-styles
            {
                featureType: 'road',
                elementType: 'labels.icon',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            },
            // eslint-disable-next-line react-native/no-inline-styles
            {
                featureType: 'transit',
                stylers: [
                    {
                        visibility: 'off'
                    }
                ]
            }
        ]}
        onRegionChangeComplete={setRegion} />
)

const mapDispatchToProps = {
    setRegion
}

export default connect(null, mapDispatchToProps)(Map)
