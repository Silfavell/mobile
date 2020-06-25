/* eslint-disable react/sort-comp */
import React from 'react'
import { connect } from 'react-redux'
import { FlatList, View, BackHandler } from 'react-native'
import RNExitApp from 'react-native-exit-app'

import Category from '../components/Category'
import EmptyCategory from '../components/EmptyCategory'
import Slider from '../components/Slider'
import ShadowContainer from '../components/ShadowContainer'

const formatData = (data, numColumns) => {
	const numberOfFullRows = Math.floor(data.length / numColumns)

	let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
	while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
		data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
		// eslint-disable-next-line no-plusplus
		numberOfElementsLastRow++
	}

	return data
}

class HomeScreen extends React.PureComponent {
	keyExtractor = (item) => item._id

	renderItem = ({ item, index }) => <Category navigation={this.props.navigation} index={index} data={item} />

	handleBackButtonClick = () => {
		if (this.props.navigation.isFocused()) {
			RNExitApp.exitApp()
		}

		return false
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
	}

	// eslint-disable-next-line camelcase
	UNSAFE_componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
	}

	render() {
		return (
			<FlatList
				data={this.props.categories}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				ListHeaderComponent={
					<ShadowContainer>
						<Slider />
					</ShadowContainer>
				}
				ListFooterComponent={
					<View style={{ height: 40 }} />
				}
			/>
		)
	}
}

const mapStateToProps = ({
	reducer4: {
		categories
	}
}) => ({
	categories
})

export default connect(mapStateToProps)(HomeScreen)
