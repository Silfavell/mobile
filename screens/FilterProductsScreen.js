import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet, s } from 'react-native-size-matters'
import RangeSlider from 'rn-range-slider'

import { makeFilter, clearFilter } from '../actions/filter-actions'

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
            brands: props.selectedBrands,
            selectedSort: props.selectedSort,
            scaleAnimationModal: false,
            minPrice: props.selectedMinPrice,
            maxPrice: props.selectedMaxPrice
        }

        props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={props.navigation.goBack} >
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
                scaleAnimationModal: false,
                minPrice: null,
                maxPrice: null
            })
        })
    }

    onFilterClick = () => {
        this.props.makeFilter(
            {
                categoryId: this.props.route.params.categoryId,
                subCategoryId: this.props.route.params.subCategoryId,
                brandsAsString: this.state.brands.map((brand) => `&brands=${brand}`).join(''),
                sortType: this.sorts[this.state.selectedSort]?.sortType,
                minPrice: this.state.minPrice,
                maxPrice: this.state.maxPrice
            },
            {
                filterCategory: this.props.route.params.selectedCategory,
                selectedBrands: this.state.brands,
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
        let { category } = this.props.route.params

        if (this.props.filter) {
            category = this.props.filter
        }

        console.log(this.state)

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

                    <View style={styles.divider} />

                    <ShadowContainer>
                        <Accordion title='Markalar'>
                            <>
                                {
                                    category.brands.map((brand) => (
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

                    <View style={styles.divider} />

                    <Accordion title='Fiyat Aralığı'>
                        <View style={styles.sliderContainer}>
                            <RangeSlider
                                style={styles.slider}
                                gravity={'top'}
                                min={category.minPrice}
                                max={category.maxPrice}
                                initialLowValue={this.state.minPrice ?? category.minPrice}
                                initialHighValue={this.state.maxPrice ?? category.maxPrice}
                                step={1}
                                labelBackgroundColor='#FF0000'
                                labelBorderColor='#00FF00'
                                selectionColor='#3df'
                                blankColor='#f618'
                                onValueChanged={(min, max) => {
                                    this.setState({ minPrice: min, maxPrice: max })
                                }} />
                        </View>
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
    },
    divider: {
        height: '12@s',
        backgroundColor: '#DFDFDF'
    },
    sliderContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    slider: {
        flex: 1,
        height: '80@s',
        marginHorizontal: '32@s',
        marginVertical: '16@s'
    }
})

const mapStateToProps = ({
    filterReducer: {
        filter,
        filterCategory,
        categorId,
        subCategoryId,
        selectedBrands,
        selectedSort,
        selectedMinPrice,
        selectedMaxPrice
    }
}) => ({
    filter,
    filterCategory,
    categorId,
    subCategoryId,
    selectedBrands,
    selectedSort,
    selectedMinPrice,
    selectedMaxPrice
})

const mapDispatchToProps = {
    makeFilter,
    clearFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProductsScreen)