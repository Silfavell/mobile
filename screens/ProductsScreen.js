import React from 'react'
import { ScaledSheet,s } from 'react-native-size-matters'
import {
	View,
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
							marginRight: s(18)
						}} />

				</TouchableOpacity>
			)
		})
	}

	getTabBar = () => <ScrollableTab />

	onFilterClick = () => {
		this.props.navigation.navigate('filterProductsScreen', {
			selectedCategory: this.selectedCategory,
			selectedSubCategory: this.tabs.state.currentPage,
			categoryId: this.props.products[this.selectedCategory]._id,
			subCategoryId: this.props.products[this.selectedCategory].subCategories[this.tabs.state.currentPage]._id,
			category: this.props.products[this.selectedCategory].subCategories[this.tabs.state.currentPage]
		})
	}

	getProducts = (subCategory) => {
		if (subCategory.parentCategoryId === this.props.categoryId && subCategory._id === this.props.subCategoryId) {
			return this.props.filter.products
		}

		return subCategory.products
	}

	emptyProducts = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>Seçtiğiniz filtrelere uygun ürün bulunmamaktadır</Text>
		</View>
	)

	renderTab = (subCategory) => (
		<Tab
			key={
				subCategory.parentCategoryId === this.props.categoryId && subCategory._id === this.props.subCategoryId ?
					subCategory._id + subCategory._id + 'brands:' + this.props.selectedBrands.join(',') + 'selectedSort:' + this.props.selectedSort : subCategory._id
			}
			heading={
				<TabHeading style={styles.tabStyle}>
					<Text style={styles.tabBarTextStyle}>{subCategory.name}</Text>
				</TabHeading>
			}>

			{
				this.getProducts(subCategory)?.length > 0 ? (
					<RecyclerList
						navigation={this.props.navigation}
						tabLabel={subCategory.name}
						list={this.getProducts(subCategory)}
					/>
				) : this.emptyProducts()
			}


		</Tab>
	)

	onRef = (ref) => {
		this.tabs = ref
	}

	render() {
		return (
			<Container>
				<Tabs
					ref={this.onRef}
					tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
					prerenderingSiblingsNumber={Infinity}
					tabBarBackgroundColor={styles.tabStyle.backgroundColor}
					renderTabBar={this.getTabBar}>
					{
						this.props.products[this.selectedCategory].subCategories.map(this.renderTab)
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
	},
	emptyContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EDEDED'
	},
	emptyText: {
		fontSize: '18@s',
		textAlign: 'center',
		color: '#454545'
	}
})

const mapStateToProps = ({
	reducer4: {
		products
	},
	filterReducer: {
		categoryId,
		subCategoryId,
		filter,
		selectedBrands,
		selectedSort
	}
}) => ({
	products,
	categoryId,
	subCategoryId,
	filter,
	selectedBrands,
	selectedSort
})

export default connect(mapStateToProps)(ProductsScreen)
