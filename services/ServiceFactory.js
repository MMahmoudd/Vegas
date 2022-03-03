import brancheServices from './BrancheServices'
import CategoryService from './CategoryService'
import ProductService from './ProductService'
import RegisterService from './Register'
import CartService from './Cart'
import PagesService from './pages'

const services = {
    Category: CategoryService,
    Products: ProductService,
    Branches: brancheServices,
    Register: RegisterService,
    Cart: CartService,
    pages: PagesService,
}

export const ServiceFactory = {
    get: name => services[name],
}
