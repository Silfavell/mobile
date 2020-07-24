import React from 'react'
import { connect } from 'react-redux'
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet } from 'react-native-size-matters'


import ShadowContainer from './ShadowContainer'

class ScrollableCategoryList extends React.Component {

    onPress = (index) => {
        this.props.navigation.navigate('products', { selectedCategory: index })
    }

    renderCategoryElement = (icon, title, index) => (
        <TouchableOpacity onPress={() => this.onPress(index)} activeOpacity={0.9} style={styles.categoryElement}>
            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={32} />
            </View>
            <Text numberOfLines={1}>{title}</Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <ShadowContainer>
                <ScrollView style={styles.container} horizontal={true}>
                    {
                        this.props.categories.map((category, index) => (
                            this.renderCategoryElement('md-menu', category.name, index)
                        ))
                    }
                </ScrollView>
            </ShadowContainer>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        marginTop: 12,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#CDCDCD'
    },
    categoryElement: {
        width: 100,
        padding: 5,
        margin: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#EFEFEF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    }
})

const mapStateToProps = ({
    reducer4: {
        categories
    }
}) => ({
    categories
})

export default connect(mapStateToProps)(ScrollableCategoryList)