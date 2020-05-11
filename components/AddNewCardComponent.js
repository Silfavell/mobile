import React from 'react'
import {
	View, TouchableOpacity, Text, StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RFValue } from 'react-native-responsive-fontsize'

class AddNewCardComponent extends React.PureComponent {
	onClick = () => {
		this.props.navigation.navigate('addNewCardScreen')
	}

	render() {
		return (
			<>
				<TouchableOpacity style={styles.container} onPress={this.onClick}>
					<View style={styles.child}>
						<View style={styles.iconContainer}>
							<Ionicons name="md-add" size={32} color="#D000DB" />
						</View>
					</View>
					<View style={[styles.child, styles.textContainer]}>
						<View style={styles.child}>
							<Text style={styles.highlightedText}>Yeni kart ekle</Text>
						</View>
					</View>
					<TouchableOpacity style={styles.child}>
						<View style={styles.emptyIcon} />
					</TouchableOpacity>
				</TouchableOpacity>

				{
					//  <TouchableOpacity style={styles.container}>
					//      <View style={styles.child}>
					//          <Ionicons name={'md-add'} size={32} color={'#D000DB'} />
					//      </View>
					//      <View style={[styles.child, { flex: 1, alignItems: 'flex-start', marginHorizontal: 6 }]}>
					//          <View style={styles.child}>
					//              <Text style={styles.highlightedText}>{'Add Card with BKM Express'}</Text>
					//          </View>
					//      </View>
					//      <TouchableOpacity style={styles.child}>
					//          <Ionicons name={'md-trash'} size={32} color={'black'} />
					//      </TouchableOpacity>
					//  </TouchableOpacity>
				}
			</>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, flexDirection: 'row', padding: 8, marginHorizontal: 6
	},
	child: { alignItems: 'center', justifyContent: 'center', marginHorizontal: 8 },
	cardName: { fontSize: RFValue(16, 600) },
	cardNumber: { fontSize: RFValue(15, 600), color: '#6C7486' },
	highlightedText: { fontSize: RFValue(16, 600), color: '#D000DB' },
	iconContainer: {
		height: 24, width: 36, alignItems: 'center', justifyContent: 'center'
	},
	emptyIcon: { height: 32 },
	textContainer: { flex: 1, alignItems: 'flex-start', marginHorizontal: 6 }
})

export default AddNewCardComponent
