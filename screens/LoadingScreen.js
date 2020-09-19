import React from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'

import { setInitialDatas } from '../actions/actions4'
import LoadingComponent from '../components/LoadingComponent'

class LoadingScreen extends React.PureComponent {
	static getDerivedStateFromProps(props) {
		// AsyncStorage.multiRemove(['init', 'token', 'user'])
		AsyncStorage.getItem('init').then((init) => {
			if (init) {
				if (props.categories.length > 0) {
					props.navigation.navigate('Root')
				} else {
					props.setInitialDatas()
				}
			} else {
				props.navigation.navigate('Welcome')
			}
		})
	}

	render() {
		return <LoadingComponent />
	}
}

const mapStateToProps = ({
	reducer4: {
		token,
		categories
	}
}) => ({
	token,
	categories
})

const mapDispatchToProps = {
	setInitialDatas
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
