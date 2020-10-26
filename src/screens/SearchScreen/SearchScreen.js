import React from 'react'
import { connect } from 'react-redux'
import {
	ScrollView,
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator,
	TextInput
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet } from 'react-native-size-matters'

import RecyclerList from '../../components/RecyclerList'
import ShadowContainer from '../../components/ShadowContainer'

import { search as searchRequest } from '../../scripts/requests'

class SearchScreen extends React.Component {
	state = {
		fetch: false,
		products: [],
		text: ''
	}

	search = async (text) => {
		if (text.length > 0) {
			this.setState({ fetch: true, text })

			try {
				const response = await searchRequest(text)

				this.setState({
					products: response.data.map(({ _source }) => {// TODO ??
						_source._id = _source.id
						return _source
					}),
					fetch: false
				})
			} catch (error) {
				this.setState({ fetch: false })
			}

		} else {
			this.setState({ fetch: false, products: [], text })
		}
	}

	clear = () => {
		this.search('')
	}

	renderSearchResult = () => (
		<View style={styles.renderCountainer}>
			<RecyclerList
				list={this.state.products}
				navigation={this.props.navigation}
				fromSearch />
		</View>
	)

	renderMostSearched = () => (
		<View style={styles.renderCountainer}>
			<View style={styles.divider}>
				<ShadowContainer style={styles.shadowContainer}>
					<View style={styles.dividerChild}>
						<Text style={styles.dividerTitle}>En Çok Arananlar</Text>
					</View>
				</ShadowContainer>
			</View>
			<RecyclerList
				list={this.props.mostSearched}
				navigation={this.props.navigation} />
		</View>
	)


	fetching = () => (
		<View style={styles.Container}>
			<ActivityIndicator color='#EE4266' size='large' />
		</View>
	)

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container} behavior='height'>
				<View style={styles.searchHeader}>
					<View style={styles.iconContainer}>
						<Ionicons name='md-search' size={32} color='rgba(0,0,0,.8)' />
					</View>
					<View style={styles.inputContainer}>
						<TextInput
							value={this.state.text}
							onChangeText={this.search}
							style={styles.searchInput}
							placeholder='Ara'
						/>
					</View>
					<TouchableOpacity style={styles.iconContainer} onPress={this.state.text.length > 0 ? this.clear : null}>
						{
							this.state.text.length > 0 && (
								<Ionicons name='md-close' size={32} color='#6D7891' />
							)
							//  <View style={styles.iconContainer}>
							//      <Ionicons name={'md-microphone'} size={32} color={'#6D7891'} />
							//  </View>
						}
					</TouchableOpacity>
				</View>

				{
					this.state.products.length > 0 ? (
						this.state.fetch ? this.fetching() : (this.state.products.length > 0 && this.renderSearchResult())
					) : this.renderMostSearched()
				}
			</ScrollView>
		)
	}
}

const styles = ScaledSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	searchHeader: {
		height: 50,
		flexDirection: 'row',
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 24,
		elevation: 3,
		borderBottomWidth: 1,
		borderBottomColor: '#BCBCBC'
	},
	mostSearchContainer: {
		flex: 0.7,
		padding: 2,
		margin: 2,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	inputContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 6,
		display: 'flex',
		flexDirection: 'row'
	},
	searchInput: {
		textAlign: 'left',
		flex: 1,
		fontSize: 20
	},
	emptyFooter: {
		flex: 7,
		margin: 2
	},
	divider: {
		height: '50@s',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row'
	},
	dividerChild: {
		height: '100%',
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row'
	},
	dividerTitle: {
		color: 'black',
		fontSize: '17@s',
		fontWeight: '600',
		paddingHorizontal: '16@s'
	},
	renderCountainer: {
		flex: 1
	},
	Container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	shadowContainer: {
		backgroundColor: 'white'
	}
})

const mapStateToProps = ({
	sourceReducer: {
		mostSearched
	}
}) => ({
	mostSearched
})

export default connect(mapStateToProps)(SearchScreen)
