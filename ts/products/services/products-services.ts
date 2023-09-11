import { ProductInterface } from '../../interface.js';
import * as accessProducts from '../DAL/products-data-access.js';

export const getAllProducts = async () => {
    try {
        const all = (await accessProducts.getAllProducts());
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
};

const createNewId = async (): Promise<number | Error> => {
    try {
        const allProducts = await getAllProducts() as ProductInterface[];
        for (let i = 0; i < 10000; i++) {
            if (allProducts.find(el => el.id === i)) return i;
        }
        throw new Error("no id found");
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProductById = async (id: number) => {
    try {
        const product = await accessProducts.getProductById(id);
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateProduct = async (id: number, properties: Record<any, unknown>) => {
    try {
        const product = await accessProducts.updateProduct(id, properties);
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateQuantity = async (id: number, n: number) => {
    try {
        const product = await accessProducts.updateQuantity(id, n);
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const appendProduct = async (product: Record<any, unknown>) => {
    try {
        const productAppended = await accessProducts.appendProduct(product);
        return Promise.resolve(productAppended);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteProduct = async (id: number) => {
    try {
        await accessProducts.deleteProduct(id);
        return Promise.resolve();
    } catch (error) {
        return Promise.reject(error);
    }
};