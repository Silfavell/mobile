import React from 'react'

import { TouchableOpacity, Text, ImageBackground } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

import { COLORS } from '../../scripts/colors'

const Category = ({ index /* navigation */ }) => {
    // const imageUrl = `${Config.SERVER_URL}/assets/categories-2/${imagePath}.jpg` // TODO
    const imageUrl = 'https://img-kotonw.mncdn.com/static/images/10568566603806/1366tshirt-kadin-desktop-110520.jpg'

    /*
    const onCategoryClick = () => {
        navigation.navigate('products', { selectedCategory: index })
    }
    */

    return (
        <TouchableOpacity activeOpacity={0.9}>
            <ImageBackground source={{ uri: imageUrl }} resizeMode='cover' style={styles.container}>
                <Text style={styles.name}>{`Kampanya ${parseInt(index, 2) + 1}`}</Text>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = ScaledSheet.create({
    container: {
        height: 160,
        marginVertical: 20,
        marginHorizontal: 10,
        borderColor: COLORS.GRAY
    },
    name: {
        position: 'absolute',
        lineHeight: 24,
        fontSize: 18,
        bottom: -18,
        alignSelf: 'center',
        backgroundColor: COLORS.LIGHT,
        color: COLORS.DARK,
        borderWidth: 1,
        borderColor: COLORS.DARK,
        paddingHorizontal: 18,
        paddingVertical: 4
    }
})

export default Category
