import axios from 'axios';
import * as accessProducts from '../products/DAL/products-data-access.js';
import { ProductInterface } from '../interface.js';

const getRandomQuantity = () => {
    return Math.trunc(Math.random() * 1000);
}

const getInitialProducts = async () => {
    // get products list from the remote server
    const results = await axios.get('https://fakestoreapi.com/products');
    const products = results.data;
    // add random quantity
    for (let i = 0; i < products.length; i++) products[i].quantity = getRandomQuantity();
    return products;
}

export default async function initialProducts() {
    try {
        let products = await accessProducts.getAllProducts() as ProductInterface[];
        // exit if there are already products
        if (products.length !== 0) return products;
        // if there are not products yet, then initial the DB
        const productsFromFakeAPI = await getInitialProducts();
        const initializedProducts = await accessProducts.initialProducts(productsFromFakeAPI);
        return initializedProducts;   
    } catch (error) {
        console.error(error);
        
    }
};