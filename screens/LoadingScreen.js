import React from 'react'
import { connect } from 'react-redux'
import { View, Image, Text } from 'react-native'

import { setInitialDatas } from '../actions/actions4'

class LoadingScreen extends React.PureComponent {

	UNSAFE_componentWillMount() {
		this.props.setInitialDatas()
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.categories.length > 0) {
			this.props.navigation.navigate('Root')
		}
		else {
			console.warn('Initial datas problem')
			// this.props.setInitialDatas()
		}
	}

	render() {
		return (
			<View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', display: 'flex', flex: 1 }}>
				<View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
					<Image source={{
						uri: `http://192.168.1.102:3000/assets/loading.gif`
					}} />
					<Text style={{ fontSize: 24, paddingVertical: 30, fontWeight: '700', color: '#5D3EBD' }}>Lütfen bekleyin.</Text>
				</View>
			</View>
		)
	}
}

const mapStateToProps = ({
	reducer4: {
		categories,
		products
	}
}) => ({
	categories,
	products
})

const mapDispatchToProps = {
	setInitialDatas
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)