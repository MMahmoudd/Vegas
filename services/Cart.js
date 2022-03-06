import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`

export default {
    sendCartData(data) {
        return Service.post(`${resource}/cart`, data, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            }).then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response
                }
            })
            .catch(error => {
                return error.response.data.errors || error.response.data.message
            })
    },
    getCart() {
        return Service.get(`${resource}/cart`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        }).then((response) => {
            if (response.status === 200) {
                // if (response.data.data) {
                //     response.data.data.map(item => {
                //         item.tatalPrice = item.price * item.qty
                //     })
                // }
                return response.data
            }
        })
    },
}
