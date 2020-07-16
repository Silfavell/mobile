import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ShadowContainer from './ShadowContainer'

class ScrollableCategoryList extends React.Component {

    renderCategoryElement = (icon, title) => (
        <TouchableOpacity activeOpacity={0.9} style={styles.categoryElement}>
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
                        this.props.categories.map((category) => (
                            this.renderCategoryElement('md-menu', category.name)
                        ))
                    }
                </ScrollView>
            </ShadowContainer>
        )
    }
}

const styles = StyleSheet.create({
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