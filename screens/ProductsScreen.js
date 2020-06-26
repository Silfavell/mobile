import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native'
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

class ProductsScreen extends React.PureComponent {

	constructor(props) {
		super(props)

		this.props.navigation.setOptions({
			title: this.props.products[this.props.selectedCategory].name,
			headerRight: () => (
				<TouchableOpacity onPress={this.onFilterClick}>
					<MaterialIcons color={'white'} name='sort' size={28} style={{ transform: [{ rotateY: '180deg' }], marginRight: 12 }} />
				</TouchableOpacity>
			)
		})
	}

	getTabBar = () => <ScrollableTab />

	onFilterClick = () => {
		this.props.navigation.navigate('filterProductsScreen', {
			selectedCategory: this.props.selectedCategory,
			currentPage: this.tabsRef.state.currentPage,
			category: this.props.products[this.props.selectedCategory]
		})
	}

	onTabsRef = (ref) => {
		this.tabsRef = ref
	}

	render() {
		const {
			products,
			selectedCategory,
			navigation
		} = this.props

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
						products[selectedCategory].subCategories.map((category, index) => (
							<Tab
								key={category._id}
								heading={
									<TabHeading style={styles.tabStyle}>
										<Text style={styles.tabBarTextStyle}>{category.name}</Text>
									</TabHeading>
								}>

								<RecyclerList
									selectedCategory={this.props.selectedCategory}
									currentPage={index}
									key={category._id}
									navigation={navigation}
									tabLabel={category.name}
									list={category.products}
								/>

							</Tab>
						))
					}
				</Tabs>
			</Container>
		)
	}
}

const styles = StyleSheet.create({
	tabBarTextStyle: { fontSize: RFValue(15, 600), fontFamily: Platform.OS === 'ios' ? 'Moon-Bold' : 'MoonBold', color: 'rgba(0,0,0,.8)' },
	tabBarUnderlineStyle: { backgroundColor: '#FED110', height: 3 },
	tabStyle: { backgroundColor: 'white' }
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
