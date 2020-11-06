import React from 'react'
import { connect } from 'react-redux'
import { ScaledSheet, s } from 'react-native-size-matters'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	BackHandler
} from 'react-native'
import RNExitApp from 'react-native-exit-app'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Config from 'react-native-config'

import Category from '../../components/Category'
import Slider from '../../components/Slider'
import ShadowContainer from '../../components/ShadowContainer'
import ScrollableCategoryList from '../../components/ScrollableCategoryList'
import BestSeller from './BestSeller'

import logo from '../../../assets/logo.png'

const banners = [
	`${Config.SERVER_URL}/assets/banners/1.jpg`,
	`${Config.SERVER_URL}/assets/banners/2.jpg`,
	`${Config.SERVER_URL}/assets/banners/3.jpg`,
	`${Config.SERVER_URL}/assets/banners/4.jpg`
]

class HomeScreen extends React.Component {
	constructor(props) {
		super()

		props.navigation.setOptions({
			headerTitleAlign: 'center',
			headerStyle: styles.headerStyle,
			headerTitle: () => (
				<View style={styles.headerTitle}>
					<Image
						source={logo}
						resizeMode='contain'
						resizeMethod='resize'
						style={styles.headerImage}
					/>
				</View>
			),
			headerLeft: () => (
				<TouchableOpacity activeOpacity={0.9} style={styles.headerLeft} onPress={this.onCategoryListClick}>
					<Ionicons name='md-menu' size={26} color='black' />
				</TouchableOpacity>
			)
		})
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick)
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick)
	}

	keyExtractor = (item) => item._id

	handleBackButtonClick = () => {
		if (this.props.navigation.isFocused()) {
			RNExitApp.exitApp()
		}

		return false
	}

	onCategoryListClick = () => {
		this.props.navigation.navigate('categoryList', { forWhich: 0 })
	}

	renderItem = ({ item, index }) => <Category navigation={this.props.navigation} index={index} data={item} />

	render() {
		const headers = [
			<View style={styles.headerContainer1}>
				<ShadowContainer>
					<Slider images={banners} loop paginator />
				</ShadowContainer>
			</View>,
			<View style={styles.headerContainer2}>
				<ShadowContainer>
					<ScrollableCategoryList navigation={this.props.navigation} images={banners} loop paginator />
				</ShadowContainer>
			</View>,
			<View style={styles.divider}>
				<ShadowContainer style={styles.shadowContainer}>
					<View style={styles.dividerChild}>
						<Text style={styles.dividerTitle}>En Çok Satanlar</Text>
					</View>
				</ShadowContainer>
			</View>
		]

		return (
			<View style={styles.bestSellerContainer}>
				<BestSeller navigation={this.props.navigation} headers={headers} />
			</View>
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
		height: '130%',
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
	},
	headerLeft: {
		paddingLeft: s(18),
		zIndex: 2
	},
	headerContainer1: {
		height: s(190)
	},
	headerContainer2: {
		height: s(120)
	},
	shadowContainer: {
		backgroundColor: 'white'
	},
	bestSellerContainer: {
		flex: 1,
		backgroundColor: 'white'
	}
})

const mapStateToProps = ({
	sourceReducer: {
		categories,
		bestSeller
	}
}) => ({
	categories,
	bestSeller
})

export default connect(mapStateToProps)(HomeScreen)