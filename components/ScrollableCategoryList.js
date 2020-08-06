import React from 'react'
import { connect } from 'react-redux'
import {
    ScrollView,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { SERVER_URL } from '../utils/global'

import ShadowContainer from './ShadowContainer'

class ScrollableCategoryList extends React.Component {

    onPress = (index) => {
        this.props.navigation.navigate('products', { selectedCategory: index })
    }

    renderCategoryElement = (title, index, imagePath) => (
        <TouchableOpacity onPress={() => this.onPress(index)} activeOpacity={0.9} style={styles.categoryElement}>
            <View style={styles.iconContainer}>
                <Image style={{ width: 32, height: 32 }} source={{ uri: `${SERVER_URL}/assets/categories/${imagePath}.png` }} />
            </View>
            <Text numberOfLines={1}>{title}</Text>
        </TouchableOpacity>
    )

    render() {
        return (
            <ScrollView style={styles.container} horizontal={true}>
                {
                    this.props.categories.map((category, index) => (
                        this.renderCategoryElement(category.name, index, category.imagePath)
                    ))
                }
            </ScrollView>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        alignSelf: 'flex-start',
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
        borderWidth: .5,
        borderColor: '#EE4266',
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