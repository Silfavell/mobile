import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScaledSheet } from 'react-native-size-matters'

const CartIcon = ({ name, focused, cart }) => (
	<View>
		<Ionicons
			name={name}
			size={28}
			style={styles.iconContainer}
			color={focused ? 'rgba(0,0,0,.8)' : '#CCC'}
		/>
		{
			Object.values(cart).length > 0 && (
				<View style={styles.badge}>
					<Text style={styles.badgeText}>{Object.values(cart).length}</Text>
				</View>
			)
		}
	</View>
)

const styles = ScaledSheet.create({
	badge: {
		position: 'absolute',
		right: -10,
		top: 0,
		backgroundColor: '#EE4266',
		borderRadius: 8,
		width: 16,
		height: 16,
		justifyContent: 'center',
		alignItems: 'center'
	},
	badgeText: {
		color: 'white',
		fontSize: '12@s'
	},
	iconContainer: {
		marginBottom: -3
	}
})

const mapStateToProps = ({
	cartReducer: {
		cart
	}
}) => ({
	cart
})

export default connect(mapStateToProps)(CartIcon)
