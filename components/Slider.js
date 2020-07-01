import React from 'react'
import { View, Image } from 'react-native'

import CarouselViewer from './CarouselViewer'

class Slider extends React.PureComponent {
	render() {
		return (
			<CarouselViewer
				{...this.props}
			>
				{
					this.props.images.map((image) => (
						<View key={image} style={this.props.imageContainerStyle}>
							<Image source={{ uri: image }} resizeMode={'contain'} style={{ flex: 1, width: '100%' }} />
						</View>
					))
				}
			</CarouselViewer>
		)
	}
}

export default Slider
