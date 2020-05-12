import axios from 'axios'

export const SET_REGION = 'SET_REGION'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_REGION_BY_PLACE = 'SET_REGION_BY_PLACE'
export const SET_CURRENT_REGION = 'SET_CURRENT_REGION'

const getLocationAsync = () => (
	new Promise((resolve, reject) => {
		// eslint-disable-next-line no-undef
		navigator.geolocation.getCurrentPosition((position) => {
			resolve(position)
		}, (error) => {
			reject(error)
		}, { enableHighAccuracy: false })
	})
)

const getAddress = (region) => {
	const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=AIzaSyDOKcW0tFvi_T9vFyERfUDh20IxfTfBsmA`

	return axios.get(url).then(({ data }) => data.results[0].formatted_address)
}

export const setRegion = (region) => ((dispatch) => {
	getAddress(region).then((address) => {
		dispatch({
			type: SET_REGION,
			payload: {
				region,
				address
			}
		})
	}).catch(() => {
		dispatch({
			type: 'DO_NOT_HANDLE'
		})
	})
})

export const setAddress = (address) => ((dispatch) => {
	dispatch({
		type: SET_ADDRESS,
		payload: {
			address
		}
	})
})

export const setRegionByPlace = (placeId, cb) => ((dispatch) => {
	const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyDOKcW0tFvi_T9vFyERfUDh20IxfTfBsmA`

	axios.get(url)
		.then(({ data }) => {
			dispatch({
				type: SET_REGION_BY_PLACE,
				payload: {
					region: {
						latitude: data.result.geometry.location.lat,
						longitude: data.result.geometry.location.lng
					}
				}
			})
			cb(data)
		})
})

export const setCurrentRegion = (cb) => ((dispatch) => {
	getLocationAsync().then(({ coords }) => {
		dispatch({
			type: SET_CURRENT_REGION,
			payload: {
				region: coords
			}
		})

		cb(coords)
	}).catch((err) => {
		cb(null, err)
	})
})
