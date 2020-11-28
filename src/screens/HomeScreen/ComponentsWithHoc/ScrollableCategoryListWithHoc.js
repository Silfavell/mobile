import React from 'react'

import ScrollableCategoryList from '../../../components/ScrollableCategoryList/ScrollableCategoryList'
import ShadowContainerHoc from '../../../components/ShadowContainerHoc/ShadowContainerHoc'

const ScrollableCategoryListWithHoc = (props) => <ScrollableCategoryList {...props} />

export default ShadowContainerHoc(ScrollableCategoryListWithHoc)
