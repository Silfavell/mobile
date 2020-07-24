import React from 'react'
import { connect } from 'react-redux'
import { ScaledSheet, s } from 'react-native-size-matters'
import {
	FlatList,
	View,
	TouchableOpacity,
	Image,
	BackHandler
} from 'react-native'
import RNExitApp from 'react-native-exit-app'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Category from '../components/Category'
import Slider from '../components/Slider'
import ShadowContainer from '../components/ShadowContainer'

import { SERVER_URL } from '../utils/global'

import logo from '../assets/icon-black.png'
import ScrollableCategoryList from '../components/ScrollableCategoryList'

const banners = [
	`${SERVER_URL}/assets/banners/1.jpg`,
	`${SERVER_URL}/assets/banners/2.jpg`,
	`${SERVER_URL}/assets/banners/3.jpg`,
	`${SERVER_URL}/assets/banners/4.jpg`
]

class HomeScreen extends React.Component {

	constructor(props) {
		super(props)

		props.navigation.setOptions({
			headerTitleAlign: 'center',
			headerStyle: styles.headerStyle,
			headerTitle: () => (
				<View style={styles.headerTitle}>
					<Image source={logo} resizeMode='center' style={styles.headerImage} />
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity activeOpacity={0.9} style={{ paddingLeft: s(18), zIndex: 2 }} onPress={this.onCategoryListClick}>
					<Ionicons name='md-menu' size={26} color='black' />
				</TouchableOpacity>
			)
		})
	}

	onCategoryListClick = () => {
		this.props.navigation.navigate('categoryList')
	}

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
					<>
						<View style={{ height: s(190) }}>
							<ShadowContainer>
								<Slider images={banners} loop paginator />
							</ShadowContainer>
						</View>
						<ScrollableCategoryList navigation={this.props.navigation} />
					</>
				}
				ListFooterComponent={
					<View style={{ height: s(40) }} />
				}
			/>
		)
	}
}

const styles = ScaledSheet.create({
	headerStyle: {
		backgroundColor: 'rgba(0,0,0,.8)'
	},
	headerTitle: {
		height: '100%',
		padding: '8@s',
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		borderBottomWidth: 3,
		borderBottomColor: 'rgba(0,0,0,.8)',
		zIndex: 1
	},
	headerImage: {
		height: '200%',
		zIndex: -1
	}
})

const mapStateToProps = ({
	reducer4: {
		categories
	}
}) => ({
	categories
})

export default connect(mapStateToProps)(HomeScreen)
