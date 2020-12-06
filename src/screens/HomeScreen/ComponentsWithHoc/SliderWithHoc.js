import React from 'react'

import ShadowContainerHoc from '../../../components/ShadowContainerHoc/ShadowContainerHoc'
import Slider from '../../../components/Slider/Slider'

const SliderWithHoc = (props) => <Slider {...props} />

export default ShadowContainerHoc(SliderWithHoc)
