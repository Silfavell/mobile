import React from 'react'

import ScrollableCategoryList from '../../../components/ScrollableCategoryList'
import ShadowContainerHoc from '../../../components/ShadowContainerHoc'

const ScrollableCategoryListWithHoc = (props) => <ScrollableCategoryList {...props} />

export default ShadowContainerHoc(ScrollableCategoryListWithHoc)
