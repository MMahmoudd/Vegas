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
}