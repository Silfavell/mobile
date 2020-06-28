import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { makeFilter, clearFilter } from '../actions/filter-products-actions'

import ShadowContainer from '../components/ShadowContainer'
import SettingItem from '../components/SettingItem'
import ButtonComponent from '../components/ButtonComponent'
import ClearFilterPopup from '../components/popups/ClearFilterPopup'

class FilterProductsScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            selectedBrand: this.props.selectedBrand,
            selectedSort: this.props.selectedSort,
            scaleAnimationModal: false
        }

        this.props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={this.props.navigation.goBack} >
                    <Ionicons name='md-close' size={26} color='white' style={{ marginLeft: 18 }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                (this.state.selectedBrand !== -1 || this.state.selectedSort !== -1) && (
                    <TouchableOpacity onPress={this.onClearFilterClick} >
                        <Ionicons name='md-trash' size={26} color='white' style={{ marginRight: 18 }} />
                    </TouchableOpacity>
                )
            )
        })

        this.brands = this.props.route.params.category.brands.map((brand, index) => ({
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

    onClearFilterClick = () => {
        this.setPopupState({ scaleAnimationModal: true })
    }

    clearFilter = () => {
        this.props.clearFilter(() => {
            this.setState({
                selectedBrand: -1,
                selectedSort: -1,
                scaleAnimationModal: false
            })
        })
    }

    onFilterClick = () => {
        this.props.makeFilter(
            {
                categoryId: this.props.route.params.category._id,
                brands: this.brands[this.state.selectedBrand]?.label,
                sortType: this.sorts[this.state.selectedSort]?.sortType
            },
            {
                filterCategory: this.props.route.params.selectedCategory,
                selectedBrand: this.state.selectedBrand,
                selectedSort: this.state.selectedSort
            },
            () => {
                this.props.navigation.goBack()
                //  this.props.navigation.pop(2) // TODO tek pop() yeterli ama en son bu ekrana geçişte kalan tab güncellenmiyor.
                //  this.props.navigation.navigate('products', { selectedCategory: this.props.route.params.selectedCategory })
            })
    }

    onBrandSelect = ({ index }) => {
        this.setState({ selectedBrand: index })
    }

    onSortSelect = ({ index }) => {
        this.setState({ selectedSort: index })
    }

    setPopupState = (state) => {
        this.setState(state)
    }

    render() {
        return (
            <>
                <ClearFilterPopup
                    scaleAnimationModal={this.state.scaleAnimationModal}
                    setPopupState={this.setPopupState}
                    clearFilter={this.clearFilter}
                />

                <ShadowContainer>
                    <ModalSelector
                        data={this.sorts}
                        cancelText={'İptal'}
                        onChange={this.onSortSelect}>
                        <SettingItem title={'Sırala'} value={this.sorts[this.state.selectedSort]?.label ?? 'Seçiniz'} />
                    </ModalSelector>

                    <ModalSelector
                        data={this.brands}
                        cancelText={'İptal'}
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

const mapStateToProps = ({
    filterProductsReducer: {
        selectedBrand,
        selectedSort
    }
}) => ({
    selectedBrand,
    selectedSort
})

const mapDispatchToProps = {
    makeFilter,
    clearFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProductsScreen)