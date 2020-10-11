import React from 'react'
import { connect } from 'react-redux'
import {
	View,
	FlatList,
	TouchableOpacity,
	Text,
	TextInput
} from 'react-native'
import axios from 'axios'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { setRegionByPlace, setCurrentRegion } from '../../actions/map-actions'
import ShadowContainer from '../../components/ShadowContainer'

class SearchAddressScreen extends React.Component {
	state = {
		searchVal: '',
		locations: []
	}

	onSearchResult = ({ data }) => {
		this.setState({ locations: data.predictions })
	}

	onSearchChange = (searchVal) => {
		this.setState({ searchVal })
	}

	onSearchClick = () => {
		const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${this.state.searchVal}&key=AIzaSyDOKcW0tFvi_T9vFyERfUDh20IxfTfBsmA&components=country:tr`

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
						<TextInput
							value={this.state.searchVal}
							onChangeText={this.onSearchChange}
							placeholder='Adres ara'
							style={styles.searchAddress}
						/>
						<Ionicons size={32} name='md-search' color='rgba(0,0,0,.8)' onPress={this.onSearchClick} />
					</View>
				</View>
				<View style={styles.divider} />

				<TouchableOpacity onPress={this.useCurrentLocation} style={styles.useCurrentLocationButton}>
					<View style={styles.useCurrentLocationContainer}>
						<Ionicons size={32} name='md-locate' color='rgba(0,0,0,.8)' />
						<Text style={styles.useCurrentLocation}>Bulunduğum konumu kullan</Text>
					</View>
				</TouchableOpacity>

			</View>
		</ShadowContainer>
	)

	renderSearchedItem = ({ item }) => (
		<TouchableOpacity onPress={() => this.onAddressClick(item)} style={styles.item}>

			<View style={styles.itemChild}>
				<Ionicons size={32} name='md-pin' color='#6B788B' />

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
					extraData={this.state.searchVal}
					style={styles.list}
					data={this.state.locations}
					renderItem={this.renderSearchedItem}
					ListHeaderComponent={this.renderListHeaderComponent}
					stickyHeaderIndices={[0]}
				/>
			</View>
		)
	}
}

const styles = ScaledSheet.create({
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
	},
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
		color: '#6B788B',
		fontWeight: '500'
	},
	meterText: {
		paddingHorizontal: '4@s',
		fontSize: '13@s',
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
