import React from 'react'
import { View, Image } from 'react-native'
import { SERVER_URL } from '../utils/global'

import CarouselViewer from './CarouselViewer'

class Slider extends React.PureComponent {
	state = {
		dataSource: [
			{
				url: `${SERVER_URL}/assets/banners/1.jpg`
			},
			{
				url: `${SERVER_URL}/assets/banners/2.jpg`
			},
			{
				url: `${SERVER_URL}/assets/banners/3.jpg`
			},
			{
				url: `${SERVER_URL}/assets/banners/4.jpg`
			}
		]
	}

	render() {
		return (
			<CarouselViewer>
				{
					this.state.dataSource.map((image) => (
						<View key={image.url}>
							<Image source={{ uri: image.url }} style={{ flex: 1, width: '100%' }} />
						</View>
					))
				}
			</CarouselViewer>
		)
	}
}

export default Slider
