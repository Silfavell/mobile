import React from 'react'
import { connect } from 'react-redux'
import { FlatList } from 'react-native'

import Category from '../components/Category'
import EmptyCategory from '../components/EmptyCategory'
import Slider from '../components/Slider'

const formatData = (data, numColumns) => {
	const numberOfFullRows = Math.floor(data.length / numColumns)

	let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns)
	while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
		data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true })
		// eslint-disable-next-line no-plusplus
		numberOfElementsLastRow++
	}

	return data
}

class HomeScreen extends React.PureComponent {
	keyExtractor = (item) => item._id

	renderItem = ({ item, index }) => (item.empty ? <EmptyCategory /> : <Category navigation={this.props.navigation} index={index} data={item} />)

	render() {
		return (
			<FlatList
				data={formatData(Object.values(this.props.categories), 3)}
				columnWrapperStyle={{ justifyContent: 'space-between' }}
				keyExtractor={this.keyExtractor}
				renderItem={this.renderItem}
				numColumns={3}
				ListHeaderComponent={<Slider />}
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
