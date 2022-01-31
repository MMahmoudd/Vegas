import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`

export default {
  getAllProducts (category, minValue, maxValue) {
    let categoryQuery = (category && category !== '') ? '&main_category_id=' + category : '';
    let mainPriceQuery = (minValue && minValue !== '') ? '&min_price=' + minValue : '';
    let maxPriceQuery = (maxValue && maxValue !== '') ? '&max_price=' + maxValue : '';
    let filterQuery = categoryQuery + mainPriceQuery + maxPriceQuery;
    return Service.get(`${resource}/items?restaurant_id=2&${filterQuery}`)
    .then((response) => {
        if (response.status === 200) {
            return response.data
        }
    })
},
  getAllTopItems () {
        return Service.get(`${resource}/topItems?restaurant_id=2`)
        .then((response) => {
            if (response.status === 200) {
                return response.data
            }
        })
    },
    getsearchedProducts (keyword) {
      let keywordQuery = (keyword && keyword !== '') ? '&name=' + keyword : '';
          let filterQuery = keywordQuery;
      return Service.get(`${resource}/search_items?restaurant_id=2&${filterQuery}`)
      .then((response) => {
          if (response.status === 200) {
              return response.data
          }
      })
  },
}
