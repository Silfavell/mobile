import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { makeFilter } from '../actions/filter-products-actions'

import ShadowContainer from '../components/ShadowContainer'
import SettingItem from '../components/SettingItem'
import ButtonComponent from '../components/ButtonComponent'

class FilterProductsScreen extends React.Component {

    constructor(props) {
        super(props)

        this.props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={this.props.navigation.goBack} >
                    <Ionicons name='md-close' size={26} color='white' style={{ marginLeft: 16 }} />
                </TouchableOpacity>
            )
        })

        this.brands = this.props.route.params.category.subCategories[this.props.route.params.currentPage].brands.map((brand, index) => ({
            index,
            key: brand._id,
            label: brand.name
        }))

        this.sorts = [
            {
                index: 0,
                key: 'lowToHigh',
                sortType: 3,
                label: 'En Düşük Fiyat'
            },
            {
                index: 1,
                key: 'highToLow',
                sortType: 4,
                label: 'En Yüksek Fiyat'
            }
        ]
    }

    state = {
        selectedBrand: -1,
        selectedSort: -1
    }

    onFilterClick = () => {
        this.props.makeFilter({
            categoryId: this.props.route.params.category._id,
            subCategoryId: this.props.route.params.category.subCategories[this.props.route.params.currentPage]._id,
            brands: this.brands[this.state.selectedBrand]?.label,
            sortType: this.sorts[this.state.selectedSort]?.sortType
        },
            this.props.route.params.selectedCategory,
            this.props.route.params.currentPage,
            () => {
                this.props.navigation.goBack()
            })
    }

    onBrandSelect = ({ index }) => {
        this.setState({ selectedBrand: index })
    }

    onSortSelect = ({ index }) => {
        this.setState({ selectedSort: index })
    }

    render() {
        return (
            <>
                <ShadowContainer>
                    <ModalSelector
                        data={this.sorts}
                        onChange={this.onSortSelect}>
                        <SettingItem title={'Sırala'} value={this.sorts[this.state.selectedSort]?.label ?? 'Seçiniz'} />
                    </ModalSelector>

                    <ModalSelector
                        data={this.brands}
                        onChange={this.onBrandSelect}>
                        <SettingItem title={'Markalar'} value={this.brands[this.state.selectedBrand]?.label ?? 'Seçiniz'} />
                    </ModalSelector>
                </ShadowContainer>

                <View style={styles.bottom}>
                    <View style={styles.buttonContainer}>
                        <ButtonComponent text='İptal' onClick={this.props.navigation.goBack} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonComponent text='Filtrele' onClick={this.onFilterClick} />
                    </View>
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})

const mapDispatchToProps = {
    makeFilter
}

export default connect(null, mapDispatchToProps)(FilterProductsScreen)