import React from 'react'

import { ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import SettingItem from '../../components/SettingItem'
import ShadowContainer from '../../components/ShadowContainer'

class CategoryItem extends React.PureComponent {
    onPress = () => {
        this.props.navigation.navigate('products', { selectedCategory: this.props.index })
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={this.onPress}>
                <SettingItem title={this.props.category.name} />
            </TouchableOpacity>
        )
    }
}

class CategoryList extends React.PureComponent {
    render() {
        return (
            <ShadowContainer>
                <ScrollView>
                    {this.props.categories.map((category, index) => (
                        // TODO
                        // eslint-disable-next-line react/jsx-key
                        <CategoryItem
                            category={category}
                            index={index}
                            navigation={this.props.navigation} />
                    ))}
                </ScrollView>
            </ShadowContainer>
        )
    }
}

const mapStateToProps = ({ sourceReducer: { categories } }) => ({
    categories
})

export default connect(mapStateToProps)(CategoryList)
