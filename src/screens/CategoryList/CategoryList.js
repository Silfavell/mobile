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

let forWhich = 0
let index1, index2, index3 = 0

class CategoryItem extends React.PureComponent {
    onPress = () => {
        if (forWhich === FOR_WHICH.CATEGORIES) {
            index1 = this.props.index
            forWhich = 1
            this.props.navigation.navigate('categoryList', { selectedCategory: index1 })
        } else if (forWhich === FOR_WHICH.SUB_CATEGORIES) {
            index2 = this.props.index
            forWhich = 2
            this.props.navigation.navigate('categoryList', { selectedCategory: index1, selectedSubCategory: index2 })
        } else {
            index3 = this.props.index
            this.props.navigation.navigate('products', { selectedCategory: index1, selectedSubCategory: index2,selectedType:0 })
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
        let datas=[]
        if (forWhich === FOR_WHICH.CATEGORIES) {
            datas = this.props.categories
        } else if (forWhich === FOR_WHICH.SUB_CATEGORIES) {
            datas = this.props.categories[this.props.route.params.selectedCategory].subCategories
        } else {
            debugger
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