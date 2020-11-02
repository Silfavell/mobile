import axios from 'axios'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'

export const SET_REGION = 'SET_REGION'
export const SET_ADDRESS = 'SET_ADDRESS'
export const SET_REGION_BY_PLACE = 'SET_REGION_BY_PLACE'
export const SET_CURRENT_REGION = 'SET_CURRENT_REGION'

const getLocationAsync = () =>
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve(position)
            },
            (error) => {
                reject(error)
            },
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 },
        )
    })

const getAddress = async (region) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=AIzaSyDOKcW0tFvi_T9vFyERfUDh20IxfTfBsmA`
    const { data } = await axios.get(url)

    return data.results[0].formatted_address
}

export const setRegion = (region) => {
    return async (dispatch) => {
        try {
            const address = await getAddress(region)

            dispatch({
                type: SET_REGION,
                payload: {
                    region,
                    address,
                },
            })
        } catch (_) {
            dispatch({ type: 'DO_NOT_HANDLE' })
        }
    }
}

export const setAddress = (address) => {
    return (dispatch) => {
        dispatch({
            type: SET_ADDRESS,
            payload: {
                address,
            },
        })
    }
}

export const setRegionByPlace = (placeId, cb) => {
    return async (dispatch) => {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyDOKcW0tFvi_T9vFyERfUDh20IxfTfBsmA`
        const { data } = await axios.get(url)

        dispatch({
            type: SET_REGION_BY_PLACE,
            payload: {
                region: {
                    latitude: data.result.geometry.location.lat,
                    longitude: data.result.geometry.location.lng,
                },
            },
        })

        cb(data)
    }
}

export const setCurrentRegion = (cb) => {
    return async (dispatch) => {
        await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
        })

        try {
            const { coords } = await getLocationAsync()
            dispatch({
                type: SET_CURRENT_REGION,
                payload: {
                    region: coords,
                },
            })

            cb(coords)
        } catch (error) {
            cb(null, error)
        }
    }
}
