const api = "https://api.foursquare.com"
const resultLimit = 7 // get number of locations based on this variable.
const nearLat = 48.2082 // Vienna location.
const nearlng = 16.3738 // Vienna location.
const client_id = 'EQVLHGW3EWSVT121BXXHLFCWAQQRHHQLSAKG0LFWG2RUN3TP'
const client_secret = 'UCWGOR4G5REKYY5MJYCLV1XOHRWHWV4ZWJWO2LD0CRPQHWZO'

export const getLocationInfo = (lat, lng) => {
    return fetch(`${api}/v2/venues/search?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=${resultLimit}&ll=${lat},${lng}`)
        .then(res => res.json())
}

export const getAllLocations = () => {
    return fetch(`${api}/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=${resultLimit}&ll=${nearLat},${nearlng}&query=fun`)
        .then(res => res.json())
}