import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	ScrollView,
	View,
	Image,
	TextInput,
	StyleSheet
} from 'react-native'
import { connect } from 'react-redux'

import { saveAddress } from '../../actions/actions2'

import ConfirmAddressPopup from '../../components/popups/ConfirmAddressPopup'
import Map from '../MapScreens/Map'
import CompleteAddressInput from '../MapScreens/CompleteAddressInput'
import ButtonComponent from '../../components/ButtonComponent'

import markerIcon from '../../assets/map-marker.png'

class CompleteAddressScreen extends React.Component {
	state = {
		scaleAnimationModal: false,
		addressTitle: 'Home',
		buildingNo: '',
		floor: '',
		aptNo: '',
		directions: ''
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			nextState.scaleAnimationModal !== this.state.scaleAnimationModal
			|| nextState.addressTitle !== this.state.addressTitle
			|| nextState.buildingNo !== this.state.buildingNo
			|| nextState.floor !== this.state.floor
			|| nextState.aptNo !== this.state.aptNo
			|| nextState.directions !== this.state.directions
		)
	}

	setPopupState = (scaleAnimationModal, complete, address) => {
		this.setState({ scaleAnimationModal })
		if (complete) {
			this.props.saveAddress(address, this.state)
			this.props.navigation.pop(3)
		}
	}

	onAddressTitleChange = (addressTitle) => {
		this.setState({ addressTitle })
	}

	onBuildingNoChange = (buildingNo) => {
		this.setState({ buildingNo })
	}

	onFloorChange = (floor) => {
		this.setState({ floor })
	}

	onAptNoChange = (aptNo) => {
		this.setState({ aptNo })
	}

	onDirectionsChange = (directions) => {
		this.setState({ directions })
	}

	onSaveClick = () => {
		this.setPopupState(true)
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<ConfirmAddressPopup scaleAnimationModal={this.state.scaleAnimationModal} setPopupState={this.setPopupState} />
				<View>
					<View style={styles.mapContainer}>

						<Map region={this.props.route.params.region} />

						<View style={styles.markerContainer} pointerEvents='none'>
							<Image style={styles.marker} source={markerIcon} />
						</View>

					</View>
					<View style={styles.body}>
						<View style={styles.inputContainerChild}>
							{
								//  <View style={styles.inputContainer}>
								//      <TextInput
								//          placeholder={'Address Icon'}
								//          style={styles.input} />
								//  </View>
							}
							<View style={styles.inputContainer}>
								<TextInput
									onChangeText={this.onAddressTitleChange}
									value={this.state.addressTitle}
									placeholder='Address title (Home, Work)'
									style={styles.input}
								/>
							</View>
						</View>
						<View style={styles.inputContainerChild}>
							<View style={styles.inputContainer}>
								<CompleteAddressInput />
							</View>
						</View>
						<View style={styles.inputContainerChild}>
							<View style={styles.inputContainer}>
								<TextInput
									value={this.state.buildingNo}
									keyboardType='number-pad'
									onChangeText={this.onBuildingNoChange}
									placeholder='Building No'
									style={styles.input}
								/>
							</View>
							<View style={styles.inputContainer}>
								<TextInput
									value={this.state.floor}
									keyboardType='number-pad'
									onChangeText={this.onFloorChange}
									placeholder='Floor'
									style={styles.input}
								/>
							</View>
							<View style={styles.inputContainer}>
								<TextInput
									value={this.state.aptNo}
									keyboardType='number-pad'
									onChangeText={this.onAptNoChange}
									placeholder='Apt No'
									style={styles.input}
								/>
							</View>
						</View>
						<View style={styles.inputContainer}>
							<TextInput
								onChangeText={this.onDirectionsChange}
								value={this.state.directions}
								placeholder='Directions'
								style={styles.input}
							/>
						</View>
					</View>
				</View>
				<ButtonComponent
					disabled={
						!(this.state.addressTitle.length > 0) || !(this.props.address.length > 0)
					}
					text='Kaydet'
					onClick={this.onSaveClick}
				/>

			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: { flexGrow: 1, justifyContent: 'space-between' },
	mapContainer: { height: RFValue(136, 600) },
	body: { marginVertical: RFValue(12, 600) },
	markerContainer: {
		flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', zIndex: RFValue(2, 600)
	},
	marker: { width: RFValue(48, 600), borderColor: '#C3C3C3', height: RFValue(48, 600) },
	inputContainer: { height: RFValue(60, 600), margin: RFValue(2, 600), flex: 1 },
	input2Container: { flex: 2, margin: RFValue(2, 600) },
	inputContainerChild: {
		height: 62, margin: RFValue(2, 600), display: 'flex', flexDirection: 'row',
	},
	input: {
		flex: 1,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		margin: RFValue(3, 600),
		borderRadius: 8,
		borderColor: '#C3C3C3',
		paddingHorizontal: RFValue(13, 600),
		fontSize: RFValue(17, 600)
	}
})

const mapStateToProps = ({
	mapReducer: {
		address
	}
}) => ({
	address
})

const mapDispatchToProps = {
	saveAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteAddressScreen)
