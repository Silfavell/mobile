import React from 'react'
import { connect } from 'react-redux'
import {
    ScrollView,
    TouchableOpacity
} from 'react-native'

import SettingItem from '../../components/SettingItem'
import ShadowContainer from '../../components/ShadowContainer'


const FOR_WHICH = {
    CATEGORIES: 0,
    SUB_CATEGORIES: 1,
    TYPES: 2
}

let selectedCategoryIndex,
    selectedSubCategoryIndex,
    selectedTypeIndex,
    forWhich = 0

class CategoryItem extends React.PureComponent {
    onPress = () => {
        if (forWhich === FOR_WHICH.CATEGORIES) {
            selectedCategoryIndex = this.props.index
            forWhich = 1
            this.props.navigation.navigate('categoryList', { selectedCategory: selectedCategoryIndex })
        } else if (forWhich === FOR_WHICH.SUB_CATEGORIES) {
            selectedSubCategoryIndex = this.props.index
            forWhich = 2
            this.props.navigation.navigate('categoryList', { selectedCategory: selectedCategoryIndex, selectedSubCategory: selectedSubCategoryIndex })
        } else {
            selectedTypeIndex = this.props.index
            this.props.navigation.navigate('products', { selectedCategory: selectedCategoryIndex, selectedSubCategory: selectedSubCategoryIndex, selectedType: selectedTypeIndex })
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
        let datas = []
        if (forWhich === FOR_WHICH.CATEGORIES) {
            datas = this.props.categories
        } else if (forWhich === FOR_WHICH.SUB_CATEGORIES) {
            datas = this.props.categories[this.props.route.params.selectedCategory].subCategories
        } else {
            datas = this.props.categories[this.props.route.params.selectedCategory].subCategories[this.props.route.params.selectedSubCategory].types
        }
        return (
            <ShadowContainer>
                <ScrollView>
                    {
                        datas.map((category, index) => (
                            <CategoryItem
                                category={category}
                                index={index}
                                navigation={this.props.navigation}
                                forWhich={forWhich} />
                        ))
                    }
                </ScrollView>
            </ShadowContainer>
        )
    }
}

const mapStateToProps = ({
    sourceReducer: {
        categories
    }
}) => ({
    categories
})

export default connect(mapStateToProps)(CategoryList)