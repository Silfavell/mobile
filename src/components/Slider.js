import React from 'react'
import { View, Image } from 'react-native'

import CarouselViewer from './CarouselViewer'

class Slider extends React.PureComponent {
	render() {
		return (
			<CarouselViewer
				key={this.props._id}
				{...this.props}>
				{
					this.props.images.map((image) => (
						<View
							key={image}
							style={this.props.imageContainerStyle}>

							<Image
								source={{ uri: image }}
								resizeMode={this.props.shopSingle ? 'contain' : 'cover'}
								resizeMethod='resize'
								style={{ flex: 1, width: '100%' }} />

						</View>
					))
				}
			</CarouselViewer>
		)
	}
}

export default Slider
