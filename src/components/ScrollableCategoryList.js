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
import Config from 'react-native-config'

class CategoryElement extends React.PureComponent {
    onPress = () => {
        this.props.navigation.navigate('products', { selectedCategory: this.props.index })
    }

    render() {
        const {
            title,
            imagePath
        } = this.props

        return (
            <TouchableOpacity onPress={this.onPress} activeOpacity={0.9} style={styles.categoryElement}>
                <View style={styles.iconContainer}>
                    <Image
                        style={{ width: 40, height: 40 }}
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
            <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    this.props.categories.map((category, index) => (
                        <CategoryElement
                            key={'scrollableCategory:' + category._id}
                            navigation={this.props.navigation}
                            title={category.name}
                            index={index}
                            imagePath={category.imagePath}
                        />
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
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#EFEFEF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EE4266',
        marginBottom: 8
    }
})

const mapStateToProps = ({
    sourceReducer: {
        categories
    }
}) => ({
    categories
})

export default connect(mapStateToProps)(ScrollableCategoryList)