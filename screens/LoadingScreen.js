import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'

import { setInitialDatas } from '../actions/actions4'
import LoadingComponent from '../components/LoadingComponent'

class LoadingScreen extends React.PureComponent {
	componentDidMount() {
		// AsyncStorage.multiRemove(['init', 'token', 'user'])
		AsyncStorage.getItem('init').then((init) => {
			if (init) {
				if (this.props.categories.length > 0) {
					this.props.navigation.navigate('Root')
				} else {
					this.props.setInitialDatas()
				}
			} else {
				this.props.navigation.navigate('Welcome')
			}
		})
	}

	static getDerivedStateFromProps(props) {
		if (props.categories.length > 0) {
			AsyncStorage.setItem('init', 'true')
			props.navigation.navigate('Root')
		} else {
			props.setInitialDatas()
		}
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
