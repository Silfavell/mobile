import React from 'react'
import { Dimensions } from 'react-native'
import { s } from 'react-native-size-matters'
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview'
import StickyContainer from 'recyclerlistview/sticky'

import Product from '../../components/Product'

const { width } = Dimensions.get('window')

class List extends React.Component {
    constructor(args) {
        super(args)

        this.dataProvider = new DataProvider(this.rowHasChanges)
        this.layoutProvider = new LayoutProvider(this.getLayoutTypeForIndex, this.setLayoutForType)

        this.setData([...Array.from(new Array(this.props.headers.length)), ...this.props.list])
    }

    setData = (list) => {
        this.state = {
            dataProvider: this.dataProvider.cloneWithRows(list)
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.list.length > this.props.list.length && !this.props.favoriteProducts) {
            return true
        }

        return false
    }

    rowHasChanges = (r1, r2) => r1 !== r2

    getLayoutTypeForIndex = (index) => index

    setLayoutForType = (type, dim) => {
        const headerHeights = [s(190), s(120), s(50)]

        if (type < this.props.headers.length) {
            dim.width = width
            dim.height = headerHeights[type]
        } else {
            dim.width = (width / 2) - ((width / 2) % 1)
            dim.height = s(355)
        }
    }

    rowRenderer = (type, item) => {
        if (type < this.props.headers.length) {
            return this.props.headers[type]
        }

        return (
            <Product
                key={item._id}
                data={item}
                navigation={this.props.navigation} />
        )
    }

    render() {
        return (
            <StickyContainer stickyHeaderIndices={[2]}>
                <RecyclerListView
                    layoutProvider={this.layoutProvider}
                    dataProvider={this.state.dataProvider}
                    rowRenderer={this.rowRenderer}
                />
            </StickyContainer>
        )
    }
}


export default List