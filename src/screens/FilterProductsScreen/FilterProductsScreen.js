import React from 'react'

import { View, TouchableOpacity } from 'react-native'
import ModalSelector from 'react-native-modal-selector'
import { ScaledSheet, s } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'

import { makeFilter, clearFilter } from '../../actions/filter-actions'
import Accordion from '../../components/Accordion'
import ButtonComponent from '../../components/ButtonComponent'
import ClearFilterPopup from '../../components/popups/ClearFilterPopup'
import SettingItem from '../../components/SettingItem'
import ShadowContainerHoc from '../../components/ShadowContainerHoc'
import BrandComponent from './BrandComponent'
import Slider from './Slider'

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

        this.setNavigationOptions()

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
            }
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

    // TODO replace with another lifecycle method
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            brands: nextProps.selectedBrands,
            selectedSort: nextProps.selectedSort,
            scaleAnimationModal: false,
            minPrice: nextProps.selectedMinPrice,
            maxPrice: nextProps.selectedMaxPrice
        }, this.setNavigationOptions)
    }

    setNavigationOptions = () => {
        this.props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={this.props.navigation.goBack}>
                    <Ionicons name='md-close' size={26} color='white' style={styles.leftIcon} />
                </TouchableOpacity>
            ),
            headerRight: () => (this.state.brands.length > 0
            || this.state.selectedSort !== -1
            || this.state.minPrice
            || this.state.maxPrice) && (
                <TouchableOpacity onPress={this.onClearFilterClick}>
                    <Ionicons name='md-trash' size={26} color='white' style={styles.rightIcon} />
                </TouchableOpacity>
            )
        })
    };

    onClearFilterClick = () => {
        this.setPopupState({ scaleAnimationModal: true })
    }

    onFilterClick = () => {
        this.props.makeFilter(
            {
                categoryId: this.props.route.params.categoryId,
                subCategoryId: this.props.route.params.subCategoryId,
                brandsAsString: this.state.brands.map((brand) => `&brands=${brand}`).join(''),
                sortType: this.sorts[this.state.selectedSort]?.sortType,
                minPrice: this.sliderRef.state.minPrice,
                maxPrice: this.sliderRef.state.maxPrice
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

    onSliderRef = (ref) => {
        this.sliderRef = ref
    }

    render() {
        let { category } = this.props.route.params

        if (this.props.filter) {
            category = this.props.filter
        }

        return (
            <>
                <ClearFilterPopup
                    scaleAnimationModal={this.state.scaleAnimationModal}
                    setPopupState={this.setPopupState}
                    clearFilter={this.props.clearFilter} />
                {
                    ShadowContainerHoc( // TODO ??
                        <>
                            {
                                ShadowContainerHoc(
                                    <ModalSelector
                                        data={this.sorts}
                                        cancelText='İptal'
                                        onChange={this.onSortSelect}
                                    >
                                        <SettingItem title='Sırala' value={this.sorts[this.state.selectedSort]?.label ?? 'Seçiniz'} />
                                    </ModalSelector>
                                )
                            }

                            <View style={styles.divider} />

                            {
                                ShadowContainerHoc(
                                    <Accordion title='Markalar'>
                                        <>
                                            {
                                                category.brands.map((brand) => (
                                                    <BrandComponent
                                                        brand={brand}
                                                        key={brand.name + this.state.brands.includes(brand.name)}
                                                        addBrand={this.addBrand}
                                                        removeBrand={this.removeBrand}
                                                        checked={this.state.brands.includes(brand.name)} />
                                                ))
                                            }
                                        </>
                                    </Accordion>
                                )
                            }

                            <View style={styles.divider} />

                            <Accordion title='Fiyat Aralığı'>
                                <Slider
                                    ref={this.onSliderRef}
                                    minPrice={category.minPrice}
                                    maxPrice={category.maxPrice}
                                    initialMinPrice={this.state.minPrice ?? category.minPrice}
                                    initialMaxPrice={this.state.maxPrice ?? category.maxPrice} />
                            </Accordion>
                        </>
                    )
                }

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
    },
    leftIcon: {
        marginLeft: s(18)
    },
    rightIcon: {
        marginRight: s(18)
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

export default ShadowContainerHoc(connect(mapStateToProps, mapDispatchToProps)(FilterProductsScreen))
