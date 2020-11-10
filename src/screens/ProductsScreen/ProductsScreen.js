import React from 'react'

import {
    View,
    Text
} from 'react-native'
import { ScaledSheet, s } from 'react-native-size-matters'
import { connect } from 'react-redux'

import RecyclerList from '../../components/RecyclerList'
import { COLORS } from '../../scripts/colors'

class ProductsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.selectedCategory = this.props.route.params.selectedCategory
        this.selectedSubCategory = this.props.route.params.selectedSubCategory
        this.selectedType = this.props.route.params.selectedType

        this.props.navigation.setOptions({
            title: this.props.products[this.selectedCategory].subCategories[this.selectedSubCategory].types[this.selectedType].name
            /* headerRight: () => ( // filter button
                <TouchableOpacity onPress={this.onFilterClick}>
                <MaterialIcons
                color={'white'}
                name='sort'
                size={28}
                style={styles.iconContainer} />
                </TouchableOpacity>
            ) */
        })
    }

    onFilterClick = () => {
        this.props.navigation.navigate('filterProductsScreen', {
            selectedCategory: this.selectedCategory,
            selectedSubCategory: this.tabs.state.currentPage,
            categoryId: this.props.products[this.selectedCategory]._id,
            subCategoryId: this.props.products[this.selectedCategory].subCategories[this.tabs.state.currentPage]._id,
            category: this.props.products[this.selectedCategory].subCategories[this.tabs.state.currentPage]
        })
    }

    emptyProducts = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Seçtiğiniz filtrelere uygun ürün bulunmamaktadır</Text>
        </View>
    )

    render() {
        const { products } = this.props.products[this.selectedCategory].subCategories[this.selectedSubCategory].types[this.selectedType]

        return (
            products?.length > 0 ? (
                <View style={styles.container}>
                    <RecyclerList
                        navigation={this.props.navigation}
                        list={products} />
                </View>
            ) : this.emptyProducts()
        )
    }
}

const styles = ScaledSheet.create({
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.GRAY
    },
    emptyText: {
        fontSize: '18@s',
        textAlign: 'center',
        color: COLORS.DARK
    },
    iconContainer: {
        transform: [
            {
                rotateY: '180deg'
            }
        ],
        marginRight: s(18)
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.LIGHT
    }
})

const mapStateToProps = ({
    sourceReducer: {
        products
    },
    filterReducer: {
        categoryId,
        subCategoryId,
        filter,
        selectedBrands,
        selectedSort
    }
}) => ({
    products,
    categoryId,
    subCategoryId,
    filter,
    selectedBrands,
    selectedSort
})

export default connect(mapStateToProps)(ProductsScreen)
