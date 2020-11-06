import React from 'react'
import { ScaledSheet, s } from 'react-native-size-matters'
import {
	View,
	TouchableOpacity,
	Text,
	Platform
} from 'react-native'
import { connect } from 'react-redux'
import { ScrollableTab } from 'native-base'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import RecyclerList from '../../components/RecyclerList'

class ProductsScreen extends React.Component {

	constructor(props) {
		super(props)
		this.selectedCategory = this.props.route.params.selectedCategory
		this.selectedSubCategory = this.props.route.params.selectedSubCategory
		this.selectedType = this.props.route.params.selectedType

		this.props.navigation.setOptions({
			title: this.props.products[this.selectedCategory].subCategories[this.selectedSubCategory].types[this.selectedType].name,
			/* headerRight: () => ( // filter button
				<TouchableOpacity onPress={this.onFilterClick}>
					<MaterialIcons
						color={'white'}
						name='sort'
						size={28}
						style={styles.iconContainer} />
				</TouchableOpacity>
			)*/
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

	getProducts = (products) => {
		if (products.parentCategoryId === this.props.categoryId && products._id === this.props.subCategoryId) {
			return this.props.filter
		}

		return products
	}

	emptyProducts = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>Seçtiğiniz filtrelere uygun ürün bulunmamaktadır</Text>
		</View>
	)

	renderTab = (products) => (
		this.getProducts(products)?.length > 0 ? (
			<View style={styles.productContainer}>
				<RecyclerList
					navigation={this.props.navigation}
					tabLabel={products.name}
					list={this.getProducts(products)}
				/></View>
		) : this.emptyProducts()
	)

	onRef = (ref) => {
		this.tabs = ref
	}

	render() {
		const products = this.props.products[this.selectedCategory].subCategories[this.selectedSubCategory].types[this.selectedType].products
		return (
			<View style={styles.conainer}>
				{
					this.renderTab(products)
				}
			</View>
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
	},
	iconContainer: {
		transform: [
			{
				rotateY: '180deg'
			}
		],
		marginRight: s(18)
	},
	conainer: {
		flex: 1,
		backgroundColor: 'white'
	},
	productContainer: {
		flex: 1
	}
})

const mapStateToProps = ({
	sourceReducer: {
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
