import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import {
	View, FlatList, TouchableOpacity, Text, StyleSheet,
} from 'react-native'

class SearchFilter extends React.PureComponent {
	onItemClick = () => {
		// this.props.listRef.scrollToOffset(0, 236 * 3)
	}

	renderItem = ({ item }) => (
		<TouchableOpacity
			style={styles.mostSearchedItem}
			onPress={() => {
				this.props.onClick(item)
			}}
		>
			<Text style={styles.itemText}>{item}</Text>
		</TouchableOpacity>
	)

	// eslint-disable-next-line no-unused-vars
	keyExtractor = (_, index) => `most_searched${Math.random()}`

	render() {
		return (
			<View>
				<FlatList
					contentContainerStyle={styles.list}
					data={['water', 'milk', 'bread', 'egg', 'yogurt', 'coffee']}
					keyExtractor={this.keyExtractor}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={this.renderItem}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		height: 48,
		backgroundColor: 'white',
	},
	mostSearchedItem: {
		paddingHorizontal: RFValue(12, 600),
		margin: RFValue(4, 600),
		backgroundColor: 'white',
		minWidth: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 0.4,
		borderColor: '#DB0099',
		borderRadius: 8,
	},
	itemText: { color: '#DB0099', fontSize: RFValue(13, 600) },
})

export default SearchFilter
