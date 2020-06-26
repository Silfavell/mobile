import React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import ModalSelector from 'react-native-modal-selector'

import ShadowContainer from '../components/ShadowContainer'
import SettingItem from '../components/SettingItem'
import ButtonComponent from '../components/ButtonComponent'

class FilterProductsScreen extends React.Component {

    state = {
        selectedBrand: -1,
        selectedSort: -1
    }

    onFilterClick = () => {

    }

    onBrandSelect = ({ index }) => {
        this.setState({ selectedBrand: index })
    }

    onSortSelect = ({ index }) => {
        this.setState({ selectedSort: index })
    }

    render() {
        const brands = this.props.categories[this.props.route.params.currentPage].brands.map((brand, index) => ({
            index,
            key: brand._id,
            label: brand.name
        }))

        const sorts = [
            {
                index: 0,
                key: 'lowToHigh',
                label: 'Artan'
            },
            {
                index: 1,
                key: 'highToLow',
                label: 'Azalan'
            }
        ]

        return (
            <>
                <ShadowContainer>
                    <ModalSelector
                        data={sorts}
                        onChange={this.onSortSelect}>
                        <SettingItem title={'Sırala'} value={sorts[this.state.selectedSort]?.label ?? 'Seçiniz'} />
                    </ModalSelector>

                    <ModalSelector
                        data={brands}
                        onChange={this.onBrandSelect}>
                        <SettingItem title={'Markalar'} value={brands[this.state.selectedBrand]?.label ?? 'Seçiniz'} />
                    </ModalSelector>
                </ShadowContainer>

                <View style={styles.buttonContainer}>
                    <ButtonComponent text='Filtrele' onClick={this.onFilterClick} />
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    }
})

const mapStateToProps = ({
    reducer4: {
        categories
    }
}) => ({
    categories
})

export default connect(mapStateToProps)(FilterProductsScreen)