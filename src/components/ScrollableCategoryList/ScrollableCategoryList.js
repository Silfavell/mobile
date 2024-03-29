import React from 'react'

import {
    ScrollView, TouchableOpacity, View, Image, Text
} from 'react-native'
import Config from 'react-native-config'
import { ScaledSheet } from 'react-native-size-matters'
import { connect } from 'react-redux'

import FOR_WHICH from '../../models/ForWhich'
import { COLORS } from '../../scripts/colors'

class CategoryElement extends React.PureComponent {
    onPress = () => {
        this.props.navigation.navigate('categoryList', { forWhich: FOR_WHICH.SUB_CATEGORIES, selectedCategory: this.props.index })
    }

    render() {
        const { title, imagePath } = this.props

        return (
            <TouchableOpacity onPress={this.onPress} activeOpacity={0.9} style={styles.categoryElement}>
                <View style={styles.iconContainer}>
                    <Image
                        style={styles.imageContainer}
                        source={{ uri: `${Config.SERVER_URL}/assets/categories/${imagePath}.png` }} />
                </View>
                <Text numberOfLines={1}>{title}</Text>
            </TouchableOpacity>
        )
    }
}

class ScrollableCategoryList extends React.PureComponent {
    render() {
        return (
            <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false}>
                {
                    this.props.products.map((category, index) => (
                        <CategoryElement
                            key={`scrollableCategory:${category._id}`}
                            navigation={this.props.navigation}
                            title={category.name}
                            index={index}
                            imagePath={category.imagePath} />
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
        backgroundColor: COLORS.LIGHT,
        borderTopWidth: 1,
        borderTopColor: COLORS.GRAY
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
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.LIGHT_GRAY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.PRIMARY,
        marginBottom: 8
    },
    imageContainer: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = ({
    sourceReducer: {
        products
    }
}) => ({
    products
})

export default connect(mapStateToProps)(ScrollableCategoryList)
