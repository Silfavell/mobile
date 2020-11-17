import React from 'react'

import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { COLORS } from '../../scripts/colors'

class Comment extends React.PureComponent {
    render() {
        const {
            title, ownerAlias, comment, rate
        } = this.props.item

        return (
            <View style={styles.container}>
                <View style={styles.rateContainer}>
                    {[1, 2, 3, 4, 5].map((el) => (
                        // TODO
                        // eslint-disable-next-line react/jsx-key
                        <Ionicons
                            style={styles.star}
                            size={26}
                            color='orange'
                            name={el <= rate ? 'ios-star' : 'ios-star-outline'} />
                    ))}
                </View>
                <Text style={styles.alias}>{ownerAlias}</Text>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.comment}>{comment}</Text>
            </View>
        )
    }
}

const styles = ScaledSheet.create({
    container: {
        marginTop: '20@s',
        marginHorizontal: '10@s',
        padding: '10@s',
        borderWidth: 1,
        borderColor: COLORS.GRAY,
        borderRadius: '5@s'
    },
    rateContainer: {
        flexDirection: 'row'
    },
    alias: {
        fontWeight: 'bold',
        fontSize: '16@s',
        marginTop: '8@s',
        paddingHorizontal: '10@s'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '18@s',
        marginTop: '8@s',
        paddingHorizontal: '10@s'
    },
    comment: {
        fontSize: '16@s',
        marginTop: '8@s',
        paddingHorizontal: '10@s'
    },
    star: {
        marginLeft: '5@s'
    }
})

export default Comment
