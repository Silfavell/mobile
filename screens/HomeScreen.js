import React from 'react'
import { connect } from 'react-redux'
import { ScaledSheet, s } from 'react-native-size-matters'
import {
	View,
	ScrollView,
	Text,
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

import logo from '../assets/logo.png'
import ScrollableCategoryList from '../components/ScrollableCategoryList'
import BestSeller from '../components/HomeScreen/BestSeller'

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
					<Image source={logo} resizeMode='contain' style={styles.headerImage} />
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
			<ScrollView style={{ flex: 1 }} stickyHeaderIndices={[3]}>
				<View style={{ height: s(190) }}>
					<ShadowContainer>
						<Slider images={banners} loop paginator />
					</ShadowContainer>
				</View>
				<View style={{ height: s(120) }}>
					<ShadowContainer>
						<ScrollableCategoryList navigation={this.props.navigation} images={banners} loop paginator />
					</ShadowContainer>
				</View>
				<View style={styles.divider}>
					<ShadowContainer style={{ backgroundColor: 'white' }}>
						<View style={styles.dividerChild}>
							<Text style={styles.dividerTitle}>En Çok Satanlar</Text>
						</View>
					</ShadowContainer>
				</View>
				<BestSeller navigation={this.props.navigation} />
			</ScrollView>
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
		height: '140%',
		zIndex: -1
	},
	divider: {
		height: '50@s',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	dividerChild: {
		height: '100%',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	dividerTitle: {
		color: 'black',
		fontSize: '17@s',
		fontWeight: '600',
		paddingHorizontal: '16@s'
	}
})

const mapStateToProps = ({
	reducer4: {
		categories,
		bestSeller
	}
}) => ({
	categories,
	bestSeller
})

export default connect(mapStateToProps)(HomeScreen)
