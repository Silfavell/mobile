import React from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import {
	TouchableOpacity,
	Text,
	Platform
} from 'react-native'
import { connect } from 'react-redux'
import {
	Container,
	Tab,
	Tabs,
	ScrollableTab,
	TabHeading
} from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import RecyclerList from '../components/RecyclerList'

class ProductsScreen extends React.Component {

	constructor(props) {
		super(props)
		this.selectedCategory = this.props.route.params.selectedCategory

		this.props.navigation.setOptions({
			title: this.props.products[this.selectedCategory].name,
			headerRight: () => (
				<TouchableOpacity onPress={this.onFilterClick}>

					<MaterialIcons
						color={'white'}
						name='sort'
						size={28}
						style={{
							transform: [{ rotateY: '180deg' }],
							marginRight: 12
						}} />

				</TouchableOpacity>
			)
		})
	}

	getTabBar = () => <ScrollableTab />

	onFilterClick = () => {
		this.props.navigation.navigate('filterProductsScreen', {
			selectedCategory: this.selectedCategory,
			category: this.props.products[this.selectedCategory]
		})
	}

	onTabsRef = (ref) => {
		this.tabsRef = ref
	}

	getProducts = () => {
		if (this.selectedCategory === this.props.filterCategory) {
			return this.props.filteredProducts
		}

		return this.props.products[this.selectedCategory]
	}

	renderTab = (category) => (
		<Tab
			key={
				category._id +
				'brands:' + this.props.brands.join(',') +
				'selectedSort:' + this.props.selectedSort}
			heading={
				<TabHeading style={styles.tabStyle}>
					<Text style={styles.tabBarTextStyle}>{category.name}</Text>
				</TabHeading>
			}>

			<RecyclerList
				navigation={this.props.navigation}
				tabLabel={category.name}
				list={category.products}
			/>

		</Tab>
	)

	render() {
		return (
			<Container>
				<Tabs
					ref={this.onTabsRef}
					tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
					prerenderingSiblingsNumber={Infinity}
					tabBarBackgroundColor={styles.tabStyle.backgroundColor}
					renderTabBar={this.getTabBar}
				>
					{
						this.getProducts().subCategories.map(this.renderTab)
					}
				</Tabs>
			</Container>
		)
	}
}

const styles = ScaledSheet.create({
	tabBarTextStyle: {
		fontSize: '15@s',
		fontFamily: Platform.OS === 'ios' ? 'Moon-Bold' : 'MoonBold',
		color: 'rgba(0,0,0,.8)'
	},
	tabBarUnderlineStyle: {
		backgroundColor: '#FED110',
		height: 3
	},
	tabStyle: {
		backgroundColor: 'white'
	}
})

const mapStateToProps = ({
	reducer4: {
		products
	},
	filterProductsReducer: {
		filteredProducts,
		filterCategory,
		brands,
		selectedSort
	}
}) => ({
	products,
	filteredProducts,
	filterCategory,
	brands,
	selectedSort
})

export default connect(mapStateToProps)(ProductsScreen)
