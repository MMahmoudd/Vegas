import brancheServices from './BrancheServices'
import CategoryService from './CategoryService'
import ProductService from './ProductService'

const services = {
  Category: CategoryService,
  Products: ProductService,
  Branches: brancheServices
}

export const ServiceFactory = {
    get: name => services[name],
}
