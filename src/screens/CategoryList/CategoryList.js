import React from 'react'

import { ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import SettingItem from '../../components/SettingItem/SettingItem'
import FOR_WHICH from '../../models/ForWhich'

class CategoryItem extends React.PureComponent {
    onPress = () => {
        const { forWhich, selectedCategory, selectedSubCategory } = this.props.params

        if (forWhich === FOR_WHICH.CATEGORIES) {
            this.props.navigation.push('categoryList', { forWhich: FOR_WHICH.SUB_CATEGORIES, selectedCategory: this.props.index })
        } else if (forWhich === FOR_WHICH.SUB_CATEGORIES) {
            this.props.navigation.push('categoryList', { forWhich: FOR_WHICH.TYPES, selectedCategory, selectedSubCategory: this.props.index })
        } else {
            this.props.navigation.navigate('products', { selectedCategory, selectedSubCategory, selectedType: this.props.index })
        }
    }

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
        const { forWhich, selectedCategory, selectedSubCategory } = this.props.route.params
        let datas = []

        if (forWhich === FOR_WHICH.CATEGORIES) {
            datas = this.props.categories
        } else if (forWhich === FOR_WHICH.SUB_CATEGORIES) {
            datas = this.props.categories[selectedCategory].subCategories
            this.props.navigation.setOptions({
                title: this.props.categories[selectedCategory].name
            })
        } else {
            datas = this.props.categories[selectedCategory].subCategories[selectedSubCategory].types
            this.props.navigation.setOptions({
                title: this.props.categories[selectedCategory].subCategories[selectedSubCategory].name
            })
        }

        return (
            <ScrollView>
                {
                    datas.map((category, index) => (
                        <CategoryItem
                            category={category}
                            index={index}
                            navigation={this.props.navigation}
                            forWhich={forWhich}
                            params={this.props.route.params} />
                    ))
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = ({ sourceReducer: { categories } }) => ({
    categories
})

export default connect(mapStateToProps)(CategoryList)
