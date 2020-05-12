import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

import RecyclerList from '../components/RecyclerList'

class ProductsScreen extends React.PureComponent {
	render() {
		const {
			categories, products, selectedCategory, navigation
		} = this.props

		return (
			<ScrollableTabView
				initialPage={selectedCategory}
				tabBarBackgroundColor="#E04299"
				tabBarTextStyle={styles.tabBarTextStyle}
				tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
				scrollWithoutAnimation
				prerenderingSiblingsNumber={categories.length}
				renderTabBar={() => <ScrollableTabBar />}
			>
				{
					categories.map((category) => <RecyclerList key={category._id} navigation={navigation} tabLabel={category.name} list={products[category.imagePath]} />)
				}
			</ScrollableTabView>
		)
	}
}

const styles = StyleSheet.create({
	tabBarTextStyle: { color: 'white', fontSize: RFValue(15, 600) },
	tabBarUnderlineStyle: { backgroundColor: '#FED110' },
})

const mapStateToProps = ({
	reducer3: {
		selectedCategory,
	},
	reducer4: {
		categories,
		products,
	},
}) => ({
	selectedCategory,
	categories,
	products,
})

export default connect(mapStateToProps)(ProductsScreen)
