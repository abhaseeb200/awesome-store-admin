import axios from "axios"

const API_BASE_URL = 'https://dummyjson.com'

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

const addProduct = (body) => {
    return apiService.post(`/products/add`, {
        body: { ...body },
        headers: { "Content-Type": "application/json" },
    });
}

const getProducts = (option) => {
    let { limit, skip } = option
    return apiService.get(`/products?limit=${limit}&skip=${skip}`);
}

const searchProduct = (option) => {
    let { limit, skip, search } = option
    return apiService.get(`/products/search?q=${search}&limit=${limit}&skip=${skip}`);
}

const getSingleProduct = (productID) => {
    return apiService.get(`/products/${productID}`)
}

const getCategories = () => {
    return apiService.get(`/products/categories`);
}

const getCategoryData = (category) => {
    return apiService.get(`/products/category/${category}`)
}

export { addProduct, getProducts, getSingleProduct, searchProduct, getCategories, getCategoryData }