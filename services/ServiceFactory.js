import CategoryService from './CategoryService'
import ProductService from './ProductService'

const services = {
  Category: CategoryService,
  Products: ProductService,
}

export const ServiceFactory = {
    get: name => services[name],
}
