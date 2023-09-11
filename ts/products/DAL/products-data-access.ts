import { MongoClient } from 'mongodb';

import { ProductInterface } from '../../interface.js';
import path from 'path';

const VALID_PROPERTIES = [
    'id', 'title', 'price', 'description', 'category',
    'image', 'rating', 'quantity'
];

const emptyProduct = { id: 0, title: '', price: 0, description: '', category: '', image: '', rating: {count: 0, rate: 0}, quantity: 0 };

const initialDB = async () => {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('inventory-management');
    const collection = db.collection('products');
    return collection;
}

const collection = await initialDB();

const validateProperties = (properties: Record<any, unknown>) => {
    Object.keys(properties).forEach((value, index) => {
        if (!VALID_PROPERTIES.includes(value)) {
            throw new Error('invalid entry');
        };
    });
};

const readAll = async():Promise< ProductInterface [] | Error> => {
    try {
        const all = (await collection.find({}).toArray()) as unknown as ProductInterface[];
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getAllProducts = async (): Promise<ProductInterface[] | Error> => {
    try {
        const all = await readAll();
        return Promise.resolve(all);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const initialProducts = async (products: Record<any, unknown>[]): Promise<ProductInterface[] | Error> => {
    // API for initializing the data
    try {
        await collection.insertMany(products);
        const initializedProducts = await getAllProducts();
        return Promise.resolve(initializedProducts);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getProductById = async (id: number): Promise<ProductInterface | Error> => {
    try {
        const product = (await collection.findOne({id: id})) as unknown as ProductInterface;
        if (product === null) throw new Error('Id not exist');
        return Promise.resolve(product);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateProduct = async (id: number, properties: Record<any, unknown>): Promise<ProductInterface | Error> => {
    try {
        // validate the entries is the update
        validateProperties(properties);
        // make sure the product exist
        const product = await getProductById(id);
        await collection.updateOne(
            {id: id},
            { $set: {...properties} }
            )
        const updated = await getProductById(id);
        // return the updated product
        return Promise.resolve(updated);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const updateQuantity = async (id: number, n: number): Promise<ProductInterface | Error> => {
    try {
        const product = await (getProductById(id)) as ProductInterface;
        const quantity = product.quantity + n;
        // make sure the quantity is not under zero
        if (quantity < 0) {
            throw new Error('Quantity under zero');
        }
        const updatedProduct = await (updateProduct(id, { quantity })) as ProductInterface;
        return Promise.resolve(updatedProduct);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const appendProduct = async (product: Record<any, unknown>) => {
    try {
        // validate the entries is the update
        validateProperties(product);
        if (typeof product.id === 'undefined') throw new Error('unknown id');
        // check if there is already product with this id
        let existed;
        try {
            existed = await getProductById(product.id as number);
        } catch (error) {}
        if (!!existed) throw new Error('id exist');
        const productWithDefaults = {...emptyProduct, ...product};
        await collection.insertOne(productWithDefaults);
        const updated = getProductById(productWithDefaults.id);
        return Promise.resolve(updated);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const deleteProduct = async (id: number): Promise< number | Error > => {
    try {
        const product = await getProductById(id);
        await collection.deleteOne({id: id});
        return Promise.resolve(id);
    } catch (error) {
        return Promise.reject(error);
    }
};