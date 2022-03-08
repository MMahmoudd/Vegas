import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`

export default {
    getUserData() {
        return Service.get(`${resource}/user_addresses`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }).then((response) => {
                if (response.status === 200) {
                    response.data.data.addresses.map(item => {
                        item.price = item.area.price
                    })
                    console.log('responseFrom Service', response)
                    return response
                }
            })
            .catch(error => {
                return error.response.data.errors || error.response.data.message
            })
    },
    addAddress(data) {
        return Service.post(`${resource}/add_address`, data, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then((response) => {
            console.log('response', response)
            if (response.status === 200) {
                // console.log('response', response)
                return response.data
            }
        })
    },
    getGovernrate() {
        return Service.get(`${resource}/governrates?restaurant_id=2`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then((response) => {
            // console.log('response', response)
            if (response.status === 200) {
                return response.data
            }
        })
    },
    getAreas(id) {
        return Service.get(`${resource}/areas?restaurant_id=2&governrate_id=${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then((response) => {
            // console.log('response', response)
            if (response.status === 200) {
                return response.data
            }
        })
    }
}