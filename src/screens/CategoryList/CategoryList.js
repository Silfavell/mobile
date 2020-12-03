import React from 'react'

import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import SettingItem from '../../components/SettingItem/SettingItem'
import FOR_WHICH from '../../models/ForWhich'
import { COLORS } from '../../scripts/colors'

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
        const { products, navigation } = this.props
        let datas = []

        if (forWhich === FOR_WHICH.CATEGORIES) {
            datas = products
        } else if (forWhich === FOR_WHICH.SUB_CATEGORIES) {
            datas = products[selectedCategory].subCategories
            navigation.setOptions({
                title: products[selectedCategory].name
            })
        } else {
            datas = products[selectedCategory].subCategories[selectedSubCategory].types
            navigation.setOptions({
                title: products[selectedCategory].subCategories[selectedSubCategory].name
            })
        }

        return (
            <ScrollView style={styles.container}>
                {
                    datas.map((category, index) => (
                        <CategoryItem
                            category={category}
                            index={index}
                            navigation={navigation}
                            forWhich={forWhich}
                            params={this.props.route.params} />
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.LIGHT
    }
})

const mapStateToProps = ({
    sourceReducer: {
        products
    }
}) => ({
    products
})

export default connect(mapStateToProps)(CategoryList)
