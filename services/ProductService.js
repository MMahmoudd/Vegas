import Service from './Service'
import { API_URL } from '../config'

const resource = `${API_URL}`

export default {
    getAllProducts(category, minValue, maxValue) {
        let categoryQuery = (category && category !== '') ? '&main_category_id=' + category : '';
        let mainPriceQuery = (minValue && minValue !== '') ? '&min_price=' + minValue : '';
        let maxPriceQuery = (maxValue && maxValue !== '') ? '&max_price=' + maxValue : '';
        let filterQuery = categoryQuery + mainPriceQuery + maxPriceQuery;
        return Service.get(`${resource}/items?restaurant_id=2&${filterQuery}`)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.items.length > 0) {
                        response.data.items.map((item) => {
                            item.quantity = 1;
                            item.total_price = item.price;
                            item.sizes.map((size) => {
                                size.quantity = 1;
                                size.total_price = size.price;
                                size.item_image = item.image;
                                size.item_name = item.name_translate;
                                size.pieces = item.pieces
                                size.totalPriceWithAddons = 0
                                return size;
                            })
                            if (item.types.length > 0) {
                                item.types.map(type => {
                                    type.pieces = item.pieces
                                    type.regularPieces = 0
                                    type.spicyPieces = 0
                                    return type
                                })
                            }
                            if (item.addson.length > 0) {
                                item.addson.map(addon => {
                                    addon.item_id = item.id
                                    addon.quantity = 0;
                                    addon.total_price = addon.price;
                                })
                            }
                            return item;
                        });
                    }
                    return response.data
                }
            })
    },
    getAllTopItems() {
        return Service.get(`${resource}/topItems?restaurant_id=2`)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.top_items.length > 0) {
                        response.data.top_items.map((item) => {
                            item.quantity = 0;
                            item.total_price = item.price;
                            item.sizes.map((size) => {
                                size.quantity = 1;
                                size.total_price = size.price;
                                size.item_image = item.image;
                                size.item_name = item.name_translate;
                                size.pieces = item.pieces
                                size.totalPriceWithAddons = 0
                                return size;
                            })
                            if (item.types.length > 0) {
                                item.types.map(type => {
                                    type.pieces = item.pieces
                                    type.regularPieces = 0
                                    type.spicyPieces = 0
                                    return type
                                })
                            }
                            if (item.addson.length > 0) {
                                item.addson.map(addon => {
                                    addon.item_id = item.id
                                    addon.quantity = 0;
                                    addon.total_price = addon.price;
                                })
                            }
                            return item;
                        });
                    }
                    return response.data
                }
            })
    },
    getProductById(id) {
        return Service.get(`${resource}/items/${id}?restaurant_id=2`)
            .then((response) => {
                if (response.status === 200) {
                    return response.data
                }
            })
    },
    getsearchedProducts(keyword) {
        let keywordQuery = (keyword && keyword !== '') ? '&name=' + keyword : '';
        let filterQuery = keywordQuery;
        return Service.get(`${resource}/search_items?restaurant_id=2&${filterQuery}`)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.items.length > 0) {
                        response.data.items.map((item) => {
                            item.quantity = 1;
                            item.total_price = item.price;
                            item.sizes.map((size) => {
                                size.quantity = 1;
                                size.total_price = size.price;
                                size.item_image = item.image;
                                size.item_name = item.name_translate;
                                size.pieces = item.pieces
                                size.totalPriceWithAddons = 0
                                return size;
                            })
                            if (item.types.length > 0) {
                                item.types.map(type => {
                                    type.pieces = item.pieces
                                    type.regularPieces = 0
                                    type.spicyPieces = 0
                                    return type
                                })
                            }
                            if (item.addson.length > 0) {
                                item.addson.map(addon => {
                                    addon.item_id = item.id
                                    addon.quantity = 0;
                                    addon.total_price = addon.price;
                                })
                            }
                            return item;
                        });
                    }
                    return response.data
                }
            })
    },
}
