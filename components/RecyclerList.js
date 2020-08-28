import React from 'react'
import { Dimensions } from 'react-native'
import { s } from 'react-native-size-matters'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'

import Product from './Product'

const { width } = Dimensions.get('window')

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
		dim.height = s(355)
	}

	rowRenderer = (type, item) => (
		<Product
			key={item._id}
			data={item}
			navigation={this.props.navigation}
			fromSearch={this.props.fromSearch} />
	)

	render() {
		return (
			<RecyclerListView
				layoutProvider={this.layoutProvider}
				dataProvider={this.state.dataProvider}
				rowRenderer={this.rowRenderer}
			/>
		)
	}
}


export default List
