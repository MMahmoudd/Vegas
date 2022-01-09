import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`

export default {
  getAllBranchess () {
        return Service.get(`${resource}/branches`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
}
