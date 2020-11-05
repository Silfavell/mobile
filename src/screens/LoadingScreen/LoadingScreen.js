import React from 'react'

import AsyncStorage from '@react-native-community/async-storage'
import { connect } from 'react-redux'

import { setInitialDatas } from '../../actions/source-actions'
import LoadingComponent from '../../components/LoadingComponent'

class LoadingScreen extends React.Component {
    componentDidMount() {
    // AsyncStorage.clear()
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

    componentDidUpdate() {
        if (this.props.categories.length > 0) {
            AsyncStorage.setItem('init', 'true')
            this.props.navigation.navigate('Root')
        } else {
            this.props.setInitialDatas()
        }
    }

    render() {
        return <LoadingComponent />
    }
}

const mapStateToProps = ({ sourceReducer: { token, categories } }) => ({
    token,
    categories
})

const mapDispatchToProps = {
    setInitialDatas
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen)
