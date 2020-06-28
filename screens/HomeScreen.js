import React from 'react'
import { connect } from 'react-redux'
import { FlatList, View, BackHandler } from 'react-native'
import RNExitApp from 'react-native-exit-app'

import Category from '../components/Category'
import Slider from '../components/Slider'
import ShadowContainer from '../components/ShadowContainer'

import { SERVER_URL } from '../utils/global'

const banners = [
	`${SERVER_URL}/assets/banners/1.jpg`,
	`${SERVER_URL}/assets/banners/2.jpg`,
	`${SERVER_URL}/assets/banners/3.jpg`,
	`${SERVER_URL}/assets/banners/4.jpg`,
]

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
					<View style={{ height: 200 }}>
						<ShadowContainer>
							<Slider images={banners} loop paginator />
						</ShadowContainer>
					</View>
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
