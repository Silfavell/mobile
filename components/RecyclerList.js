import React from 'react'
import { Dimensions } from 'react-native'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'

import Product from './Product'
import SearchFilter from './SearchFilter'

const { width, height } = Dimensions.get('window')

class List extends React.PureComponent {
	constructor(args) {
		super(args)

		const dataProvider = new DataProvider(this.rowHasChanges)

		this.layoutProvider = new LayoutProvider(this.getLayoutTypeForIndex, this.setLayoutForType)

		this.state = {
			dataProvider: dataProvider.cloneWithRows(this.props.list)
		}
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
			navigation={this.props.navigation}
			favoriteProduct={this.props.favoriteProducts} />
	)

	render() {
		return (
			<>
				{
					// !this.props.fromSearch && <SearchFilter listRef={this.state.ref} />
				}

				<RecyclerListView
					style={{ backgroundColor: 'white' }}
					layoutProvider={this.layoutProvider}
					dataProvider={this.state.dataProvider}
					rowRenderer={this.rowRenderer}
				/>
			</>
		)
	}
}

export default List
