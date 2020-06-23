import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
	Container,
	Tab,
	Tabs,
	ScrollableTab
} from 'native-base'

import RecyclerList from '../components/RecyclerList'

class ProductsScreen extends React.PureComponent {

	getTabBar = () => <ScrollableTab />

	render() {
		const {
			products,
			selectedCategory,
			navigation
		} = this.props

		return (
			<Container>
				<Tabs
					initialPage={selectedCategory}
					tabBarTextStyle={styles.tabBarTextStyle}
					tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
					prerenderingSiblingsNumber={Infinity}
					tabBarBackgroundColor={styles.tabStyle.backgroundColor}
					renderTabBar={this.getTabBar}
				>
					{
						products.map((category) => (
							<Tab key={category._id} heading={category.name} activeTabStyle={styles.tabStyle} tabStyle={styles.tabStyle}>
								<RecyclerList key={category._id} navigation={navigation} tabLabel={category.name} list={category.products} />
							</Tab>
						))
					}
				</Tabs>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	tabBarTextStyle: { color: 'white', fontSize: RFValue(15, 600) },
	tabBarUnderlineStyle: { backgroundColor: '#FED110' },
	tabStyle: { backgroundColor: '#E04299' }
})

const mapStateToProps = ({
	reducer3: {
		selectedCategory
	},
	reducer4: {
		products
	}
}) => ({
	selectedCategory,
	products
})

export default connect(mapStateToProps)(ProductsScreen)
