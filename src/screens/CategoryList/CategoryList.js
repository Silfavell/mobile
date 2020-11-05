import React from 'react'

import { ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import SettingItem from '../../components/SettingItem'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'

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
            <ScrollView>
                {
                    this.props.categories.map((category, index) => (
                        <CategoryItem
                            category={category}
                            index={index}
                            navigation={this.props.navigation} />
                    ))
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ sourceReducer: { categories } }) => ({
    categories
})

export default ShadowContainerHoc(connect(mapStateToProps)(CategoryList))
