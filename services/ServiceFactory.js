import companiesService from './CompaniesService'

const services = {
  companies: companiesService,
}

export const ServiceFactory = {
    get: name => services[name],
}
