import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet, s } from 'react-native-size-matters'

import { makeFilter, clearFilter } from '../actions/filter-products-actions'

import ShadowContainer from '../components/ShadowContainer'
import SettingItem from '../components/SettingItem'
import ButtonComponent from '../components/ButtonComponent'
import ClearFilterPopup from '../components/popups/ClearFilterPopup'

import Accordion from '../components/FilterScreenComponents/Accordion'
import BrandComponent from '../components/FilterScreenComponents/BrandComponent'

class FilterProductsScreen extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            brands: this.props.brands,
            selectedSort: this.props.selectedSort,
            scaleAnimationModal: false
        }

        this.props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={this.props.navigation.goBack} >
                    <Ionicons name='md-close' size={26} color='white' style={{ marginLeft: s(18) }} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                (this.state.brands.length > 0 || this.state.selectedSort !== -1) && (
                    <TouchableOpacity onPress={this.onClearFilterClick} >
                        <Ionicons name='md-trash' size={26} color='white' style={{ marginRight: s(18) }} />
                    </TouchableOpacity>
                )
            )
        })

        this.sorts = [
            {
                index: 0,
                key: 'classic',
                sortType: 0,
                label: 'Akıllı Sıralama'
            },
            {
                index: 1,
                key: 'bestSeller',
                sortType: 1,
                label: 'Çok Satanlar'
            },
            {
                index: 2,
                key: 'newest',
                sortType: 2,
                label: 'En Yeniler'
            },
            {
                index: 3,
                key: 'lowToHigh',
                sortType: 3,
                label: 'En Düşük Fiyat'
            },
            {
                index: 4,
                key: 'highToLow',
                sortType: 4,
                label: 'En Yüksek Fiyat'
            },
            //  {
            //      index: 5,
            //      key: 'highestRank',
            //      sortType: 5,
            //      label: 'En Yüksek Puan'
            //  },
            //  {
            //      index: 6,
            //      key: 'highestComment',
            //      sortType: 6,
            //      label: 'En Çok Yorumlanan'
            //  }
        ]
    }

    onClearFilterClick = () => {
        this.setPopupState({ scaleAnimationModal: true })
    }

    clearFilter = () => {
        this.props.clearFilter(() => {
            this.setState({
                brands: [],
                selectedSort: -1,
                scaleAnimationModal: false
            })
        })
    }

    onFilterClick = () => {
        this.props.makeFilter(
            {
                categoryId: this.props.route.params.category._id,
                brandsAsString: this.state.brands.join(','),
                sortType: this.sorts[this.state.selectedSort]?.sortType
            },
            {
                filterCategory: this.props.route.params.selectedCategory,
                brands: this.state.brands,
                selectedSort: this.state.selectedSort
            },
            this.props.navigation.goBack
        )
    }

    onSortSelect = ({ index }) => {
        this.setState({ selectedSort: index })
    }

    setPopupState = (state) => {
        this.setState(state)
    }

    addBrand = (brand) => {
        this.state.brands.push(brand)
        this.setState({ brands: this.state.brands })
    }

    removeBrand = (brand) => {
        this.state.brands.splice(this.state.brands.indexOf(brand), 1)
        this.setState({ brands: this.state.brands })
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

                    <ShadowContainer>
                        <ModalSelector
                            data={this.sorts}
                            cancelText={'İptal'}
                            onChange={this.onSortSelect}>
                            <SettingItem title={'Sırala'} value={this.sorts[this.state.selectedSort]?.label ?? 'Seçiniz'} />
                        </ModalSelector>
                    </ShadowContainer>

                    <View style={{ height: 12, backgroundColor: '#DFDFDF' }} />

                    <ShadowContainer>
                        <Accordion title='Markalar'>
                            <>
                                {
                                    this.props.route.params.category.brands.map((brand) => (
                                        <BrandComponent
                                            brand={brand}
                                            addBrand={this.addBrand}
                                            removeBrand={this.removeBrand}
                                            checked={this.state.brands.includes(brand.name)} />
                                    ))
                                }
                            </>
                        </Accordion>
                    </ShadowContainer>
                    
                    <View style={{ height: 12, backgroundColor: '#DFDFDF' }} />

                    <Accordion title='Markalar'>
                        <>
                            {
                                this.props.route.params.category.brands.map((brand) => (
                                    <BrandComponent
                                        brand={brand}
                                        addBrand={this.addBrand}
                                        removeBrand={this.removeBrand}
                                        checked={this.state.brands.includes(brand.name)} />
                                ))
                            }
                        </>
                    </Accordion>


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

const styles = ScaledSheet.create({
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
        brands,
        selectedSort
    }
}) => ({
    brands,
    selectedSort
})

const mapDispatchToProps = {
    makeFilter,
    clearFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProductsScreen)