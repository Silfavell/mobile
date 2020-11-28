import React from 'react'

import {
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    TextInput
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import RecyclerList from '../../components/RecyclerList/RecyclerList'
import { COLORS } from '../../scripts/colors'
import { search as searchRequest } from '../../scripts/requests'
import MostSearchedWithHoc from './MostSearchedWithHoc'

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
                    products: response.data.map(({ _source }) => { // TODO ??
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
                <MostSearchedWithHoc />
            </View>
            <RecyclerList
                list={this.props.mostSearched}
                navigation={this.props.navigation} />
        </View>
    )

    fetching = () => (
        <View style={styles.Container}>
            <ActivityIndicator color={COLORS.PRIMARY} size='large' />
        </View>
    )

    render() {
        return (
            <ScrollView contentContainerStyle={styles.container} behavior='height'>
                <View style={styles.searchHeader}>
                    <View style={styles.iconContainer}>
                        <Ionicons name='md-search' size={32} color={COLORS.PRIMARY} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            value={this.state.text}
                            onChangeText={this.search}
                            style={styles.searchInput}
                            placeholder='Ara' />
                    </View>
                    <TouchableOpacity style={styles.iconContainer} onPress={this.state.text.length > 0 ? this.clear : null}>
                        {
                            this.state.text.length > 0 && (
                                <Ionicons name='md-close' size={32} color={COLORS.PRIMARY} />
                            )
                            //  <View style={styles.iconContainer}>
                            //      <Ionicons name={'md-microphone'} size={32} color={'#6D7891'} />
                            //  </View>
                        }
                    </TouchableOpacity>
                </View>

                {
                    // eslint-disable-next-line no-nested-ternary
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
        backgroundColor: COLORS.LIGHT
    },
    searchHeader: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: COLORS.LIGHT,
        shadowColor: COLORS.DARK,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 24,
        elevation: 3,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.GRAY
    },
    mostSearchContainer: {
        flex: 0.7,
        padding: 2,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.LIGHT
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
    renderCountainer: {
        flex: 1
    },
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
