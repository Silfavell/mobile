import React from 'react'
import axios from 'axios'
import {
	ScrollView, View, TouchableOpacity, ActivityIndicator, TextInput, StyleSheet,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { SERVER_URL } from '../utils/global'
import HeadingDivider from '../components/HeadingDivider'
import SearchFilter from '../components/SearchFilter'
import RecyclerList from '../components/RecyclerList'
import ShadowContainer from '../components/ShadowContainer'

class SearchScreen extends React.PureComponent {
	state = {
		fetch: false,
		products: [],
		text: ''
	}

	search = (text) => {
		if (text.length > 0) {
			this.setState({ fetch: true, text })

			const url = `${SERVER_URL}/search-product?name=${text}`

			axios.get(url).then((response) => {
				this.setState({
					products: response.data.map(({ _source }) => {
						// eslint-disable-next-line no-param-reassign
						_source._id = _source.id
						return _source
					}),
					fetch: false
				})
			}).catch(() => {
				this.setState({ fetch: false })
			})
		} else {
			this.setState({ fetch: false, products: [], text })
		}
	}

	clear = () => {
		this.search('')
	}

	renderSearchResult = () => (
		<View style={{ flex: 1 }}>
			<RecyclerList list={this.state.products} fromSearch />
		</View>
	)

	renderDivider = () => (
		<ShadowContainer>
			<HeadingDivider title="Popüler aramalar" />
			<SearchFilter onClick={this.search} />
		</ShadowContainer>
	)

	fetching = () => (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator color="red" size="large" />
		</View>
	)

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container} behavior="height">
				<View style={styles.searchHeader}>
					<View style={styles.iconContainer}>
						<Ionicons name="md-search" size={32} color="#DB0099" />
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							value={this.state.text}
							onChangeText={this.search}
							style={styles.searchInput}
							placeholder="Ara"
						/>
					</View>
					{
						this.state.text.length > 0 && (
							<TouchableOpacity style={styles.iconContainer} onPress={this.clear}>
								<Ionicons name="md-close" size={32} color="#6D7891" />
							</TouchableOpacity>
						)
						//  <View style={styles.iconContainer}>
						//      <Ionicons name={'md-microphone'} size={32} color={'#6D7891'} />
						//  </View>
					}
				</View>

				{
					// eslint-disable-next-line no-nested-ternary
					this.state.fetch ? this.fetching() : (
						!this.state.products.length > 0 ? this.renderDivider() : this.renderSearchResult()
					)
				}
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	searchHeader: {
		height: 50, margin: 2, flexDirection: 'row', backgroundColor: 'white'
	},
	mostSearchContainer: {
		flex: 0.7, padding: 2, margin: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'
	},
	iconContainer: { alignItems: 'center', justifyContent: 'center', flex: 1 },
	inputContainer: {
		alignItems: 'center', justifyContent: 'center', flex: 6, display: 'flex', flexDirection: 'row'
	},
	searchInput: { textAlign: 'left', flex: 1, fontSize: 20 },
	emptyFooter: { flex: 7, margin: 2 },
})

export default SearchScreen
