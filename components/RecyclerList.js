import React from 'react'
import { connect } from 'react-redux'
import { Dimensions } from 'react-native'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'

import Product from './Product'
// import SearchFilter from './SearchFilter'

const { width, height } = Dimensions.get('window')

class List extends React.PureComponent {
	constructor(args) {
		super(args)

		this.dataProvider = new DataProvider(this.rowHasChanges)
		this.layoutProvider = new LayoutProvider(this.getLayoutTypeForIndex, this.setLayoutForType)

		this.setData(this.props.list)
	}

	setData = (list) => {
		this.state = {
			dataProvider: this.dataProvider.cloneWithRows(list)
		}
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.filteredProducts.length > 0 && this.props.selectedCategory === nextProps.filterCategory && this.props.currentPage === nextProps.filterPage) {
			this.setData(nextProps.filteredProducts)
		} else {
			this.setData(nextProps.list)
		}
	}


	shouldComponentUpdate(nextProps) {
		if (nextProps.list.length > this.props.list.length && !this.props.favoriteProducts) {
			return true
		}

		return false
	}

	rowHasChanges = (r1, r2) => r1 !== r2

	getLayoutTypeForIndex = () => 0

	setLayoutForType = (type, dim) => {
		// eslint-disable-next-line no-param-reassign
		dim.width = (width / 2) - ((width / 2) % 1)
		// eslint-disable-next-line no-param-reassign
		dim.height = height / 1.7
	}

	rowRenderer = (type, item) => (
		<Product
			key={item._id}
			data={item}
			navigation={this.props.navigation} />
	)

	render() {
		return (
			<>
				{
					// !this.props.fromSearch && <SearchFilter listRef={this.state.ref} />
				}

				<RecyclerListView
					layoutProvider={this.layoutProvider}
					dataProvider={this.state.dataProvider}
					rowRenderer={this.rowRenderer}
				/>
			</>
		)
	}
}

const mapStateToProps = ({
	filterProductsReducer: {
		filteredProducts,
		filterCategory,
		filterPage
	}
}) => ({
	filteredProducts,
	filterPage,
	filterCategory
})

export default connect(mapStateToProps)(List)
