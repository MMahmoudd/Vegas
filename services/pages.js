import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`

export default {
    sendMassage(data) {
        return Service.post(`${resource}/send_message?restaurant_id=2`, {
                ...data
            })
            .then((response) => {
                console.log(response)
                if (response.status === 200) {
                    return response
                }
            })
            .catch(error => {
                return error.response.data.errors
            })
    },
}