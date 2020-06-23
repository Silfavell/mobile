import React from 'react'
import { connect } from 'react-redux'
import {
	View,
	FlatList,
	TouchableOpacity,
	Text,
	TextInput,
	StyleSheet
} from 'react-native'
import axios from 'axios'
import { RFValue } from 'react-native-responsive-fontsize'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { setRegionByPlace, setCurrentRegion } from '../../actions/map-actions'
import ShadowContainer from '../../components/ShadowContainer'

class SearchAddressScreen extends React.PureComponent {
	state = {
		searchVal: '',
		locations: []
	}

	onSearchResult = ({ data }) => {
		this.setState({ locations: data.predictions })
	}

	search = (text) => {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=AIzaSyDOKcW0tFvi_T9vFyERfUDh20IxfTfBsmA&components=country:tr&origin=41.0381511,28.9418645`

		this.setState({ searchVal: text })
		axios.get(url).then(this.onSearchResult)
	}

	onAddress = (data) => {
		this.props.navigation.navigate('pinAddressScreen', {
			region: {
				latitude: data.result.geometry.location.lat,
				longitude: data.result.geometry.location.lng
			}
		})
	}

	onAddressClick = (item) => {
		this.props.setRegionByPlace(item.place_id, this.onAddress)
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

	renderListHeaderComponent = () => (
		<ShadowContainer>
			<View style={styles.header}>
				<View style={styles.searchAddressContainerContainer}>
					<View style={styles.searchAddressContainer}>
						<Ionicons size={32} name="md-search" color="#E04299" />
						<TextInput
							value={this.state.searchVal}
							onChangeText={this.search}
							placeholder="Adres ara"
							style={styles.searchAddress}
						/>
					</View>
				</View>
				<View style={styles.divider} />

				<TouchableOpacity onPress={this.useCurrentLocation} style={styles.useCurrentLocationButton}>
					<View style={styles.useCurrentLocationContainer}>
						<Ionicons size={32} name="md-locate" color="#E04299" />
						<Text style={styles.useCurrentLocation}>Bulunduğum konumu kullan</Text>
					</View>
				</TouchableOpacity>

			</View>
		</ShadowContainer>
	)

	renderSearchedItem = ({ item }) => (
		<TouchableOpacity onPress={() => this.onAddressClick(item)} style={styles.item}>

			<View style={styles.itemChild}>
				<Ionicons size={32} name="md-pin" color="#6B788B" />

				<Text numberOfLines={3} style={styles.description}>
					{item.description}
				</Text>

				<Text numberOfLines={3} style={styles.meterText}>
					{
						item.distance_meters
						// eslint-disable-next-line radix
						&& (parseInt(item.distance_meters) > 1000 ? `${(parseInt(item.distance_meters) / 1000).toFixed(2)}km` : `${item.distance_meters}m`)
					}
				</Text>

			</View>

		</TouchableOpacity>
	)

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.list}
					data={this.state.locations}
					renderItem={this.renderSearchedItem}
					ListHeaderComponent={this.renderListHeaderComponent}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#E5E5E5',
		flex: 1
	},
	list: {
		flex: 1,
		backgroundColor: 'white'
	},
	header: {
		height: 110,
		display: 'flex',
		backgroundColor: 'white'
	},
	divider: {
		height: 1,
		backgroundColor: '#DFDFDF',
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
		paddingHorizontal: RFValue(16, 600),
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
		paddingHorizontal: RFValue(16, 600),
		fontSize: 17
	},
	item: {
		height: 70,
		paddingVertical: RFValue(16, 600),
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		margin: RFValue(6, 600)
	},
	itemChild: {
		flex: 1,
		flexDirection: 'row',
		marginHorizontal: RFValue(10, 600),
		alignItems: 'center'
	},
	description: {
		flex: 1,
		paddingHorizontal: RFValue(16, 600),
		fontSize: RFValue(15, 600),
		color: '#6B788B',
		fontWeight: '500'
	},
	meterText: {
		paddingHorizontal: RFValue(4, 600),
		fontSize: RFValue(13, 600),
		color: '#6B788B',
		fontWeight: '500'
	}
})

const mapStateToProps = ({
	globalReducer: {
		messagePopupRef
	}
}) => ({
	messagePopupRef
})

const mapDispatchToProps = {
	setRegionByPlace,
	setCurrentRegion
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAddressScreen)
