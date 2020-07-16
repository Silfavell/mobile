import React from 'react'
import { connect } from 'react-redux'
import {
    ScrollView,
    TouchableOpacity
} from 'react-native'

import SettingItem from '../components/SettingItem'
import ShadowContainer from '../components/ShadowContainer'

class CategoryList extends React.PureComponent {
    render() {
        return (
            <ShadowContainer>
                <ScrollView>
                    {
                        this.props.categories.map((category, index) => (
                            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                this.props.navigation.navigate('products', { selectedCategory: index })
                            }}>
                                <SettingItem title={category.name} />
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </ShadowContainer>
        )
    }
}

const mapStateToProps = ({
    reducer4: {
        categories
    }
}) => ({
    categories
})

export default connect(mapStateToProps)(CategoryList)